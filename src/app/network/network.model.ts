import { IClonable } from '../infra/infra';

export interface ITrapDestination {
  hostIndex?: number;
  hostIp?: string;
  hostPort?: number;
  password?: string;
  username?: string;
  securityModel?: string;
}

export interface INetworkModel extends IClonable<INetworkModel> {
  ipParams: {
    hsuIp: string;
    hsuSubnetMask: string;
    hsuDefaultGateway: string;
  };
  vlanId: number;
  vlanPriority: number;
  crcErrors: number;
  currentPortState: string;
  desiredPortState: string;
}
