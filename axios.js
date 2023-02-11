import axios from "axios";
export const baseUrl='https://web.diziproedu.uz/'

let token = ''

if(typeof window !== "undefined"){
  token = localStorage.getItem('token')
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGQyOWI0YTktMTJjNy00ZWE4LTg2NjMtOTVmNWNhZWE3MzViIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTY3NjExMjYyNywiZXhwIjoxNjc2NzE3NDI3fQ.41XIx_WIUbLs1b1vwiIYZsSVE-g4FLGiHkaUTZ5oTQU` 
  }
});

export default instance;