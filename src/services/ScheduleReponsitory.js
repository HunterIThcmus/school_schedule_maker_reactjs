import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "https://scheduleapi.herokuapp.com/schedule";

class ScheduleReponsitory {
    getSchedule() {
        return axios.get(API_URL, {
            headers: authHeader(),
        });
    }
}
export default new ScheduleReponsitory();
