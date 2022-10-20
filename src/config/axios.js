import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}?token=${process.env.REACT_APP_API_KEY}`,
});

export default instance;
