/*
IGUser: Interface Get User (for simple fetch)
IFEUser: Interface Front End User (for our FE)
IUser: Interface User (for our DB/BE)
*/

export interface IFinServicesAuthorityData {
  noOfClients: string,
  clientsCountry: string[],
  modeOfCommunication: string[],
  howAttractClients: string[],
  services: string[],
  servicesWebsite: string,
}

export interface IReferralsData{
  authorityName: string,
  registrationNo: string,
  regulatorName: string,
  regulatorWebsite: string,
  subjectToFinancialCrime: boolean,
}

export interface IQuestionnaireData {
  questionnaireTimestamp: Date,
  referralsData: IReferralsData,
  isFinServicesAuthRegulated: boolean,
  finServicesAuthorityData: IFinServicesAuthorityData,
}

export interface ISocialData {
  facebook?: string,
  linkedin?: string
  instagram?: string,
  skype?: string,
  contactMethod?: string,
  availableDays?: string[],
  availableFrom?: Date,
  availableTo?: Date,
  availableHours: {
    from?: number,
    to?: number,
  },
}

export interface ICampaignRequest {
  uuid: string,
  id: string,
  name: string
  type: string,
  status: string,
  onRegistration: boolean,
}

export interface ISurvey {
  uuid: string;
  name: string;
  count: number;
  opened: boolean
}

export interface IBankDetails {
  nameOfAccount: string;
  bankAccountNumber: string;
  branchName: string;
  bankCode: string;
  bankName: string;
  bankCity: string;
}

export interface ISkrillDetails {
  firstName: string;
  lastName: string;
  email: string;
}

export interface INetellerDetails {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUser {
  uuid: string;
  email: string;
  password: string;
  salt?: string;
  firstName: string;
  lastName: string;
  phoneNum: string;
  countryCode: string;
  language: string;
  nullPointId?: string;
  lavaTeckId?: string;
  tradingAccount?: string;
  registrationTimestamp: Date;
  emailVerified: boolean;
  socialData: ISocialData;
  entity: string;
  migrated: boolean;
  walkThroughCompleted?: boolean;
  status?: string;
  theme?: string;
  campaignRequests: ICampaignRequest[];
  surveys: ISurvey[];
  promoCampaign?: string;
  questionnaireCompleted?: boolean;
  questionnaireData: IQuestionnaireData;
  bankData?: IBankDetails;
  skrillData?: ISkrillDetails;
  netellerData?: INetellerDetails;
  parentIB?: string;
  registeredIp?: string;
}

export interface IFEUser {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNum: string;
  countryCode: string;
  language: string;
  nullPointId?: string;
  lavaTeckId?: string;
  tradingAccount?: string;
  registrationTimestamp: Date,
  emailVerified: boolean;
  socialData: ISocialData;
  entity: string;
  walkThroughCompleted?: boolean;
  status?: string;
  theme?: string;
  promoCampaign?: string;
  questionnaireCompleted?: boolean;
  questionnaireData?: IQuestionnaireData;
}

export interface IGUser {
  uuid: string,
  email: string,
  firstName: string,
  lastName: string,
  status?: string,
}
