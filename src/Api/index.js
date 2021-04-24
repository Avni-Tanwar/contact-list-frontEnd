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

export async function getNewTokenApi(value) {
  const data = await axios.post('http://localhost:3001/users/newtoken', {
    uuid: value.uuid,
    id: value.id
  });
  console.log('data:', data)
  return data;
}

export async function getContactsApi(value) {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + value.token
    }
  }
  const data = await axios.post('http://localhost:3001/contacts', {
    uuid: value.uuid,
    page: value.page
  }, config );
  return data;
}

export async function getCommentsApi(value) {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + value.token
    }
  }
  const data = await axios.post('http://localhost:3001/comments', {
    id: value.id,
  }, config );
  return data;
}

export async function logoutUserApi(value) {
  const data = await axios.post('http://localhost:3001/users/logout', {
    "uuid": value.uuid
  });
  return data;
}
