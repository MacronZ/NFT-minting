import React from 'react';
import { QRCode } from 'react-qrcode-logo';

export default function PartnerLinkQrCode(props) {
  const defaultOptions = {
    ecLevel: 'M',
    enableCORS: false,
    size: 150,
    quietZone: 10,
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    logoImage: '',
    logoWidth: 30,
    logoHeight: 30,
    logoOpacity: 1,
    qrStyle: 'squares',
  };
  // eslint-disable-next-line react/destructuring-assignment
  const options = { ...defaultOptions, ...props.options };
  // eslint-disable-next-line react/destructuring-assignment,react/jsx-props-no-spreading
  return <QRCode value={props.url} {...options} id="qrCodeImage" />;
}
