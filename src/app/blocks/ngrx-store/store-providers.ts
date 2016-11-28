import { provideStore } from '@ngrx/store';

// Reducers
import { monitorReducer, timeoutReducer, systemReducer,
         radioReducer, wifiReducer, changeBandReducer,
         networkReducer, activeAlarmsReducer, spectrumReducer, trapsReducer,
         spectrumRangeReducer, speedTestReducer, tokenExpirationReducer,
         crcDecreaserReducer, activeAlarmsCounterReducer, eventsReducer, monitorSuspendReducer } from './reducers';




  export const STORE_PROVIDERS = [
      provideStore({monitor: monitorReducer,
                system: systemReducer,
                network: networkReducer,
                radio: radioReducer,
                wifi: wifiReducer,
                spectrum: spectrumReducer,
                spectrumRange: spectrumRangeReducer,
                events: eventsReducer,
                speedTest: speedTestReducer,
                changeBand: changeBandReducer,
                activeAlarmsCounter: activeAlarmsCounterReducer,
                activeAlarms: activeAlarmsReducer,
                traps: trapsReducer,
                tokenExpiration: tokenExpirationReducer,
                crcDecreaser: crcDecreaserReducer,
                timeoutOccured: timeoutReducer,
                monitorSuspend: monitorSuspendReducer,
              }),
              ];