/* eslint-disable no-console */
import axios from 'axios';

export function getAccountsApi() {
  return axios.get('http://localhost:3001/users/login');
}

export async function getLoginTokensApi(payload) {
  const body = { code: payload.value, type:'people' }
  const data = await axios.post('http://localhost:3001/users/logintokens', body);
  console.log('data retrived', data)
  return data;
}

export function getNewTokensApi(value) {
  const data = axios.post('http://localhost:3001/users/newtoken', {
    uuid: value.uuid,
    id: value.id
  });
  return data;
}

export function getContactsApi(value) {
  console.log('fetching data');
  let config = {
    headers: {
      'Authorization': 'Bearer ' + value.token
    }
  }
  const data = axios.post('http://localhost:3001/contacts', {
    uuid: value.uuid,
    page: value.page
  }, config );
  return data;
}

export async function logoutUserApi(value) {
  const data = await axios.post('http://localhost:3001/users/logout', {
    "uuid": value.uuid
  });
  return data;
}
