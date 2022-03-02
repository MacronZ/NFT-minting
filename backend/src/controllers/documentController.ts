import sfController from './sfController';
import { Document } from '../models';
import { documentDB } from '../database';
import { documentHelper, validationHelper, CodeError } from '../helpers';

const uploadDocument = async (req, res) => {
  const { bulkUploading, documentData } = req.body;
  const document = await documentHelper.buildNewDocument(documentData);
  const { accountId, documentGroup } = document;

  if (!bulkUploading) {
    try {
      if (await Document.exists({ accountId, documentGroup })) {
        await documentDB.deleteDocument({ accountId, documentGroup });
      }
    } catch (error) {
      return res.status(500).send('We encountered an error, please try again later');
    }
  }

  try {
    await sfController.uploadDocument(document);
    await documentDB.saveDocument(document);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send();
};

const updateDocument = async (req, res) => {
  const { uuid, token, updateData } = req.body;

  try {
    await validationHelper.checkToken(token);
    await documentDB.documentExists({ uuid });
    await documentDB.updateDocument({ uuid }, updateData);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send();
};

const getDocumentsByUserId = async (req, res) => {
  const { accountId } = req.query;
  let document;

  try {
    document = await documentDB.getMultipleDocuments({ accountId });
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send(document);
};

const createDocument = async (req, res) => {
  const documentData = req.body;
  const { token } = req.body;
  const document = await documentHelper.buildNewDocument(documentData);
  const { accountId, documentGroup } = document;
  try {
    await validationHelper.checkToken(token);
    if (await Document.exists({ accountId, documentGroup })) {
      await documentDB.deleteDocument({ accountId, documentGroup });
    }
    await documentDB.saveDocument(document);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }

  return res.status(200).send();
};

const checkDocumentsStatus = async (req, res) => {
  const { accountId } = req.query;
  let docStatus = true;
  const statusHolder = {
    poi: true,
    por: true,
  };

  try {
    const documents = await documentDB.getMultipleDocuments({ accountId });
    documents.map((document) => {
      if (document.documentStatus !== 'Approved' && document.documentGroup === 'PROOF_OF_ADDRESS') statusHolder.por = false;
      if (document.documentStatus !== 'Approved' && document.documentGroup === 'PROOF_OF_ID') statusHolder.poi = false;
      return statusHolder;
    });
    if (!documents || !statusHolder.poi || !statusHolder.por || documents.length < 2) docStatus = false;
    return res.status(200).send(docStatus);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }
};

const deleteDocument = async (req, res) => {
  const { documentId } = req.body;

  try {
    const document = await documentDB.getDocument({ uuid: documentId });
    if (!document) throw new CodeError('Document not found', 404);
    await sfController.deleteDocument(document);
    await documentDB.deleteDocument({ uuid: documentId });
  } catch (error) {
    return res.status(500).send('We encountered an error, please try again later');
  }

  return res.status(200).send();
};

export default {
  uploadDocument, updateDocument, getDocumentsByUserId, createDocument, checkDocumentsStatus, deleteDocument,
};
