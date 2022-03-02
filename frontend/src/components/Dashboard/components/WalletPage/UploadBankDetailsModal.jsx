import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle } from '@material-ui/core';
import { useSelector } from 'react-redux';
import OtherDocumentsUpload from '../ProfilePage/VerifyDocuments/OtherDocumentsUpload';
import { documentController } from '../../../../controllers';
import bankIcon from '../../../../media/images/icons/bank-icon.svg';
import bankIconDark from '../../../../media/images/icons/bank-icon-dark.svg';

export default function UploadBankDetailsModal() {
  const [open, setOpen] = useState(false);
  const [fileDataChanged, setFileDataChanged] = useState(0);
  const [userDocs, setUserDocs] = useState({
    bankDocs: null,
  });
  const [formData, setFormData] = useState({
    nameOfAccount: '',
    bankAccountNumber: '',
    branchName: '',
    bankCode: '',
    bankName: '',
    bankCity: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const getTheme = useSelector((state) => state.theme);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setFieldValue = (key, value) => {
    formData[key] = value;
    setFormData({ ...formData });
  };

  useEffect(async () => {
    const localUser = await JSON.parse(localStorage.getItem('user'));

    formData.nameOfAccount = `${localUser.firstName} ${localUser.lastName}`;
    if (localUser.bankData) {
      setFormData({ ...localUser.bankData });
    }
  }, []);

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
        updatedValue.bankDocs = uploadDocuments.filter((x) => x.documentGroup === 'ADDITIONAL_DOCUMENTS' && x.documentType === 'BANK_DETAILS');
        setUserDocs({
          ...userDocs,
          ...updatedValue,
        });
      }
    })();
  }, [fileDataChanged]);

  const bankDetailsUploaded = userDocs.bankDocs?.length;

  const setToggleBankIcon = () => {
    if (getTheme === 'dark') {
      return (
        <img src={bankIconDark} className="icon" height="30" width="40" alt="bankDark" />
      );
    }
    return (
      <img src={bankIcon} className="icon" height="50" width="40" alt="bank" />
    );
  };

  const renderBankDetailsSection = () => (
    <OtherDocumentsUpload
      documentType="BANK_DETAILS"
      title={t('dashboard.wallet.hint')}
      uploadedFiles={userDocs.bankDocs}
      onUploadSuccess={() => {
        setFileDataChanged(Date.now());
      }}
      showRejectionReason
      buttonCentered
      buttonText={t('save')}
      bankDetails={formData}
      successMessage={t('dashboard.wallet.bankDetailsSaved')}
      closeBankDetailsModal={handleClose}
    />
  );

  return (
    <div className="set-bank-details">
      <div className="method-box">
        <button
          type="button"
          className="bank-details-btn"
          onClick={handleClickOpen}
        >
          <div className="icon-title">
            {setToggleBankIcon()}
            <div className="bank-text">
              <h2 className="link-title">{bankDetailsUploaded ? t('dashboard.wallet.viewBankDetails') : t('dashboard.wallet.bankDetails')}</h2>
              <span>{bankDetailsUploaded ? '' : t('dashboard.wallet.noBankDetails')}</span>
            </div>
          </div>
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <Grid
            spacing={2}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ padding: 30 }}
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <h3 className="link-title">{bankDetailsUploaded ? t('dashboard.wallet.viewBankDetails') : t('dashboard.wallet.bankDetails')}</h3>

            <DialogContent width="sm">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    onChange={(e) => setFieldValue('nameOfAccount', e.target.value)}
                    margin="dense"
                    id="name"
                    label="Name of Account Holder"
                    type="text"
                    fullWidth
                    value={formData.nameOfAccount}
                    variant="outlined"
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    onChange={(e) => setFieldValue('bankAccountNumber', e.target.value)}
                    value={formData.bankAccountNumber}
                    id="BankAccountNumber"
                    label="Bank Account Number / IBAN"
                    type="text"
                    fullWidth
                    required
                    variant="outlined"
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    onChange={(e) => setFieldValue('branchName', e.target.value)}
                    value={formData.branchName}
                    id="BranchName"
                    label="Branch Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={(e) => setFieldValue('bankCode', e.target.value)}
                    value={formData.bankCode}
                    margin="dense"
                    id="BankCode"
                    label="Bank Code / Swift"
                    type="text"
                    fullWidth
                    variant="outlined"
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={(e) => setFieldValue('bankName', e.target.value)}
                    value={formData.bankName}
                    margin="dense"
                    id="Bank Name"
                    label="Bank Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={(e) => setFieldValue('bankCity', e.target.value)}
                    value={formData.bankCity}
                    margin="dense"
                    id="BankCity"
                    label="Bank City"
                    type="text"
                    fullWidth
                    variant="outlined"
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            {renderBankDetailsSection()}
          </Grid>
        </Dialog>
      </div>
    </div>
  );
}
