import authHeader from "./AuthHeader";
import axios from "axios";

const API_URL = "https://scheduleapi.herokuapp.com/teachers";

class TeacherReponsitory {
  create(name, teacher_id, period_per_week, grade, subject, require) {
    return axios.post(
      API_URL,
      {
        name,
        teacher_id,
        period_per_week,
        grade,
        subject,
        require
      },
      {
        headers: authHeader(),
      }
    );
  }
  getAllTeacher(){
    return axios.get(
      API_URL,
      {
        headers: authHeader(),
      }
    )
  }
  getTeacherById(idTeacher){
    return axios.get(
      API_URL+`/${idTeacher}`,
      {
        headers: authHeader(),
      }
    )
  }
  getRequiredTeacher(){
    return axios.get(
      API_URL+'/requires',
      {
        headers: authHeader(),
      }
    )
  }
}
export default new TeacherReponsitory();
