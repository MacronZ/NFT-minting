import { Schema } from 'mongoose';
import { UserInterface } from '../interfaces';

const socialDataSchema = new Schema<UserInterface.ISocialData>({
  facebook: { type: String, required: false },
  linkedin: { type: String, required: false },
  instagram: { type: String, required: false },
  skype: { type: String, required: false },
  contactMethod: { type: String, required: false },
  availableDays: { type: [String], required: false },
  availableFrom: { type: Date, required: false },
  availableTo: { type: Date, required: false },
  availableHours: {
    from: { type: Number, required: false },
    to: { type: Number, required: false },
  },
});

const campaignRequestSchema = new Schema<UserInterface.ICampaignRequest>({
  uuid: { type: String, required: true, unique: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['standard', 'master', 'custom'],
  },
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'REJECTED', 'APPROVED', 'TERMINATED'],
  },
  onRegistration: { type: Boolean, required: true },
});

const surveySchema = new Schema<UserInterface.ISurvey>({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  count: { type: Number, required: true },
  opened: {
    type: Boolean,
    required: true,
  },
});

const referralsDataSchema = new Schema<UserInterface.IReferralsData>({
  noOfClients: {
    type: String,
    required: true,
    enum: ['0 - 5', '5 - 10', '10 - 50', '50+'],
  },
  clientsCountry: { type: [String], required: true },
  modeOfCommunication: {
    type: [String],
    required: true,
    enum: ['Email', 'Phone', 'Social Media', 'Website'],
  },
  howAttractClients: {
    type: [String],
    required: true,
    enum: ['Website', 'Word of mouth', 'Personal Network', 'Social Media'],
  },
  services: { type: Array, required: true },
  servicesWebsite: { type: String },
});

const finServicesAuthRegulatedInfo = new Schema<UserInterface.IFinServicesAuthorityData>({
  authorityName: { type: String, required: true },
  registrationNo: { type: String, required: true },
  regulatorName: { type: String, required: true },
  regulatorWebsite: { type: String, required: true },
  subjectToFinancialCrime: { type: Boolean, required: true },
});

const questionnaireDataSchema = new Schema<UserInterface.IQuestionnaireData>({
  questionnaireTimestamp: { type: Date, required: true },
  referralsData: { type: referralsDataSchema },
  isFinServicesAuthRegulated: { type: Boolean, required: true },
  finServicesAuthorityData: { type: finServicesAuthRegulatedInfo },
});

const bankDataSchema = new Schema<UserInterface.IBankDetails>({
  nameOfAccount: { type: String, required: true },
  bankAccountNumber: { type: String, required: true },
  branchName: { type: String, required: true },
  bankCode: { type: String, required: true },
  bankName: { type: String, required: true },
  bankCity: { type: String, required: true },
});

const skrillDataSchema = new Schema<UserInterface.ISkrillDetails>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

const netellerDataSchema = new Schema<UserInterface.INetellerDetails>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

const UserSchema = new Schema<UserInterface.IUser>({
  uuid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNum: { type: String, required: true },
  countryCode: { type: String, required: true },
  language: { type: String, required: true },
  nullPointId: { type: String, unique: false, sparse: true },
  lavaTeckId: { type: String, unique: true },
  tradingAccount: { type: String, unique: true },
  registrationTimestamp: { type: Date, required: true },
  emailVerified: { type: Boolean, required: true },
  socialData: { type: socialDataSchema },
  entity: { type: String, required: true },
  walkThroughCompleted: { type: Boolean, required: false },
  migrated: { type: Boolean, required: true },
  status: { type: String, required: false },
  theme: { type: String, required: false },
  campaignRequests: { type: [campaignRequestSchema] },
  surveys: { type: [surveySchema] },
  promoCampaign: { type: String, required: false },
  questionnaireCompleted: { type: Boolean },
  questionnaireData: { type: questionnaireDataSchema },
  bankData: { type: bankDataSchema },
  skrillData: { type: skrillDataSchema },
  netellerData: { type: netellerDataSchema },
  parentIB: { type: String, required: false },
  registeredIp: { type: String },
});

export default UserSchema;
