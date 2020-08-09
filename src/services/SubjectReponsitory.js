
import authHeader from "./AuthHeader";
import axios from "axios";

const API_URL = "https://scheduleapi.herokuapp.com/subject";

class SubjectReponsitory {
  getAllSubject() {
    return axios.get(API_URL, {
      headers: authHeader(),
    });
  }
}
export default new SubjectReponsitory();
