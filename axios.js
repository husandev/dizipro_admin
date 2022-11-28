import axios from "axios";
export const baseUrl='https://web.diziproedu.uz/'

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTczN2U0OGItZTlmZC00NDJkLWFkOTAtZmM0OTYxZTY4MzIyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTY2OTYyODc2MywiZXhwIjoxNjY5NzE1MTYzfQ.4FcrKWvITXpibx6ZNBbhgUehN5b2qpAyiwVaCVx8yWI` 
  }
});

export default instance;