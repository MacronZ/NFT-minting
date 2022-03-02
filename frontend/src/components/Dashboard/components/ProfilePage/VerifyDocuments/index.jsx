/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'; import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSnackbar } from 'notistack';
import '../../../../../styles/Dashboard/VerifyDocuments.scss';
import { useTranslation } from 'react-i18next';
import {
  RiArrowRightSLine,
  RiArrowDownSLine,
  RiInformationLine,
} from 'react-icons/ri';
import faceScan from '../../../../../media/images/icons/face.png';
import geoTag from '../../../../../media/images/icons/geo-tag.png';
import documentIcon from '../../../../../media/images/icons/documentIcon.svg';
import exampleId from '../../../../../media/images/icons/example-id.png';
import OtherDocumentsUpload from './OtherDocumentsUpload';
import { Identity, Address } from '../../../../kyc';
import RejectedButtonWithReasonPopover from '../../../../RejectedButtonWithReasonPopover';
import UploadThankYouModal from '../../../../onboarding/ThankYouModal';
import { documentController } from '../../../../../controllers';
import { getSideAsText } from '../../../../../utils/util-functions';

export default function VerifyForm() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [showIdentityForm, setShowIdentityForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showOtherDocs, setShowOtherDocs] = useState(false);
  const [hiddenExpandIcon, setHiddenExpandIcon] = useState(false);
  const [otherDocUniqueStatus, setOtherDocUniqueStatus] = useState('');
  const [showIdentityHelp, setShowIdentityHelp] = useState(false);
  const [userStage, setUserStage] = useState({
    identity: null,
    identityDocs: null,
    address: null,
    addressDocs: null,
    contract: null,
    other: null,
  });
  const [fileDataChanged, setFileDateChanged] = useState(0);
  const [uploadThankYouPopup, showUploadThankYouPopup] = useState(false);
  const [uploadedSomething, setUploadedSomething] = useState(false);

  const setPreviewOfOtherSection = (otherDocs) => {
    const statuses = otherDocs.map((d) => d.documentStatus);
    const noDuplStatuses = statuses.filter((value, index) => statuses.indexOf(value) === index);
    if (noDuplStatuses.length > 1) {
      setShowOtherDocs(true);
      setHiddenExpandIcon(true);
      setOtherDocUniqueStatus('');
    } else {
      setShowOtherDocs(false);
      setHiddenExpandIcon(false);
      if (noDuplStatuses.length) { setOtherDocUniqueStatus(noDuplStatuses[0]); } else { setOtherDocUniqueStatus(''); }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (uploadedSomething) {
      if (
        userStage.identity === 'Pending'
        && userStage.address === 'Pending'
      ) {
        showUploadThankYouPopup(true);
        setUploadedSomething(false);
      }
    }
  }, [userStage, uploadedSomething]);

  useEffect(() => {
    (async () => {
      let uploadDocuments;
      const localUser = await JSON.parse(localStorage.getItem('user'));

      try {
        uploadDocuments = await documentController.getDocuments(localUser.uuid);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
        return;
      }

      if (uploadDocuments.length) {
        const updatedValue = {};
        const proofOfId = uploadDocuments.filter((x) => x.documentGroup === 'PROOF_OF_ID');
        const proofOfAddress = uploadDocuments.filter((x) => x.documentGroup === 'PROOF_OF_ADDRESS');
        const otherDocs = uploadDocuments.filter((x) => x.documentGroup === 'ADDITIONAL_DOCUMENTS' && x.documentType !== 'BANK_DETAILS');
        if (proofOfId.length) {
          updatedValue.identityDocs = proofOfId;
          const rejected = proofOfId.filter((x) => x.documentStatus === 'Rejected');
          const pending = proofOfId.filter((x) => x.documentStatus === 'Pending');

          if (rejected.length) {
            updatedValue.identity = rejected[0].documentStatus;
            const rejectReason = [
              `${getSideAsText(rejected[0].documentType)}: ${rejected[0].rejectionReason
              }`,
            ];
            if (rejected[1]) {
              rejectReason.push(
                `${getSideAsText(rejected[1].documentType)}: ${rejected[1].rejectionReason
                }`,
              );
            }
            updatedValue.identityRejection = rejectReason;
          } else if (pending.length) {
            updatedValue.identity = pending[0].documentStatus;
          } else {
            updatedValue.identity = proofOfId[0].documentStatus;
          }
        } else {
          updatedValue.identityDocs = null;
          updatedValue.identity = null;
        }

        if (proofOfAddress.length) {
          updatedValue.addressDocs = proofOfAddress;
          updatedValue.address = proofOfAddress[0].documentStatus;
          if (proofOfAddress[0].documentStatus === 'Rejected') {
            updatedValue.addressRejection = `${getSideAsText(
              proofOfAddress[0].documentType,
            )}: ${proofOfAddress[0].rejectionReason}`;
          }
        } else {
          updatedValue.addressDocs = null;
          updatedValue.address = null;
        }

        updatedValue.other = otherDocs;
        setPreviewOfOtherSection(otherDocs);

        setUserStage({
          ...userStage,
          ...updatedValue,
        });
      } else {
        setUserStage({
          identity: null,
          identityDocs: null,
          address: null,
          addressDocs: null,
          contract: null,
          other: null,
        });
      }
    })();
  }, [fileDataChanged]);

  const showOtherDocStatusWhenClosed = () => (
    <p className={`status-text status-${otherDocUniqueStatus.toLowerCase()}`}>
      {otherDocUniqueStatus}
    </p>
  );

  return (
    <div className="dashboard-data-main">
      <UploadThankYouModal
        showPopup={uploadThankYouPopup}
        onClose={() => showUploadThankYouPopup(false)}
      />
      <div className="head-line">
        <Link to="/dashboard/profile">
          <ArrowBackIcon />
        </Link>
        <div className="title">{t('dashboard.settings.verificationDocuments.title')}</div>
      </div>
      <div className="dashboard-document-inner container">
        <div
          className={`link-box ${showIdentityForm ? 'opened-identity-link' : 'closed-link'
          }`}
        >
          <button
            type="button"
            className="onboarding-link"
            onClick={() => {
              setShowIdentityForm((prevCheck) => !prevCheck);
            }}
          >
            <div className="icon-title">
              <img
                src={faceScan}
                className="icon"
                height="45"
                width="50"
                alt="Icon"
                style={{ marginRight: 20 }}
              />
              <h2 className="link-title">
                {t('documentUpload.identity')}
                <RiInformationLine
                  className={
                    showIdentityForm
                      ? 'info-icon'
                      : 'info-icon hide-info-icon'
                  }
                  onMouseEnter={() => setShowIdentityHelp(true)}
                  onMouseLeave={() => setShowIdentityHelp(false)}
                />
              </h2>
              <div
                className={
                  showIdentityHelp ? 'help-box' : 'help-box hide-help-box'
                }
              >
                <p>
                  {t('documentUpload.validGovernment')}
                  <br />
                  {' '}
                  {t('documentUpload.residencePermit')}
                </p>
                <img
                  src={exampleId}
                  className="icon"
                  height="100"
                  alt="Example ID"
                />
              </div>
            </div>
            {userStage.identity === 'Approved' ? (
              <p className="status-text status-approved">
                {userStage.identity}
              </p>
            ) : userStage.identity === 'Pending' ? (
              <p className="status-text status-pending">
                {userStage.identity}
              </p>
            ) : userStage.identity === 'Rejected' ? (
              <RejectedButtonWithReasonPopover
                status={userStage.identity}
                reason={userStage.identityRejection.map((x) => (
                  <p>
                    {x}
                  </p>
                ))}
              />
            ) : <></>}
            {showIdentityForm ? (
              <RiArrowDownSLine className="arrow-icon" />
            ) : (
              <RiArrowRightSLine className="arrow-icon" />
            )}
          </button>
          <Identity
            uploadedFiles={userStage.identityDocs}
            status={userStage.identity}
            onUploadSuccess={() => {
              setFileDateChanged(Date.now());
              setShowIdentityForm(false);
              setUploadedSomething(true);
            }}
          />
        </div>

        {/* Address documents section */}
        <div
          className={`link-box ${showAddressForm ? 'opened-address-link' : 'closed-link'
          }`}
        >
          <button
            type="button"
            className="onboarding-link"
            onClick={() => {
              setShowAddressForm((prevCheck) => !prevCheck);
            }}
          >
            <div className="icon-title">
              <img
                src={geoTag}
                className="icon"
                height="50"
                width="40"
                alt="Icon"
                style={{ marginLeft: 5, marginRight: 20 }}
              />
              <h2 className="link-title">{t('documentUpload.address')}</h2>
            </div>
            {userStage.address === 'Approved' ? (
              <p className="status-text status-approved">
                {userStage.address}
              </p>
            ) : userStage.address === 'Pending' ? (
              <p className="status-text status-pending">
                {userStage.address}
              </p>
            ) : userStage.address === 'Rejected' ? (
              <RejectedButtonWithReasonPopover
                status={userStage.address}
                reason={(
                  <p>
                    {userStage.addressRejection}
                  </p>
                )}
              />
            ) : <></>}
            {showAddressForm ? (
              <RiArrowDownSLine className="arrow-icon" />
            ) : (
              <RiArrowRightSLine className="arrow-icon" />
            )}
          </button>
          <Address
            uploadedFiles={userStage.addressDocs}
            status={userStage.address}
            onUploadSuccess={() => {
              setFileDateChanged(Date.now());
              setShowAddressForm(false);
              setUploadedSomething(true);
            }}
          />
        </div>

        {/* Other document section */}
        <div className={`link-box ${showOtherDocs ? 'opened-address-link' : 'closed-link'}`}>
          <button
            type="button"
            className="onboarding-link"
            onClick={() => {
              if (!hiddenExpandIcon) setShowOtherDocs((prevCheck) => !prevCheck);
            }}
          >
            <div className="icon-title">
              <img
                src={documentIcon}
                className="icon"
                height="50"
                width="40"
                alt="Icon"
                style={{ marginLeft: 5, marginRight: 20 }}
              />
              <h2 className="link-title">{t('documentUpload.other')}</h2>
            </div>
            {otherDocUniqueStatus && showOtherDocStatusWhenClosed()}
            {showOtherDocs ? (
              !hiddenExpandIcon && <RiArrowDownSLine className="arrow-icon" />
            ) : (
              !hiddenExpandIcon && <RiArrowRightSLine className="arrow-icon" />
            )}
          </button>
          <OtherDocumentsUpload
            documentType="OTHER"
            title={t('address.otherDocType')}
            uploadedFiles={userStage.other}
            onUploadSuccess={() => {
              setFileDateChanged(Date.now());
              setUploadedSomething(true);
            }}
            showRejectionReason
          />
        </div>
      </div>
    </div>
  );
}
