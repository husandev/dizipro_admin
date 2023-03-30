import axios from "axios";
export const baseUrl='https://web.diziproedu.uz/'

let token = ''

if(typeof window !== "undefined"){
  token = localStorage.getItem('token')
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDQ3Njc3MTItMmQ4ZC00OWM1LWIzOTYtYWFhZGFhNTc2OTE2IiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTY4MDE3MTU3OCwiZXhwIjoxNjgwNzc2Mzc4fQ.jtuYL_ASd8JF_rGKYgbOvFY1RBCFiqpPhb5_fg0PMew` 
  }
});

export default instance;