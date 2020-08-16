export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.token) {
      return { 'auth-token': user.token,
      "Content-Type": "application/json" };       // for Node.js Express back-end
    } else {
      return {};
    }
  }
  