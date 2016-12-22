import { IClonable } from '../infra/infra';
import { Consts } from '../shared';

export interface IApiResponse {
    data?: any;
    error?: any;
}

interface IWifiRssiTable {
  mac: string;
  rssi: string;
}

export interface IConfigMonitor {
    currentTxPower: number;
    maxEirp: number;
    totalTxPower: number;
    wifiApStatus: string;
    wifiRssiTable?: Array<IWifiRssiTable>;
}

export interface IMonitorModel {
    hsuTput?: number;
    hsuRss?: number;
    hbsTput?: number;
    hbsRss?: number;
    hsuLan1RxMbps?: number;
    hsuLan1TxMbps?: number;
    hsuLan1RxFps?: number;
    hsuLan1TxFps?: number;
    hbsLan1RxMbps?: number;
    hbsLan1TxMbps?: number;
    hsuLinkState?: string;
    hsuAirState?: string;
    upTime?: number;
    realTimeAndDate?: string;
    activeAlarmsCounter?: number;
    configMonitor?: IConfigMonitor;
    atpcStstus?: string
};
