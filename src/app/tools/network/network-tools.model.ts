import { IClonable } from '../../infra/infra';

export interface INetworkToolsModel extends IClonable<INetworkToolsModel> {
  ip?: string;
  packetCount?: number;
  packetSize?: number;
  result?: string;
}

export interface ISpeedTestModel extends IClonable<ISpeedTestModel> {
  ulSpeed?: number;
  dlSpeed?: number;
}
