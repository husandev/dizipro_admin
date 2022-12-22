import axios from "axios";
export const baseUrl='https://web.diziproedu.uz/'

let token = ''

if(typeof window !== "undefined"){
  token = localStorage.getItem('token')
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjUxZTZiYzMtMTFjMi00NmYxLWFmZjEtMzA0MTg2NmU5N2ZkIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTY3MTUzMTk3OSwiZXhwIjoxNjcxNjE4Mzc5fQ.eYvuyXAqHufsePlEWFlF9bIFDVZItUMSsrRg97BfeSQ` 
  }
});

export default instance;