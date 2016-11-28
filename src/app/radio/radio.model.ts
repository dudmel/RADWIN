import * as infra from '../infra/infra';

export interface IRadioOptions {
    cbwList: Array<number>;
    bandList: Array<string>;
    antennaConnectionList: Array<string>;
    antennaTypeList: Array<string>;
}

export interface IRadioModel extends infra.IClonable<IRadioModel> {
    sectorId: string;
    currentBand: string;
    currentCbw: number;
    currentFrequency: number;
    antennaType: string;
    antennaConnectionType: string;
    totalTxPower: number;
    desiredTxPower: number;
    minTxPower: number;
    maxTxPower: number;
    cableLoss: number;
    currentEirp: number;
    maxEirp: number;
    antennaGain: number;
    maxAntennaGain: number;
    minAntennaGain: number;
    options: IRadioOptions;
    hsuType: string;
    mobilityLevel: number;
}
