/* eslint-disable no-console */
import axios from 'axios';

export function getAccountsApi() {
  return axios.get('http://localhost:3001/users/login');
}

export async function getLoginTokensApi(payload) {
  const body = { code: payload.value, type:'people' }
  const data = await axios.post('http://localhost:3001/users/logintokens', body);
  return data;
}

export async function getNewTokenApi(payload) {
  const data = await axios.post('http://localhost:3001/users/newtoken', {
    uuid: payload.value.uuid,
    id: payload.value.id
  });
  console.log('data:', data)
  return data;
}

export async function getContactsApi(payload) {
  console.log('value', payload)
  let config = {
    headers: {
      'Authorization': 'Bearer ' + payload.value.token
    }
  }
  const data = await axios.post('http://localhost:3001/contacts', {
    uuid: payload.value.uuid,
    page: payload.value.page
  }, config );
  return data;
}

export async function getCommentsApi(payload) {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + payload.value.token
    }
  }
  const data = await axios.post('http://localhost:3001/comments', {
    id: payload.value.id,
  }, config );
  return data;
}

export async function logoutUserApi(payload) {
  const data = await axios.post('http://localhost:3001/users/logout', {
    "uuid": payload.value.uuid
  });
  return data;
}
