export interface IProfile {
  uuid: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  brandId: string,
  status: string,
  languageCode: string,
}

export interface IAccount {
  profileUUID: string,
  serverId: string,
  login: string,
}

export interface IWithdrawalRequest {
  amount: number,
  accountUUID: string,
  paymentMethod: string,
  profileUUID: string,
  pspReference: string,
}

export interface IWithdrawalSearchPageSorts {
  column: string
  // sorted: boolean,
  direction: string,
}

export interface IWithdrawalSearchPage {
  from: number,
  size: number,
  sorts: IWithdrawalSearchPageSorts[],
}

export interface IWithdrawalSearch {
  page: IWithdrawalSearchPage,
  profileId: string,
  paymentTypes: string[],
  platformType: string,
  paymentMethods: string[],
  statuses?: string[],
  searchParam?: string,
  // withdrawStatuses: string[],
  creationTimeFrom?: string,
  creationTimeTo?: string,
  accountLogin?: string,
  ibPayment: boolean,
}
