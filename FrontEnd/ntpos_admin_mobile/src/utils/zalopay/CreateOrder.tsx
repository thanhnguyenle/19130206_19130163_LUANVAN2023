import { getAppTransId } from "./Helpers";
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment

export  const config = {
  app_id: "2554",
  key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
  key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};
class CreateOrder {
  private AppId: string;
  private AppUser: string;
  private AppTime: string | null;
  private Amount: string | null;
  private AppTransId: string | null;
  private EmbedData: string;
  private Items: string;
  private BankCode: string;
  private Description: string | null;
  private Mac: string | null;

  constructor() {
    this.AppId = config.app_id.toString();
    this.AppUser = 'Android_Demo';
    this.AppTime = null;
    this.Amount = null;
    this.AppTransId = getAppTransId();
    this.EmbedData = '{}';
    this.Items = '[]';
    this.BankCode = 'zalopayapp';
    this.Description = null;
    this.Mac = null;
  }

  async initializeOrder(amount: string): Promise<void> {
    const appTime = Date.now();
    this.Amount = amount;
    this.AppTime = appTime.toString();
    this.AppTransId = this.generateAppTransId();
    this.Description = `Merchant pay for order #${this.AppTransId}`;
    this.Mac = this.generateMac();

    const data = {
      app_id: this.AppId,
      app_user: this.AppUser,
      app_time: this.AppTime,
      amount: this.Amount,
      app_trans_id: this.AppTransId,
      embed_data: this.EmbedData,
      item: this.Items,
      bank_code: this.BankCode,
      description: this.Description,
      mac: this.Mac,
    };

    try {
      const response = await this.sendPostRequest(config.endpoint, data);
      console.log('Order created successfully:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  private generateAppTransId(): string {
    // Thay thế hàm Helpers.getAppTransId() tại đây nếu cần.
    // Ví dụ: return 'your_generated_app_trans_id';
    return '';
  }

  private generateMac(): string {
    // Thay thế hàm Helpers.getMac() tại đây nếu cần.
    // Ví dụ: return 'your_generated_mac';
    return '';
  }

  private async sendPostRequest(url: string, data: Record<string, string>): Promise<any> {
    try {
      const response = await axios.post(url, data);
      return response;
    } catch (error) {
      console.error('Error sending POST request:', error);
      throw error;
    }
  }
}

// Sử dụng lớp CreateOrder để tạo đơn hàng
const createOrder = new CreateOrder();
const amount = '10000'; // Thay thế bằng số tiền thực tế.
createOrder.initializeOrder(amount)
  .catch((error) => {
    console.error('Error creating order:', error);
  });
