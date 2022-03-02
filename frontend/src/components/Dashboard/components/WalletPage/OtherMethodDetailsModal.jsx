import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Button from '../../../Button';

export default function OtherMethodDetailsModal({
  setDetailsEntered, method, methodIcon, saveDetailsFn,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userUuid, setUserUuid] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const setFieldValue = (key, value) => {
    formData[key] = value;
    setFormData({ ...formData });
  };

  useEffect(async () => {
    const localUser = await JSON.parse(localStorage.getItem('user'));

    formData.firstName = localUser.firstName;
    formData.lastName = localUser.lastName;
    setUserUuid(localUser.uuid);

    if (method === 'skrill' && localUser.skrillData) {
      setFormData({ ...localUser.skrillData });
    }
    if (method === 'neteller' && localUser.netellerData) {
      setFormData({ ...localUser.netellerData });
    }
  }, []);

  const detailsExist = !!formData.email;

  const renderMethodTitle = (detailsEntered) => {
    const title1 = method === 'skrill' ? t('dashboard.wallet.viewSkrillDetails') : t('dashboard.wallet.viewNetellerDetails');
    const title2 = method === 'skrill' ? t('dashboard.wallet.skrillDetails') : t('dashboard.wallet.netellerDetails');
    return detailsEntered ? title1 : title2;
  };

  const saveDetails = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      enqueueSnackbar('Please complete all the fields', {
        variant: 'error',
      });
    } else {
      try {
        setIsLoading(true);
        await saveDetailsFn(userUuid, formData);
        setIsDialogOpen(false);
        setDetailsEntered(true);
        const successMsg = method === 'skrill' ? t('dashboard.wallet.skrillDetailsSaved') : t('dashboard.wallet.netellerDetailsSaved');
        enqueueSnackbar(successMsg, {
          variant: 'success',
          preventDuplicate: true,
        });
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="set-bank-details">
      <div className="method-box">
        <button
          type="button"
          className="bank-details-btn"
          onClick={handleClickOpen}
        >
          <div className="icon-title">
            <img
              src={methodIcon}
              className="icon"
              height="50"
              width="40"
              alt={method}
            />
            <div className="bank-text">
              <h2 className="link-title">{renderMethodTitle(detailsExist)}</h2>
              <span>{detailsExist ? '' : t('dashboard.wallet.noBankDetails')}</span>
            </div>
          </div>
        </button>
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            style={{ padding: 30 }}
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
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
            <h3 className="link-title">{renderMethodTitle(detailsExist)}</h3>
            <DialogContent width="sm">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => setFieldValue('firstName', e.target.value)}
                    margin="dense"
                    id="firtsName"
                    label="First Name"
                    type="text"
                    required
                    fullWidth
                    value={formData.firstName}
                    variant="outlined"
                    inputProps={{ style: { fontSize: 14 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    onChange={(e) => setFieldValue('lastName', e.target.value)}
                    value={formData.lastName}
                    id="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    required
                    variant="outlined"
                    inputProps={{ style: { fontSize: 14 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    onChange={(e) => setFieldValue('email', e.target.value)}
                    value={formData.email}
                    id="email"
                    label="Email"
                    type="text"
                    fullWidth
                    required
                    variant="outlined"
                    inputProps={{ style: { fontSize: 14 } }}
                  />
                </Grid>
              </Grid>
              <div className="save-btn-container">
                <Button secondaryColor loading={isLoading} text={t('save')} action={saveDetails} />
              </div>
            </DialogContent>
          </Grid>
        </Dialog>
      </div>
    </div>
  );
}
