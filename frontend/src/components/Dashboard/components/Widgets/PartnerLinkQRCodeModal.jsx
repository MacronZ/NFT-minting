import React from 'react';
import { Modal } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CancelIcon from '../../../../media/images/icons/cancel.svg';
import PartnerLinkQrCode from '../../../../utils/PartnerLinkQrCode';
import Button from '../../../Button';

export default function PartnerLinkQRCodeModal({
  handleClose, affiliateUrl, open, options,
}) {
  const { t } = useTranslation();

  function downloadQRCode() {
    const canvas = document.getElementById('react-qrcode-logo');
    const image = canvas.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.download = 'IB-QRCode.png';
    link.href = image;
    link.click();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <div className="qrCode-Modal container">
        <div className="qrCode-Modal-inner">
          <div
            role="button"
            onClick={handleClose}
            tabIndex="0"
            onKeyDown={handleClose}
          >
            <img
              src={CancelIcon}
              className="close-icon"
              alt="Close"
            />
            <h2 className="qrCode-Modal-title ">{t('dashboard.main.partner.qrTitle')}</h2>
          </div>
          <div className="qrCode-Modal-container">
            <>
              <PartnerLinkQrCode url={affiliateUrl} options={options} />
            </>
          </div>
          <p className="qrCode-Modal-text">
            {t('dashboard.main.partner.qrSubtitle')}
          </p>
          <Button secondaryColor text="Download" action={downloadQRCode} />
        </div>
      </div>
    </Modal>
  );
}
