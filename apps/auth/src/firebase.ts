import * as firebaseAccountService from '../firebaseServiceAccount.json'

export const firebaseParams = {
  type: firebaseAccountService.type,
  projectId: firebaseAccountService.project_id,
  privateKeyId: firebaseAccountService.private_key_id,
  privateKey: firebaseAccountService.private_key,
  clientEmail: firebaseAccountService.client_email,
  clientId: firebaseAccountService.client_id,
  authUri: firebaseAccountService.auth_uri,
  tokenUri: firebaseAccountService.token_uri,
  authProviderX509CertUrl: firebaseAccountService.auth_provider_x509_cert_url,
  clientC509CertUrl: firebaseAccountService.client_x509_cert_url,
};
