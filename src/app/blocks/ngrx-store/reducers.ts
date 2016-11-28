// -------------------------------------------------------------------
// APP REDUCERS
// -------------------------------------------------------------------
export const monitorReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GET_MONITOR':
      return Object.assign({}, payload);
    default:
      return state;
  }
};

export const systemReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GET_SYSTEM':
      return payload;
    case 'SET_SYSTEM':
    // todo new values should be updated to current state
      return payload;
    default:
      return state;
  }
};

export const radioReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GET_RADIO':
      return payload;
    case 'SET_RADIO':
    // todo new values should be updated to current state
      return payload;
    default:
      return state;
  }
};


export const networkReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GET_NETWORK':
      return payload;
    case 'SET_NETWORK':
      return payload;
    default:
      return state;
  }
};

export const trapsReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GET_TRAPS':
      return payload;
    case 'SET_TRAPS':
      return payload;
    default:
      return state;
  }
};

export const eventsReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GET_EVENTS':
      return payload;
    default:
      return state;
  }
};

export const wifiReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GET_WIFI':
      return payload;
    case 'SET_WIFI':
      return payload;
    default:
      return state;
  }
};

export const spectrumReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GET_SPECTRUM_TABLE':
      return payload;
    default:
      return state;
  }
};

export const spectrumRangeReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GET_SPECTRUM_RANGE':
      return payload;
    default:
      return state;
  }
};

export const speedTestReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GET_SPEEDTEST_DATA':
      return payload;
    case 'CLEAR_SPEEDTEST_DATA':
      return state = { 'dlSpeed': 0.001, 'ulSpeed': 0.001 };
    default:
      return state;
  }
};

export const changeBandReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GET_BANDS':
      return payload;
    default:
      return state;
  }
};


export const timeoutReducer = (state: any = false, {type, payload}) => {
  switch (type) {
    case 'TIMEOUT_OCCURED':
      return state = true;
    default:
      return state = false;
  }
};

export const monitorSuspendReducer = (state: any = false, {type, payload}) => {
  switch (type) {
    case 'MONITOR_SUSPEND_ON':
      return state = true;
    case 'MONITOR_SUSPEND_OFF':
      return state = false;
    default:
      return state = false;
  }
};

export const tokenExpirationReducer = (state: any = false, {type, payload}) => {
  switch (type) {
    case 'TOKEN_EXPIRATION':
      return state = true;
    default:
      return state = false;
  }
};

export const activeAlarmsCounterReducer = (state: number = 0, {type, payload}) => {
  switch (type) {
    case 'INCREMENT_ALARMS_COUNTER':
      return state;
    default:
      return state;
  }
};

export const activeAlarmsReducer = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GET_ALARMS':
      return payload;
    default:
      return state;
  }
};

export const crcDecreaserReducer = (state: number = 0, {type, payload}) => {
  switch (type) {
    case 'SET_CRC_DECREASER':
      return payload;
    default:
      return state;
  }
};
