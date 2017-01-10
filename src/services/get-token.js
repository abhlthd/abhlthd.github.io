export default function getToken() {
  let cookie = document.cookie;
  let token = '';
  if (cookie.startsWith('token=')) {
    token = cookie.substring(6);
  }
  return token;
}
