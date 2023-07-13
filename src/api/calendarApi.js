import axios from 'axios';

import { getEnv } from '../helpers';

const {API_URL} = getEnv();

export default calendarApi = axios.create({
  baseURL: API_URL,
});
