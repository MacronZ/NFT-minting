import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { FiUpload } from 'react-icons/fi';
import { documentController, userController } from '../../../../../controllers';
import Button from '../../../../Button';
import DocumentRow from '../../../../DocumentRow';

const OtherDocumentsUpload = ({
  uploadedFiles, onUploadSuccess, documentType, title, showRejectionReason = false, buttonText, buttonCentered = false, bankDetails, successMessage, closeBankDetailsModal,
}) => {
  const [files, setFiles] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [docIdToDelete, setDocIdToDelete] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (bankDetails && (!bankDetails.nameOfAccount || !bankDetails.bankAccountNumber || !bankDetails.branchName || !bankDetails.bankCode || !bankDetails.bankName || !bankDetails.bankCity)) {
      enqueueSnackbar('Please fill all the fields', {
        variant: 'error',
      });
    } else if (documentType !== 'BANK_DETAILS' && files.length === 0) {
      enqueueSnackbar('No file uploaded', {
        variant: 'error',
      });
    } else {
      try {
        setSubmitLoading(true);
        if (bankDetails) {
          await userController.saveBankDetails(user.uuid, bankDetails);
        }
        if (files.length) {
          await documentController.uploadMultipleFiles(user, files, documentType, 'ADDITIONAL_DOCUMENTS');
        }
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
        setSubmitLoading(false);
        return;
      }

      onUploadSuccess();
      setSubmitLoading(false);
      if (successMessage) {
        enqueueSnackbar(successMessage, {
          variant: 'success',
          preventDuplicate: true,
        });
        closeBankDetailsModal();
      } else {
        enqueueSnackbar('Document uploaded successfully', {
          variant: 'success',
          preventDuplicate: true,
        });
      }

      setFiles([]);
    }
  };

  const onFileSelect = (e) => {
    setFiles([...files, e.target.files[0]]);
    e.target.value = null;
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

  return (
    <div className="onboarding-otherdoc">
      <div className="onboarding-otherdoc-inner">
        <form className="onboard" onSubmit={onFormSubmit}>
          <h2 className="title">{title}</h2>
          <div className="uploaded-file-list">
            {
              uploadedFiles && uploadedFiles.map((f, index) => (
                <DocumentRow
                  uploaded
                  showRejectionReason={showRejectionReason}
                  file={f}
                  key={index}
                  onDelete={deleteFileFromList}
                  loading={deleteLoading}
                  docIdToDelete={docIdToDelete}
                />
              ))
            }
            {
              files.map((f, index) => (
                <DocumentRow
                  file={f}
                  key={index}
                  onDelete={deleteFileFromList}
                />
              ))
            }
          </div>
          <div className="file-upload">
            <label htmlFor="other-document" className="custom-file-upload">
              <FiUpload className="upload-icon" />
            </label>
            <input
              id="other-document"
              name="document"
              type="file"
              accept=".jpg, .jpeg, .png, .doc, .docx, .odt, .pdf"
              onChange={onFileSelect}
            />
          </div>
          <p className="file-note">{t('address.fileNote')}</p>
          <div className={buttonCentered ? 'centered-div' : null}>
            <Button secondaryColor loading={submitLoading} formButton text={buttonText || t('submit')} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtherDocumentsUpload;
