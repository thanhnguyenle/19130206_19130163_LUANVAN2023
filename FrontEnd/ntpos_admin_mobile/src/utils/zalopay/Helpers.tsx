import { HMacHexStringEncode, HMACSHA256 } from "./HMac/HMacUtil";

let transIdDefault = 1;

export function getAppTransId(): string {
  if (transIdDefault >= 100000) {
    transIdDefault = 1;
  }

  transIdDefault += 1;
  const formatDateTime = new Date().toLocaleString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const timeString = formatDateTime.replace(/[\/\s:]/g, '');
  return `${timeString}${String(transIdDefault).padStart(6, '0')}`;
}

export function getMac(key: string, data: string): string {
  return HMacHexStringEncode(HMACSHA256, key, data) || '';
}
