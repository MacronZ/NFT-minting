import { Document } from '../models';

const buildNewDocument = async (documentData) => new Document(documentData);

export default { buildNewDocument };
