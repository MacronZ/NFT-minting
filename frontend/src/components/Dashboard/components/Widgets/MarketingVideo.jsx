/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import VideoCard from './VideoCard';
import VideoPlayer from './VideoPlayer';
import '../../../../styles/Dashboard/Widgets.scss';
import { videosHelper } from '../../../../helpers';
import videoOptions from '../../../../utils/videoOptions';

const MarketingVideo = () => {
  const { t } = useTranslation();
  const [videoSize, setVideoSize] = useState(0);
  const [language, setLanguage] = useState(0);
  const [theme, setTheme] = useState(0);
  const [videoUrl, setVideoUrl] = useState();
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    setFilteredVideos(videosHelper.filter(language, videoSize, theme));
  }, [videoSize, language, theme]);

  return (
    <div className="marketing-video">
      <div className="referralSelectors">
        <div className="selector">
          <label htmlFor="Language" className="optionsLabel">
            {t('dashboard.marketing.sections.videos.selectors.language')}
          </label>
          <select
            className="optionsSelector"
            id="language"
            value={language}
            onChange={(e) => setLanguage(Number(e.target.value))}
          >
            {videoOptions.languageOptions.map((option) => (
              <option key={option.key} value={option.key}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="selector">
          <label htmlFor="size" className="optionsLabel">
            {t('dashboard.marketing.sections.videos.selectors.size')}
          </label>
          <select
            className="optionsSelector"
            id="size"
            value={videoSize}
            onChange={(e) => setVideoSize(Number(e.target.value))}
          >
            {videoOptions.sizeOptions.map((option) => (
              <option key={option.key} value={option.key}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="selector">
          <label htmlFor="Theme" className="optionsLabel">
            {t('dashboard.marketing.sections.videos.selectors.theme')}
          </label>
          <select
            className="optionsSelector"
            id="theme"
            value={theme}
            onChange={(e) => setTheme(Number(e.target.value))}
          >
            {videoOptions.themeOptions.map((option) => (
              <option key={option.key} value={option.key}>{option.name}</option>
            ))}
          </select>
        </div>

      </div>
      <div className="content">
        <VideoPlayer open={videoUrl != null} url={videoUrl} onClose={() => setVideoUrl(null)} />
        <div className="videos">

          {filteredVideos.length > 0 ? filteredVideos.map((video) => (
            <VideoCard key={video.id} {...video} onPlayVideo={(url) => setVideoUrl(url)} />
          ))
            : <h1 className="noResult">{t('dashboard.marketing.sections.videos.noResult')}</h1>}
        </div>
      </div>
    </div>
  );
};

export default MarketingVideo;
