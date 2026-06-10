const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || '/api/auth/signin';

export async function signIn(username, password) {
  const response = await fetch(AUTH_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: username, password }),
  });
  const data = await response.json();
  const token = data.token || data.data?.token;
  const user = data.user || data.data?.user;
  const isSuccess = data.status === 'success' || data.success === true;

  if (isSuccess && token) {
    return {
      status: 'success',
      token,
      user: user || { name: username.split('@')[0], email: username },
    };
  }
  return {
    status: 'error',
    message: data.message || 'Invalid username or password',
  };
}
