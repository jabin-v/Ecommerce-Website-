

export const authClient = (getState) =>
  axios.create({
    baseURL: "http://localhost:3500/api",
    responseType: 'json',
    timeout: 180000,
    headers: {
      Authorization: getState().account.token,
      'Content-Type': 'application/json',
    },
  });