import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-cca4b.firebaseio.com/',
});
export default instance;
