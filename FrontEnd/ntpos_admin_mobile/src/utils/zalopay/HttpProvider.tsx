import axios, { AxiosResponse } from 'axios';

class HttpProvider {
  static async sendPost(URL: string, formBody: any): Promise<any> {
    let data: any = null;

    try {
      const spec = {
        protocol: 'tls',
        minVersion: 'TLSv1.2',
        cipher: [
          'ECDHE-ECDSA-AES128-GCM-SHA256',
          'ECDHE-RSA-AES128-GCM-SHA256',
          'DHE-RSA-AES128-GCM-SHA256',
        ],
      };

      const client = axios.create({
        baseURL: URL,
        timeout: 5000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        httpsAgent: {
          ciphers: spec.cipher.join(':'),
          minVersion: spec.minVersion,
          secureProtocol: spec.protocol,
        },
      });

      const response: AxiosResponse = await client.post('', formBody);

      if (response.status !== 200) {
        console.error('BAD_REQUEST', response.data);
      } else {
        data = response.data;
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }

    return data;
  }
}

export default HttpProvider;
