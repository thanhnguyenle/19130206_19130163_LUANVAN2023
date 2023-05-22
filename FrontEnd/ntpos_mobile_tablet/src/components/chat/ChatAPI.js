import Axios from 'axios';

const api = Axios.create({
  baseURL: '/api/',
});
const headers = {
  'Content-Type': 'application/json',
};
const chatAPI = {
  getMessages: groupId => {
    console.log('Calling get messages from API');
    return api.get(`messages/${groupId}`);
  },

  sendMessage: (username, text) => {
    console.log('Calling send message from API');
    let msg = {
      sender: username,
      message: text,
    };
    return api.post('http://localhost:8080/api/send', msg, {headers: headers});
  },
};

export default chatAPI;
// const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': 'JWT fefege...'
//   }
//   axios.post(Helper.getUserAPI(), data, {
//       headers: headers
//     })
//     .then((response) => {
//       dispatch({
//         type: FOUND_USER,
//         data: response.data[0]
//       })
//     })
//     .catch((error) => {
//       dispatch({
//         type: ERROR_FINDING_USER
//       })
//     })
