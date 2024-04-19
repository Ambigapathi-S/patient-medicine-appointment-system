import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  changeAppointmentStatus,
  getAppointmentsById,
} from "../../service/AppointmentService";
import { getLoggedInUser, logout } from "../../service/AuthService";

const AppointmentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const email = getLoggedInUser();
  const role = localStorage.getItem("role");
  const [appDetails, setAppDetails] = useState({
    id: "",
    doctorId: "",
    patientId: "",
    appointment_date: "",
    appointment_from_time: "",
    appointment_to_time: "",
    appointment_type: "",
    appointment_status: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let ids = Number(id);
          const response = await getAppointmentsById(ids);
          setAppDetails(response.data);
          setStatus(response.data.appointment_status);
        }
      } catch (error: any) {
        if (error?.response?.status === 403) {
          logout();
          navigate("/login");
        } else {
          toast(error);
        }
      }
    };
    fetchData();
  }, [id]);

  const changeStatus = async (e: any) => {
    e.preventDefault();
    let data: any = {
      id: appDetails.id,
      doctorId: appDetails.doctorId,
      patientId: appDetails.patientId,
      appointment_date: appDetails.appointment_date,
      appointment_from_time: appDetails.appointment_from_time,
      appointment_to_time: appDetails.appointment_to_time,
      appointment_type: appDetails.appointment_type,
      appointment_status: status,
    };
    let ids = Number(id);
    const response = await changeAppointmentStatus(ids, data);
    if (response.status === 200) {
      toast("Appointment Booked successfully..!");
      checkRedirect();
    }
  };

  function checkRedirect() {
    if (role === "ROLE_ADMIN") {
      navigate("/appointment/list");
    } else if (role == "ROLE_DOCTOR") {
      navigate(`/doctor/my-appointments?email=${email}`);
    } else {
      navigate(`/patient/my-appointments?email=${email}`);
    }
  }
  return (
    <Container>
      <ToastContainer />
      <div className="ViewDoctorDetails">
        <div className="head d-flex justify-content-between align-items-center">
          <h3>Appointment Details #{appDetails.id}</h3>
          <button onClick={() => checkRedirect()} className="btn btn-back">
            Back to List
          </button>
        </div>

        <Row>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Doctor Id : </label>
              <span>{appDetails.doctorId}</span>
            </p>
            <p>
              <label>Patient Id : </label>
              <span>{appDetails.patientId}</span>
            </p>
            <p>
              <label>Appointment Date : </label>
              <span>{appDetails.appointment_date}</span>
            </p>
            <p>
              <label>From Time : </label>
              <span>{appDetails.appointment_from_time}</span>
            </p>
            <p>
              <label>To Time : </label>
              <span>{appDetails.appointment_to_time}</span>
            </p>
            <p>
              <label>Appointment Type : </label>
              <span>{appDetails.appointment_type}</span>
            </p>
            <p>
              <label>Appointment Status : </label>
              <span>{appDetails.appointment_status}</span>
            </p>
          </Col>
          <Col xs={12} md={6} sm={6} lg={6}>
            <form>
              <div className="avail">
                <h4>Change Appointment Status</h4>
                <div className="form-group mt-3">
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="btn btn-info mt-3"
                  onClick={(e) => changeStatus(e)}
                >
                  Submit
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default AppointmentView;
