import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import '../../styles/Onboarding/OnBoarding.scss';
import { Radio } from '@material-ui/core';
import { FiUpload, FiXCircle } from 'react-icons/fi';
import { documentController } from '../../controllers';
import Button from '../Button';
import DocumentRow from '../DocumentRow';

export default function Identity({ onUploadSuccess, uploadedFiles, status }) {
  const [filetoupload, setFileToUpload] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fileBack, setFileBack] = useState(null);
  const [documentType, setDocumentType] = useState(null);
  const [files, setFiles] = useState([]);
  const [docIdToDelete, setDocIdToDelete] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      await documentController.upload(user, filetoupload, documentType !== 'PASSPORT_FRONT', fileBack, 'PROOF_OF_ID', documentType);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
      setSubmitLoading(false);
      return;
    }

    enqueueSnackbar('Document uploaded successfully', {
      variant: 'success',
      preventDuplicate: true,
    });
    setSubmitLoading(false);
    if (onUploadSuccess) {
      onUploadSuccess();
    }
  };

  const onChange = (e) => {
    setFileToUpload(e.target.files[0]);
    e.target.value = null;
  };

  const backDocUpload = (e) => {
    setFileBack(e.target.files[0]);
    e.target.value = null;
  };

  const selectDocumentType = (e) => {
    setFileToUpload(null);
    setFileBack(null);
    setDocumentType(e.target.value);
  };

  const deleteFileFromList = async (index, file, fromDB) => {
    if (fromDB) {
      try {
        setDocIdToDelete(file.uuid);
        setDeleteLoading(true);
        await documentController.deleteDocument(file.uuid);
        onUploadSuccess();
        setFiles(files.filter((f) => f !== file));
        enqueueSnackbar('Document deleted', { variant: 'success', preventDuplicate: true });
      } catch (e) {
        enqueueSnackbar(e.message, {
          variant: 'error',
        });
      }
      setDocIdToDelete('');
      setDeleteLoading(false);
    } else {
      setFiles(files.filter((f) => f !== file));
    }
  };

  const showFileUploadSection = !uploadedFiles || status === 'Rejected';

  const fileUploadSection = () => (
    <>
      <h2 className="title">{t('address.documentType')}</h2>
      <div className="doc-type">
        <label htmlFor="identity-card">
          <Radio
            id="identity-card"
            value="IDENTITY_CARD_FRONT"
            name="doc-type"
            onChange={selectDocumentType}
            checked={documentType === 'IDENTITY_CARD_FRONT'}
          />
          {t('identity.ID')}
        </label>
        <label htmlFor="passport">
          <Radio
            id="passport"
            value="PASSPORT_FRONT"
            name="doc-type"
            onChange={selectDocumentType}
            checked={documentType === 'PASSPORT_FRONT'}
          />
          {t('identity.passport')}
        </label>
        <label htmlFor="driving-license">
          <Radio
            id="driving-license"
            value="DRIVING_LICENSE_FRONT"
            name="doc-type"
            onChange={selectDocumentType}
            checked={documentType === 'DRIVING_LICENSE_FRONT'}
          />
          {t('identity.drivingLicense')}
        </label>
      </div>
      <div className="file-upload">
        <label
          htmlFor="id-document"
          className={
            filetoupload ? 'custom-file-upload disabled' : 'custom-file-upload'
          }
        >
          {filetoupload ? (
            <>
              <FiXCircle
                onMouseDown={() => {
                  setFileToUpload(null);
                  document.getElementById('id-document').value = '';
                }}
                className="upload-icon"
              />
              {filetoupload.name}
            </>
          ) : (
            <>
              <FiUpload className="upload-icon" />
              {t('identity.frontSide')}
            </>
          )}
        </label>
        <input
          id="id-document"
          name="document"
          type="file"
          disabled={filetoupload}
          accept="application/pdf, image/*"
          onChange={onChange}
        />
        {documentType !== 'PASSPORT_FRONT' ? (
          <>
            <label
              htmlFor="id-back-document"
              className={
                fileBack
                  ? 'custom-file-upload disabled'
                  : 'custom-file-upload'
              }
            >
              {fileBack ? (
                <>
                  <FiXCircle
                    onMouseDown={() => {
                      setFileBack(null);
                      document.getElementById('id-back-document').value = '';
                    }}
                    className="upload-icon"
                  />
                  {fileBack.name}
                </>
              ) : (
                <>
                  <FiUpload className="upload-icon" />
                  {t('identity.backSide')}
                </>
              )}
            </label>
            <input
              id="id-back-document"
              name="back-document"
              type="file"
              disabled={fileBack}
              accept="application/pdf, image/*"
              onChange={backDocUpload}
            />
          </>
        ) : null}
      </div>
      <p className="file-note">{t('identity.fileNote')}</p>
      <Button secondaryColor loading={submitLoading} formButton text={t('submit')} />
    </>
  );

  return (
    <div className="onboarding-identity">
      <div className="onboarding-identity-inner">
        <form className="onboard" onSubmit={onFormSubmit}>
          <div className="uploaded-file-list">
            {
              uploadedFiles && uploadedFiles.map((f, index) => (
                <DocumentRow
                  uploaded
                  showRejectionReason
                  file={f}
                  key={index}
                  onDelete={deleteFileFromList}
                  loading={deleteLoading}
                  docIdToDelete={docIdToDelete}
                />
              ))
            }
          </div>
          {showFileUploadSection && fileUploadSection()}
        </form>
      </div>
    </div>
  );
}
