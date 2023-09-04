/// <reference types="node" />
import * as crypto from 'crypto';
export const HMACMD5 = 'HmacMD5';
export const HMACSHA1 = 'HmacSHA1';
export const HMACSHA256 = 'HmacSHA256';
export const HMACSHA512 = 'HmacSHA512';

export const UTF8CHARSET = 'utf8';

function HMacEncode(algorithm: string, key: string, data: string): Buffer | null {
    try {
        const hmacGenerator = crypto.createHmac(algorithm, key);
        hmacGenerator.update(data, UTF8CHARSET);
        return hmacGenerator.digest();
    } catch (ex) {
        return null;
    }
}

export function HMacBase64Encode(algorithm: string, key: string, data: string): string | null {
    const hmacEncodeBytes = HMacEncode(algorithm, key, data);
    if (!hmacEncodeBytes) {
        return null;
    }
    return hmacEncodeBytes.toString('base64');
}

export function HMacHexStringEncode(algorithm: string, key: string, data: string): string | null {
    const hmacEncodeBytes = HMacEncode(algorithm, key, data);
    if (!hmacEncodeBytes) {
        return null;
    }
    return hmacEncodeBytes.toString('hex');
}
