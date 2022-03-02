import axios from 'axios';
import { errorHelper } from '../helpers';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
  baseURL: backendURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

async function getSurveys() {
  try {
    const surveys = await instance.get('/survey/get-surveys', {
    });
    return surveys.data;
  } catch (error) {
    throw new errorHelper.CodeError('We encountered an error, please try again later.', error.status);
  }
}

export default {
  getSurveys,
};
