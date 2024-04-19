import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDoctorById,
  getPatientByEmail,
} from "../../service/DoctorPatientService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createAppointment } from "../../service/AppointmentService";
import { logout } from "../../service/AuthService";
import { ToastContainer, toast } from "react-toastify";

const DoctorView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState({
    id: "",
    fullName: "",
    dob: "",
    gender: "",
    address: "",
    phoneNumber: "",
    email: "",
    designation: "",
    specialization: "",
    yearsOfExp: "",
    consultingFees: "",
    consultingHrs: "",
    availabilityFromTime: "",
    availabilityToTime: "",
  });
  const [date, setDate] = useState("");
  const [fromTime, setfFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const emailId = localStorage.getItem("authenticatedUser");
  const [patientId, setPatientId] = useState("");
  console.log(emailId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getDoctorById(id);
          setDoctorDetails(response.data);
          patientDet();
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
  const patientDet = async () => {
    try {
      if (emailId) {
        const response = await getPatientByEmail(emailId);
        setPatientId(response.data.id);
      }
    } catch (error: any) {
      if (error?.response?.status === 403) {
        logout();
        navigate("/login");
      }
    }
  };

  const checkBookingAvailability = async (e: any) => {
    e.preventDefault();
    let bookAppointmentDto: any = {
      doctorId: doctorDetails.id,
      patientId: patientId,
      appointment_date: date,
      appointment_from_time: fromTime,
      appointment_to_time: toTime,
      appointment_type: "Direct",
      appointment_status: "Pending",
    };
    try {
      const response = await createAppointment(bookAppointmentDto);
      if (response.status === 201) {
        toast("Appointment Booked successfully..!");
        setDate("");
        setfFromTime("");
        setToTime("");
        navigate("/my-appointments");
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        logout();
        navigate("/login");
      }
    }
  };
  return (
    <Container>
      <ToastContainer />
      <div className="ViewDoctorDetails">
        <div className="head d-flex justify-content-between align-items-center">
          <h3>Doctor Details #{doctorDetails.id}</h3>
          <a href="/doctor/list" className="btn btn-back">
            Back to List
          </a>
        </div>

        <Row>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Full Name : </label>
              <span>{doctorDetails.fullName}</span>
            </p>
            <p>
              <label>Date of Birth : </label>
              <span>{doctorDetails.dob}</span>
            </p>
            <p>
              <label>Gender : </label>
              <span>{doctorDetails.gender}</span>
            </p>
            <p>
              <label>Address : </label>
              <span>{doctorDetails.address}</span>
            </p>
            <p>
              <label>Phone Number : </label>
              <span>{doctorDetails.phoneNumber}</span>
            </p>
            <p>
              <label>Years of Experience : </label>
              <span>{doctorDetails.yearsOfExp} Years</span>
            </p>
            <p>
              <label>Desgination : </label>
              <span>{doctorDetails.designation}</span>
            </p>
            <p>
              <label>Specialization : </label>
              <span>{doctorDetails.specialization}</span>
            </p>
          </Col>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Email Address : </label>
              <span>{doctorDetails.email}</span>
            </p>
            <p>
              <label>Consulting Hours : </label>
              <span>{doctorDetails.consultingHrs} mins</span>
            </p>
            <p>
              <label>Consulting Fees : </label>
              <span>Rs. {doctorDetails.consultingFees}</span>
            </p>
            <p>
              <label>Available Time : </label>
              <span>
                Rs. {doctorDetails.availabilityFromTime} -{" "}
                {doctorDetails.availabilityToTime}
              </span>
            </p>
            <div className="avail">
              <h4>Check Availability & Book Appointment</h4>
              <div className="form-group mt-3">
                <input
                  type="date"
                  placeholder="Appointment Date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group mt-3 mb-3">
                <Row>
                  <Col xs={12} md={6} sm={6} lg={6}>
                    <input
                      type="time"
                      placeholder="From Time"
                      className="form-control"
                      value={fromTime}
                      onChange={(e) => setfFromTime(e.target.value)}
                    />
                  </Col>
                  <Col xs={12} md={6} sm={6} lg={6}>
                    <input
                      type="time"
                      placeholder="To Time"
                      className="form-control"
                      value={toTime}
                      onChange={(e) => setToTime(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              <button
                type="button"
                className="btn btn-info"
                onClick={(e) => checkBookingAvailability(e)}
              >
                Book Now
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default DoctorView;
