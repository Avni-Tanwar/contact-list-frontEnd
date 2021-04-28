/* eslint-disable no-console */
import axios from 'axios';

export function getAccountsApi() {
  return axios.get('http://localhost:3001/users/login');
}

export async function getLoginTokensApi(payload) {
  const body = { code: payload.value, type: 'people' }
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
  console.log('GET_CONTACTS_API_PAYLOAD', payload)
  let config = {
    headers: {
      'Authorization': 'Bearer ' + payload.value.token
    }
  }
  if (payload.value.newPage) {
    const data = await axios.get(`http://localhost:3001/contacts/${payload.value.newPage}`, config);
    console.log('CONTACTS_DATA', data);
    return data;
  }
  const data = await axios.get('http://localhost:3001/contacts', config);
  console.log('CONTACTS_DATA', data);
  return data;
}

export async function getCommentsApi(payload) {
  console.log("GET_COMMENT_API_PAYLOAD: ", payload);
  let config = {
    headers: {
      'Authorization': 'Bearer ' + payload.value.token
    }
  }
  const url = `http://localhost:3001/comments/${payload.value.contactId}`;
  const data = await axios.get(url, config);
  console.log("GET COMMENT API DATA", data);
  return data;
}

export async function createCommentsApi(payload) {
  console.log("CREATE_COMMENT_API_PAYLOAD: ", payload);
  let config = {
    headers: {
      'Authorization': 'Bearer ' + payload.value.token
    }
  }
  const url = `http://localhost:3001/comments/${payload.value.contactId}`;
  const data = await axios.post(url, { comment: payload.value.comment }, config);
  console.log('Create_COMMENT_DATA:', data)
  return data;
}

export async function deleteCommentsApi(payload) {
  console.log("DELETE_COMMENT_API_PAYLOAD: ", payload);
  let config = {
    headers: {
      'Authorization': 'Bearer ' + payload.value.token
    }
  }
  const url = `http://localhost:3001/comments/${payload.value.commentId}`;
  const data = await axios.delete(url, config);
  console.log('Delete comment API:', data)
  return data;
}

export async function logoutUserApi(payload) {
  const data = await axios.get('http://localhost:3001/users/logout');
  return data;
}
