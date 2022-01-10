import API from './api.config';
import request from '@/request';


export const gettestData = async (params) => {
  return request(API.testurl, {
    method: 'GET',
    params
  });

};

