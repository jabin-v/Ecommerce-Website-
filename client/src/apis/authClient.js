

export const authClient = (getState) =>
  axios.create({
    baseURL:process.env.REACT_APP_BASEURL,
    responseType: 'json',
    timeout: 180000,
    headers: {
      Authorization: getState().account.token,
      'Content-Type': 'application/json',
    },
  });