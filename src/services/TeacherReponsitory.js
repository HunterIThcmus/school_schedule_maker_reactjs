import authHeader from "./AuthHeader";
import axios from "axios";

const API_URL = "https://scheduleapi.herokuapp.com/teacher";

class TeacherReponsitory {
  create(name, teacher_id, period_per_week, grade, subject, required) {
    return axios.post(
      API_URL,
      {
        name,
        teacher_id,
        period_per_week,
        grade,
        subject,
      },
      {
        headers: authHeader(),
      }
    );
  }
}
export default new TeacherReponsitory();
