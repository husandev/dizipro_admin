import axios from "axios";
export const baseUrl='https://web.diziproedu.uz/'

let token = ''

if(typeof window !== "undefined"){
  token = localStorage.getItem('token')
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjUxZTZiYzMtMTFjMi00NmYxLWFmZjEtMzA0MTg2NmU5N2ZkIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTY3MTg2NTA1MywiZXhwIjoxNjcxOTUxNDUzfQ.zs4Zo9ku3JDSX8tlbsqmNztA3_Obb-CT33NdQafALy0` 
  }
});

export default instance;