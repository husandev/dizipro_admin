import axios from "axios";
export const baseUrl='https://web.diziproedu.uz/'

let token = ''

if(typeof window !== "undefined"){
  token = localStorage.getItem('token')
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDQ3Njc3MTItMmQ4ZC00OWM1LWIzOTYtYWFhZGFhNTc2OTE2IiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTY4MDc4NzI2NywiZXhwIjoxNjgxMzkyMDY3fQ.8eZcCcbd7GGz8Y1Hck_b1u2DEOBe5eB-9H8lYKJ_uBQ` 
  }
});

export default instance;