import axios from "axios";
export const baseUrl='https://web.diziproedu.uz/'

let token = ''
  
if(typeof window !== "undefined"){
  token = localStorage.getItem('token')
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer ${token}` 
  }
});

export default instance;