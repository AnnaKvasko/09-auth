// import axios from "axios";

// export const api = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
//   withCredentials: true,
//   headers: { "Content-Type": "application/json" },
// });
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api'

export const NextServer = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})