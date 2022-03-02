enum RequestType {
  CALLBACK,
  IB_SUPPORT,
  EMAIL_SUPPORT,
}

enum Regulator {
  CYSEC,
  FSA,
  FSC,
}

export interface ICallBackData {
  firstName: string,
  lastName: string,
  phoneNum: string,
  countryCode: string,
  phoneCountryCode: string,
  timeFrom: string,
  timeTo: string,
  language: string,
  entity: Regulator,
}

export interface ISupportData {
  message: string,
}

export interface IEmailData {
  language: string,
  firstName: string,
  lastName: string,
  email: string,
  message: string,
  entity: Regulator,
}

export interface IRequest {
  uuid?: string,
  requestType: RequestType,
  callBackData?: ICallBackData,
  supportData?: ISupportData,
  emailData?: IEmailData,
}
