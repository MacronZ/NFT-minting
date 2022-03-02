import { Schema } from 'mongoose';
import { DocumentInterface } from '../interfaces';

const DocumentSchema = new Schema<DocumentInterface.IDocument>({
  uuid: { type: String, required: true, unique: true },
  accountId: { type: String, required: true },
  s3Url: { type: String, required: true, unique: true },
  key: { type: String, required: true },
  documentName: { type: String, required: true },
  documentType: { type: String, required: true },
  documentGroup: { type: String, required: true },
  documentStatus: { type: String, required: true },
  rejectionReason: { type: String },
  country: { type: String, required: false },
});

export default DocumentSchema;
