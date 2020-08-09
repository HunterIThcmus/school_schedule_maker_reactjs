import axios from "axios";

const API_URL = "https://scheduleapi.herokuapp.com/users/";

class Auth {

  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout(){
      localStorage.removeItem("user");
  }

  register(name, email, password, repeat_password) {
    return axios.post(API_URL + "register", {
      name,
      email,
      password,
      repeat_password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
export default new Auth();

