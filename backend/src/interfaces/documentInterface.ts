export interface IDocument {
  uuid: string,
  accountId: string,
  s3Url: string,
  key: string,
  documentName: string,
  documentType: string,
  documentGroup: string,
  documentStatus: string,
  rejectionReason?: string,
  country?: string,
}
