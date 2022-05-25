export type ValueType = {
  type:
    | 'WIFI'
    | 'WEB'
    | 'URL'
    | 'PHONE'
    | 'BITCOIN'
    | 'ETHEREUM'
    | 'MAIL'
    | 'JSON'
    | 'TEXT';
  value: string;
  data?: Record<string, string>;
};

const webRegex =
  /^(?:(?:ftp|http|https):\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;

const wifiNetworkRegex = /T:([a-zA-Z]+)(?=;)/;
const wifiSSISDRegex = /S:((([^;?"$[\\\]+])|(\\[\\;,:]))+)(?=;)/;
const wifiPasswordSDRegex = /P:(((\\[\\;,:])|([^;]))+)(?=;)/;

const urlRegex =
  /^(?:[a-zA-Z]+:\/\/) {2}[\w-]+(?:\.[\w.-]+)?[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;

export function getValueType(value: string): ValueType {
  if (value.startsWith('WIFI:')) {
    const network = wifiNetworkRegex.exec(value);
    const ssid = wifiSSISDRegex.exec(value);
    const password = wifiPasswordSDRegex.exec(value);

    if (network && ssid && password) {
      return {
        type: 'WIFI',
        value,
        data: {
          network: network[1],
          ssid: ssid[1],
          password: password[1],
        },
      };
    }
  }

  if (webRegex.test(value)) {
    return {type: 'WEB', value};
  }

  if (urlRegex.test(value)) {
    return {type: 'URL', value};
  }

  if (value.startsWith('tel:')) {
    const phone = value.split('tel:')[1];
    return {type: 'PHONE', value, data: {phone}};
  }

  if (value.startsWith('ethereum:')) {
    const wallet = value.split('ethereum:')[1];
    return {type: 'ETHEREUM', value, data: {wallet}};
  }

  if (value.startsWith('bitcoin:')) {
    const wallet = value.split('bitcoin:')[1];
    return {type: 'BITCOIN', value, data: {wallet}};
  }

  if (value.startsWith('mailto:')) {
    return {type: 'MAIL', value};
  }

  try {
    const object = JSON.parse(value);
    if (typeof object === 'object') {
      return {type: 'JSON', value, data: {object}};
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return {type: 'TEXT', value};
}
