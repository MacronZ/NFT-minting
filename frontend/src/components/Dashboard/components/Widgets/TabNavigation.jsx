/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../../styles/Dashboard/Widgets.scss';

const TabNavigation = ({ tabs }) => {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState('ltr');
  const [selected, setSelected] = useState(tabs[0]);
  const [linkBarStyle, setStyle] = useState();
  const tabList = useRef();

  useEffect(() => {
    if (i18n.language === 'ar') setDirection('rtl');
    else setDirection('ltr');
  }, [i18n.language]);

  const handleSelect = (e, tab) => {
    setSelected(tab);
    const eles = tabList.current.getElementsByClassName('tab-header');
    let offset = 0;
    let width = 0;
    for (let i = 0; i < eles.length; i += 1) {
      if (eles[i] === e.target) {
        width = e.target.offsetWidth;
        break;
      } else {
        offset += eles[i].offsetWidth;
      }
    }
    if (direction === 'ltr') setStyle({ width: width - 10, left: offset + 5 });
    else setStyle({ width: width - 10, right: offset + 5 });
  };

  useEffect(() => {
    const eles = tabList.current.getElementsByClassName('tab-header');
    handleSelect({ target: eles[0] }, tabs[0]);
  }, [direction, i18n.language]);

  return (
    <div className="tabs-container">
      <div className="tab-headers" ref={tabList}>
        {tabs.map((t) => (
          <div
            className={`tab-header ${t.key === selected.key ? 'active-tab' : ''}`}
            onClick={(e) => handleSelect(e, t)}
            key={t.key}
          >
            {t.title}
          </div>
        ))}
        <div className="tab-active-link-bar" style={linkBarStyle} />
      </div>
      <div className="tab-content">
        {selected.props ? <selected.Component {...selected.props} /> : <selected.Component />}
      </div>
    </div>
  );
};

export default TabNavigation;
