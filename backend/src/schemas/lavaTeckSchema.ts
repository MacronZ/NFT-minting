import { Schema } from 'mongoose';
import { lavaTeckInterface } from '../interfaces';

const profileSchema = new Schema<lavaTeckInterface.IProfile>({
  uuid: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  brandId: { type: String, required: true },
  status: { type: String, required: true },
  languageCode: { type: String, required: true },
});

const accountSchema = new Schema<lavaTeckInterface.IAccount>({
  profileUUID: { type: String, required: true },
  serverId: { type: String, required: true },
  login: { type: String, required: true },
});

export default { profileSchema, accountSchema };
