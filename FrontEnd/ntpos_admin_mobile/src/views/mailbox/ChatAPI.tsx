import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: '/api/',
});

const headers = {
  'Content-Type': 'application/json',
};

const chatAPI = {
  getMessages: (groupId: string) => {
    console.log('Calling get messages from API');
    return api.get(`messages/${groupId}`);
  },

  sendMessage: (username: string, text: string) => {
    console.log('Calling send message from API');
    const msg = {
      sender: username,
      message: text,
    };
    return api.post('https://5f96-203-113-146-152.ngrok-free.app/chat-service/api/send', msg, { headers: headers });
  },
};

export default chatAPI;