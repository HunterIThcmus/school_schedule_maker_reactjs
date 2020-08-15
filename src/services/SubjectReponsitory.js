
import authHeader from "./AuthHeader";
import axios from "axios";

const API_URL = "https://scheduleapi.herokuapp.com/subjects";
const API_URLADD="https://scheduleapi.herokuapp.com/subjects/add/"

class SubjectReponsitory {
  getAllSubject() {
    return axios.get(API_URL, {
      headers: authHeader(),
    });
  }
  getSubjectByClass(id){
    return axios.get(API_URL+ id,{
      headers:authHeader(),
    });
  }
  postCreateSubject(idClass,name,sortName,nLesson){
    return axios.post(API_URL,
      {
        idClass,
        name,
        sortName,
        nLesson
      } ,
    {  headers:authHeader(),
    })
  }
}
export default new SubjectReponsitory();
