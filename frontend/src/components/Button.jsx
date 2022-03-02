import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import ScaleLoader from 'react-spinners/ScaleLoader';
import '../styles/components/Button.scss';

export default function Button({
  secondaryColor, text, arrow, action, link, riskWarning, formButton, loading,
}) {
  const { t } = useTranslation();
  const ctaStyle = {
    color: secondaryColor ? '#000' : '#fff',
    backgroundColor: secondaryColor ? '#D5E05B' : '#50B848',
  };

  return (
    <div className="cta-container">
      {link ? (
        <a href={link} className={`cta secondary-bg-color ${arrow && 'arrow-cta'}`} style={ctaStyle}>
          {loading ? (
            <ScaleLoader color="#0000009c" css="display: flex" height={18} />
          ) : (
            <div>
              {text}
              {arrow && (<BsArrowRight className="arrow-icon" />)}
            </div>
          )}
        </a>
      ) : (
        <button
          className={`cta secondary-bg-color ${arrow ? 'arrow-cta' : null}`}
          style={ctaStyle}
          type={formButton ? 'submit' : 'button'}
          onClick={action}
          disabled={loading}
        >
          {loading ? (
            <ScaleLoader color="#0000009c" css="display: flex" height={18} />
          ) : (
            <div>
              {text}
              {arrow && (<BsArrowRight className="arrow-icon" />)}
            </div>
          )}
        </button>
      )}
      {riskWarning
        ? <p className="cta-warning">{t('risk')}</p>
        : null}
    </div>
  );
}
