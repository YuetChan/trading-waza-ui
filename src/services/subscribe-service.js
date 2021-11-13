import axios from "axios";

// http://tradingwaza.com/api/tw-node
const subscribeToPhoneList = (phone) => {
    return axios.post('http://tradingwaza.com/api/tw-backend-smsl-mgm/phones', { 
      phone: phone
    });
}

const verifyPhone = (phone, code) => {
    return axios.get('http://tradingwaza.com/api/tw-backend-smsl-mgm/phones', { 
      params: { 
        phone: phone,  
        code: code
      }
    })
}

const SubscribeService = { subscribeToPhoneList, verifyPhone };
export default SubscribeService;