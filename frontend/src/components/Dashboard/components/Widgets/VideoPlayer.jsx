import React from 'react';
import ReactPlayer from 'react-player';
import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import '../../../../styles/Dashboard/Widgets.scss';

const VideoPlayer = ({ open, url, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    center
  >
    <ReactPlayer
      playing={false}
      controls
      url={url}
    />
  </Modal>
);

export default VideoPlayer;
