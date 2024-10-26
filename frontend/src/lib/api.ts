import { HOST } from '@/utils/constants';
import axios from 'axios';

export const API = axios.create({
  baseURL: HOST,
})

