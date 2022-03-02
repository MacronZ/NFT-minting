import React, { useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import '../../../../styles/Dashboard/Widgets.scss';

const VideoCard = ({ thumbnail, url, onPlayVideo }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [videoLoaded, setVideoLoaded] = useState(false);
  function copyCode(code) {
    navigator.clipboard.writeText(code);
    enqueueSnackbar('Video Link copied!', {
      variant: 'success',
    });
  }
  return (
    <div className="video-card">
      <div className={videoLoaded ? 'video-loaded' : 'video-loaded video-loading'}>
        <button type="button" className="button-video" onClick={() => onPlayVideo(url)}>
          <img
            src={thumbnail}
            alt=""
            onLoad={() => setTimeout(() => setVideoLoaded(true), 250)}
          />
        </button>
        <div className="bottom">
          <div className="icon">
            <IconButton onClick={() => onPlayVideo(url)}>
              <VisibilityIcon />
            </IconButton>
            <div className="txt-preview">{t('dashboard.marketing.sections.videos.preview')}</div>
          </div>
          <button
            id="clipboardCopy"
            onClick={() => copyCode(url)}
            className="nd-btn"
            type="button"
          >
            {t('dashboard.marketing.sections.videos.copy')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
