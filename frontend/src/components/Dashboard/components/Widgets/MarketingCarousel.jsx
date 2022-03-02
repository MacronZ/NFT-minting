/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Banner1,
  Banner1Dark,
  Banner2,
  Banner2Dark,
  Banner3,
  Banner3Dark,
  Banner4,
} from '../../../../media/images/banner/index';
import '../../../../styles/Dashboard/Widgets.scss';

const delay = 2500;

export default function MarketingCarousel() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const { i18n, t } = useTranslation();

  const getTheme = useSelector((state) => state.theme);

  const banners = [
    {
      image: Banner1,
      text: t('dashboard.main.banners.welcome'),
    },
    {
      image: Banner2,
      text: t('dashboard.main.banners.zero'),
    },
    {
      image: Banner3,
      text: t('dashboard.main.banners.tradingCentral'),
    },
    {
      image: Banner4,
      text: t('dashboard.main.banners.1000'),
    },
  ];

  const bannersDark = [
    {
      image: Banner1Dark,
      text: t('dashboard.main.banners.welcome'),
    },
    {
      image: Banner2Dark,
      text: t('dashboard.main.banners.zero'),
    },
    {
      image: Banner3Dark,
      text: t('dashboard.main.banners.tradingCentral'),
    },
    {
      image: Banner4,
      text: t('dashboard.main.banners.1000'),
    },
  ];
  const bannersSelector = getTheme === 'dark' ? bannersDark : banners;

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1)),
      delay,
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="marketing-carousel widget-carousel">
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: i18n.language === 'ar' ? `translate3d(${index * 100}%, 0, 0)` : `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {bannersSelector.map((banner, bannerIndex) => (
            <div
              className="slide"
              key={`Banner-${bannerIndex}`}
            >
              <div className="slide-inner">
                <img src={banner.image} className="banner-image" alt={bannerIndex} />
                <p className="banner-text">{banner.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="slideshowDots">
          {banners.map((_, idx) => (
            <input
              type="button"
              key={idx}
              className={`slideshowDot${index === idx ? ' active' : ''}`}
              onClick={() => {
                setIndex(idx);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
