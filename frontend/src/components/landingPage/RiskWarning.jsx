import React, { useEffect, useState } from 'react';
import { Popover, Typography } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useTranslation } from 'react-i18next';
import useWindowDimensions from '../../utils/WindowDimensions';
import '../../styles/LandingPage/RiskWarning.scss';
import CySecDocs from '../../media/docs/cysec';
import FSADocs from '../../media/docs/fsa';

export default function RiskWarning({ entity }) {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [toggle, setToggle] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = React.useRef();
  const popupIsOpen = Boolean(anchorEl);

  const handleClick = () => {
    document.getElementById('app-root').classList.toggle('large');
    setToggle(!toggle);
  };

  useEffect(() => {
    setAnchorEl(divRef.current);
  }, [divRef]);

  return (
    <div className="risk-warning-parent">
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        open={popupIsOpen}
      />
      <Typography
        className={`risk-warning-body ${
          toggle ? 'risk-warning-openDetails' : 'risk-warning-closeDetails'
        }`}
        component="span"
      >
        <p className="risk-warning-para" style={width <= 700 ? { marginRight: '30px' } : {}}>
          <span className="green-text">
            {t(`footer.${entity}.riskWarning.title`)}
          </span>
          {t(`footer.${entity}.riskWarning.text`)}
          <a
            href={
                entity === 'fsa'
                  ? FSADocs.ClientAgreement
                  : CySecDocs.RiskDisclosure
              }
            download={t(`footer.${entity}.riskWarning.url`)}
            className="green-text"
          >
            {t(`footer.${entity}.riskWarning.file`)}
          </a>
        </p>
        {width <= 700 && (
          <span className="risk-warning-toggleIcon">
            {toggle ? (
              <ExpandLessIcon onClick={handleClick} />
            ) : (
              <ExpandMoreIcon onClick={handleClick} />
            )}
          </span>
        )}
      </Typography>
    </div>
  );
}
