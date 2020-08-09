
import authHeader from "./AuthHeader";
import axios from "axios";

const API_URL = "https://scheduleapi.herokuapp.com/subjects";

class SubjectReponsitory {
  getAllSubject() {
    return axios.get(API_URL, {
      headers: authHeader(),
    });
  }
}
export default new SubjectReponsitory();
