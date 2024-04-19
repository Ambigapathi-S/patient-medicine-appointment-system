import axios from "axios";
import { getToken } from "./AuthService";

const AUTH_REST_API_URL = "http://localhost:8080/api/appointment";

axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const createAppointment = (registerObj: any) =>
  axios.post(AUTH_REST_API_URL, registerObj);

export const cancelAppointment = (id: number) =>
  axios.delete(AUTH_REST_API_URL + "/" + id);

export const changeAppointmentStatus = (id: number, data:any) =>
  axios.put(AUTH_REST_API_URL + "/" + id, data);

export const getAllAppointments = () =>
  axios.get(AUTH_REST_API_URL);

export const getAppointmentsById = (id:number) =>
  axios.get(AUTH_REST_API_URL + "/" + id);

export const getAppointmentsByDoctorId = (id: number) =>
  axios.get(AUTH_REST_API_URL + "/doctor/" + id);

export const getAppointmentsByPatientId = (id: number) =>
  axios.get(AUTH_REST_API_URL + "/patient/" + id);


