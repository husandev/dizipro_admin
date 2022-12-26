import axios from "axios";
export const baseUrl='https://web.diziproedu.uz/'

let token = ''

if(typeof window !== "undefined"){
  token = localStorage.getItem('token')
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTA3Y2E2NzgtYzMxNS00MGY3LTg1MmItNjAwNzRkNTQ1ODhjIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTY3MjA3NzExNywiZXhwIjoxNjcyMTYzNTE3fQ.ygKMYyiWEHgHwee_H90YJMeRWyys3C8ZqTTsPU8ih4M` 
  }
});

export default instance;