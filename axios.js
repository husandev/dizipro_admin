import axios from "axios";
export const baseUrl='https://web.diziproedu.uz/'

let token = ''

if(typeof window !== "undefined"){
  token = localStorage.getItem('token')
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2RlYjA5ODgtNTY2MS00YmNjLThlMzItMWRlMzUxYmRjOGFkIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTY3MzUyNTE0NiwiZXhwIjoxNjc0MTI5OTQ2fQ.p-zqYquCUxPRUsaFVTGveVQfIr5PO_mD56QMOEYnX5M` 
  }
});

export default instance;