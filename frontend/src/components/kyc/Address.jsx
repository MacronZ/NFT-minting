import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import '../../styles/Onboarding/OnBoarding.scss';
import { Radio } from '@material-ui/core';
import { FiUpload, FiXCircle } from 'react-icons/fi';
import { documentController } from '../../controllers';
import Button from '../Button';
import DocumentRow from '../DocumentRow';

export default function Address({ onUploadSuccess, uploadedFiles, status }) {
  const [fileToUpload, setFileToUpload] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
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
      await documentController.upload(user, fileToUpload, false, null, 'PROOF_OF_ADDRESS', documentType);
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

  const selectDocumentType = (e) => {
    setFileToUpload(null);
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
        <label htmlFor="bank-statement">
          <Radio
            id="bank-statement"
            value="BANK_STATEMENT"
            name="doc-type"
            onChange={selectDocumentType}
            checked={documentType === 'BANK_STATEMENT'}
          />
          {t('address.bankStatement')}
        </label>
        <label htmlFor="utility-bill">
          <Radio
            id="utility-bill"
            value="UTILITY_BILL"
            name="doc-type"
            onChange={selectDocumentType}
            checked={documentType === 'UTILITY_BILL'}
          />
          {t('address.utilityBill')}
        </label>
        <label htmlFor="rental-agreement">
          <Radio
            id="rental-agreement"
            value="RENTAL_AGREEMENT"
            name="doc-type"
            onChange={selectDocumentType}
            checked={documentType === 'RENTAL_AGREEMENT'}
          />
          {t('address.rentalAgreement')}
        </label>
        <label htmlFor="tax-bill">
          <Radio
            id="tax-bill"
            value="TAX_BILL"
            name="doc-type"
            onChange={selectDocumentType}
            checked={documentType === 'TAX_BILL'}
          />
          {t('address.taxBill')}
        </label>
        <label htmlFor="insurance">
          <Radio
            id="insurance"
            value="INSURANCE"
            name="doc-type"
            onChange={selectDocumentType}
            checked={documentType === 'INSURANCE'}
          />
          {t('address.insurance')}
        </label>
      </div>
      <div className="file-upload">
        <label htmlFor="address-document" className={fileToUpload ? 'custom-file-upload disabled' : 'custom-file-upload'}>
          {fileToUpload ? (
            <>
              <FiXCircle
                onMouseDown={() => {
                  setFileToUpload(null);
                  document.getElementById('address-document').value = '';
                }}
                className="upload-icon"
              />
              {fileToUpload.name}
            </>
          ) : (
            <>
              <FiUpload className="upload-icon" />
              {t('address.idFront')}
            </>
          )}
        </label>
        <input
          id="address-document"
          name="document"
          type="file"
          disabled={fileToUpload}
          accept="application/pdf, image/*"
          onChange={onChange}
        />
      </div>
      <p className="file-note">{t('address.fileNote')}</p>
      <Button secondaryColor loading={submitLoading} formButton text={t('submit')} />
    </>
  );

  return (
    <div className="onboarding-address">
      <div className="onboarding-address-inner">
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
