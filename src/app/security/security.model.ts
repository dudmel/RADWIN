import * as infra from '../infra/infra';


export interface ISecurityModel extends infra.IClonable<ISecurityModel> {
  currentPassword: string;
  newPassword: string;
}