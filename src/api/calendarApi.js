import axios from 'axios';

const calendarApi = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export default calendarApi;
