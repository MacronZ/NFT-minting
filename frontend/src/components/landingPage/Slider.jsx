import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SliderComponent from 'rc-slider';
import HeadShake from 'react-reveal/Shake';
import 'rc-slider/assets/index.css';
import '../../styles/LandingPage/Slider.scss';

export default function Slider() {
  const [leftValue, setLeftValue] = useState(10);
  const [rightValue, setRightValue] = useState('$800');
  const { t } = useTranslation();

  const log = (value) => {
    setLeftValue(value);
    setRightValue(`$${value * 80}`);
  };

  return (
    <div className="slider">
      <div className="slider-inner container">
        <div className="heading">
          <h2 className="title">{t('slider.title')}</h2>
          <h3 className="green-text subtitle">{t('slider.subTitle')}</h3>
        </div>
        <div className="slider-box">
          <div className="left">
            <h2 className="value">{leftValue}</h2>
            <p className="text">
              {t('slider.clients.top')}
              <br />
              {t('slider.clients.bottom')}
            </p>
          </div>
          <div className="center">
            <HeadShake>
              <div className="slider-container">
                <SliderComponent onChange={log} min={10} max={400} />
              </div>
            </HeadShake>
            <ul className="steps">
              <li className="step">10</li>
              <li className="step">100</li>
              <li className="step">200</li>
              <li className="step">300</li>
              <li className="step">400</li>
            </ul>
          </div>
          <div className="right">
            <h2 className="value">{rightValue}</h2>
            <p className="text">
              {t('slider.income.top')}
              <br />
              {t('slider.income.bottom')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
