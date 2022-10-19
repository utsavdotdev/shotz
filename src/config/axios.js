import axios from "axios";

const instance = axios.create({
  //   baseURL: `${process.env.REACT_APP_API_URL}?token=${process.env.REACT_APP_API_KEY}`,
  baseURL:
    "https://shot.screenshotapi.net/screenshot?token=5AD7KNA-HKM4GZ9-N8ZVY31-CV1GY5F",
});

export default instance;
