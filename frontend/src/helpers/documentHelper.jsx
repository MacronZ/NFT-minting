import React from 'react';
import {
  FaFileImage, FaFileWord, FaRegFileImage, FaRegFilePdf,
} from 'react-icons/fa';

const getPreviewByFileName = (name) => {
  const extension = name.split('.')[name.split('.').length - 1];
  if (['jpg', 'jpeg'].indexOf(extension) > -1) {
    return <FaFileImage />;
  }
  if (['png'].indexOf(extension) > -1) {
    return <FaRegFileImage />;
  }
  if (['doc', 'docx', 'odt'].indexOf(extension) > -1) {
    return <FaFileWord />;
  }
  return <FaRegFilePdf />;
};

export default { getPreviewByFileName };
