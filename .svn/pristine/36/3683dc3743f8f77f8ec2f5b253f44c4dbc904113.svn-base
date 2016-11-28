import { IClonable } from '../infra/infra';

export interface IWifiRssiTable {
  mac: string;
  rssi: string;
}

export interface IWifiModel extends IClonable<IWifiModel> {
  wifiMode?: string;
  wifiSSID?: string;
  wifiChannel?: number;
  wifiTxPower?: number;
  wifiSecurityType?: string;
  wifiPassword?: string;
  wifiNetwork?: string;
  wifiApStatus?: string;
  wifiModes?: Array<string>;
  wifiRssiTable?: Array<IWifiRssiTable>;
}
