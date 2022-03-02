import { model } from 'mongoose';
import { DocumentInterface } from '../interfaces';
import { DocumentSchema } from '../schemas';

const Document = model < DocumentInterface.IDocument >('Document', DocumentSchema);

export default Document;
