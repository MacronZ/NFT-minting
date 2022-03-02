import axios from 'axios';
import { errorHelper } from '../helpers';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const s3URL = process.env.REACT_APP_S3_URL;
const s3Token = `Bearer ${process.env.REACT_APP_S3_TOKEN}`;

const instance = axios.create({
  baseURL: backendURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const s3instance = axios.create({
  baseURL: s3URL,
  headers: { Authorization: s3Token },
});

async function s3Upload(formData) {
  try {
    const document = await s3instance.post('/upload/partners', formData);
    return document.data;
  } catch (error) {
    throw new errorHelper.CodeError('We encountered an error, please try again later.', 500);
  }
}

async function upload(user, uuid, s3data, file, documentGroup, documentType, bulkUploading) {
  try {
    const document = await instance.post('/document/upload', JSON.stringify({
      documentData: {
        uuid,
        accountId: user.uuid,
        s3Url: s3data.s3Url,
        key: s3data.s3Key,
        documentName: file.name,
        documentType,
        documentGroup,
        documentStatus: 'Pending',
        rejectionReason: '',
        country: user.countryCode,
      },
      bulkUploading,
    }));
    return document.data;
  } catch (error) {
    throw new errorHelper.CodeError('We encountered an error, please try again later.', error.status);
  }
}

async function getDocuments(accountId) {
  try {
    const document = await instance.get('/document/get-docs', {
      params: { accountId },
    });
    return document.data;
  } catch (error) {
    throw new errorHelper.CodeError('We encountered an error, please try again later.', error.status);
  }
}

async function checkDocumentStatus(accountId) {
  try {
    const document = await instance.get('/document/check', {
      params: { accountId },
    });
    return document.data;
  } catch (error) {
    throw new errorHelper.CodeError('We encountered an error, please try again later.', error.status);
  }
}

async function deleteDocument(documentId) {
  try {
    const data = await instance.delete('/document/delete', { data: JSON.stringify({ documentId }) });
    return data.data;
  } catch (error) {
    throw new errorHelper.CodeError('We encountered an error, please try again later.', error.status);
  }
}

export default {
  s3Upload, upload, getDocuments, checkDocumentStatus, deleteDocument,
};
