export class HexStringUtil {
    private static readonly HEX_CHAR_TABLE: Buffer = Buffer.from(
      '0123456789abcdef',
      'ascii'
    );

    /**
     * Convert a byte array to a hexadecimal string
     *
     * @param raw A raw byte array
     * @returns Hexadecimal string
     */
    public static byteArrayToHexString(raw: Buffer): string {
        const hex: Buffer = Buffer.alloc(2 * raw.length);
        let index = 0;

        for (const byte of raw) {
            const v = byte & 0xff;
            hex[index++] = HexStringUtil.HEX_CHAR_TABLE[v >>> 4];
            hex[index++] = HexStringUtil.HEX_CHAR_TABLE[v & 0xf];
        }

        return hex.toString('ascii');
    }

    /**
     * Convert a hexadecimal string to a byte array
     *
     * @param hex A hexadecimal string
     * @returns The byte array
     */
    public static hexStringToByteArray(hex: string): Buffer {
        const hexstandard = hex.toLowerCase();
        const sz = hexstandard.length / 2;
        const bytesResult = Buffer.alloc(sz);

        let idx = 0;
        for (let i = 0; i < sz; i++) {
            bytesResult[i] = hexstandard.charCodeAt(idx);
            idx++;
            let tmp = hexstandard.charCodeAt(idx);
            idx++;

            if (bytesResult[i] > 57) {
                bytesResult[i] -= 87; // 'a'.charCodeAt(0) - 10
            } else {
                bytesResult[i] -= 48; // '0'.charCodeAt(0)
            }
            if (tmp > 57) {
                tmp -= 87; // 'a'.charCodeAt(0) - 10
            } else {
                tmp -= 48; // '0'.charCodeAt(0)
            }

            bytesResult[i] = (bytesResult[i] * 16) + tmp;
        }

        return bytesResult;
    }
}
