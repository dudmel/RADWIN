import { IClonable } from '../infra/infra';

export interface HsuBasicParams {
  hsuName: string;
  hsuLocation: string;
  hsuContact: string;
}

export interface HbsBasicParams {
  hbsName: string;
  hbsLocation: string;
}

export interface ISystemModel extends IClonable<ISystemModel> {
  hsu?: HsuBasicParams;
  hbs?: HbsBasicParams;
  upTime?: number;
  hwVersion?: string;
  swVersion?: string;
  serialNumber?: string;
  aggCapacity?: number;
  sectorId: string;
  product?: string;
  macAddress?: string;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  ntpServer?: string;
  ntpTimeOffsetFromUTC: number;
}
