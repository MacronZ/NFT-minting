import React from 'react';
import '../styles/Onboarding/OnBoarding.scss';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ClipLoader from 'react-spinners/ClipLoader';
import { useSelector } from 'react-redux';
import { documentHelper } from '../helpers';

export default function DocumentRow({
  key, file, uploaded, onDelete, showRejectionReason, loading, docIdToDelete,
}) {
  let { documentName, documentStatus, rejectionReason } = file;
  const getTheme = useSelector((state) => state.theme);
  const clipLoaderColor = getTheme === 'dark' ? '#ffffff' : '#000000';

  if (!uploaded) {
    documentName = file.name;
    documentStatus = 'Draft';
    rejectionReason = '';
  }

  return (
    <div className="item">
      {documentHelper.getPreviewByFileName(documentName)}
      <div className="name">{documentName}</div>
      <div className="rejected-with-reason-div">
        <div className={`status ${documentStatus}`}>
          {documentStatus}
        </div>
        {showRejectionReason && rejectionReason && <span className="rejection-reason">{`( ${rejectionReason} )`}</span>}
      </div>
      <div className="button">
        {documentStatus !== 'Approved' && (loading && docIdToDelete === file.uuid
          ? <ClipLoader color={clipLoaderColor} css="display: flex" size={15} />
          : <DeleteOutlineIcon onClick={() => onDelete(key, file, uploaded)} />)}
      </div>
    </div>
  );
}
