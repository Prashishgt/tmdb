import axios from "axios";

const JWT =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzQwNTc1ZDU4Y2Q3M2Y4YmMyMmFmNmZkYzZlYjA1YiIsIm5iZiI6MTcyMTIzMDEwOC44OTkxMjEsInN1YiI6IjYyOTg5ZTRjZWMwYzU4MDBhMzhhYmZhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2gAJ8nIZwnJF2bKsSNu9Iklu1P7_fVsm9pxle9TopcA";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: localStorage.getItem("access_token")
    //   ? "Bearer " + localStorage.getItem("access_token")
    //   : null,
    Authorization: "Bearer " + JWT,
  },
});

export default API;
