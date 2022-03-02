import { Document } from '../models';
import { CodeError } from '../helpers';
import { IDocument } from '../interfaces/documentInterface';

async function saveDocument(document) {
  try {
    await document.save();
  } catch (error) {
    if (error && error.code === 11000) throw new CodeError('This document already exists.', 409);
    throw new CodeError('Error saving new document, please try again', 500);
  }
}

async function updateDocument(searchParam, pushUpdate) {
  try {
    await Document.findOneAndUpdate(searchParam, pushUpdate, { new: true }).exec();
  } catch (error) {
    throw new CodeError('Something went wrong, please try again', 500);
  }
}

async function getDocument(searchParam) {
  let document;

  try {
    document = await Document.findOne(searchParam).exec();
  } catch (error) {
    throw new CodeError('Something went wrong, please try again', 500);
  }

  return document;
}

async function getMultipleDocuments(searchParam) {
  let documents: IDocument[];

  try {
    documents = await Document.find(searchParam).exec();
  } catch (error) {
    throw new CodeError('Something went wrong, please try again', 500);
  }

  return documents;
}

async function deleteDocument(searchParam) {
  try {
    await Document.findOneAndRemove(searchParam).exec();
  } catch (error) {
    throw new CodeError('Something went wrong, please try again', 500);
  }
}

async function documentExists(searchParam) {
  const user = await Document.exists(searchParam);

  if (!user) throw new CodeError("Document doesn't exist", 404);
}

export default {
  saveDocument, updateDocument, getDocument, getMultipleDocuments, deleteDocument, documentExists,
};
