import axios from "axios";

// http://tradingwaza.com/api/tw-node
const subscribeToPhoneList = (phone) => {
    return axios.post('http://localhost:3029/phones', { 
      phone: phone
    });
}

const verifyPhone = (phone, code) => {
    return axios.get('http://localhost:3029/phones', { 
      params: { 
        phone: phone,  
        code: code
      }
    })
}

const SubscribeService = { subscribeToPhoneList, verifyPhone };
export default SubscribeService;