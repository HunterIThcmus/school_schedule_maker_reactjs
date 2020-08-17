
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
  getSubjectById(subject_id){
    return axios.get(API_URL+"/"+ subject_id,{
      headers:authHeader(),
    });
  }
  getRequiredSubject(){
    return axios.get(API_URL+"/requires",{
      headers:authHeader(),
    });
  }
  postCreateSubject(idClass,name,sortName,nLesson,require){
    return axios.post(API_URL,
      {
        idClass,
        name,
        sortName,
        nLesson,
        require
      } ,
    {  headers:authHeader(),
    })
  }

  PutUpdateSubject(idSubject,name,sortName,nLesson){
    return axios.put(API_URL+"/"+idSubject,{
      name,
      sortName,
      nLesson
    },
    {  headers:authHeader(),
    })
  }
}
export default new SubjectReponsitory();
