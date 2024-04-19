import axios from "axios";
import { getToken } from "./AuthService";

const AUTH_REST_API_URL = "http://localhost:8080/api/medication";

axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const saveMedication = (registerObj: any) =>
    axios.post(AUTH_REST_API_URL, registerObj);

export const getAllMedication = () =>
    axios.get(AUTH_REST_API_URL);

export const getMedicationById = (id:number) =>
  axios.get(AUTH_REST_API_URL + "/" + id);

export const updateMedication = (id: number, data:{}) =>
    axios.put(AUTH_REST_API_URL + "/update/" + id, data);

export const deleteMedication = (id: number) =>
  axios.delete(AUTH_REST_API_URL + "/delete" + id);

export const findMedicationByAppointmentId = (id:number) =>
  axios.get(AUTH_REST_API_URL + "/appointment/" + id);