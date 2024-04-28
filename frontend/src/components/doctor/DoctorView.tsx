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
import { isAdminUser, isPatientUser, logout } from "../../service/AuthService";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AppointmentTimeDropdown from "./AppointmentTimeDropdown";

const appointmentSchema = yup
  .object({
    date: yup.string().required("Date is required"),
  })
  .required();

const DoctorView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
  });

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
    consultingHrs: 0,
    availabilityFromTime: "",
    availabilityToTime: "",
  });

  const emailId = localStorage.getItem("authenticatedUser");
  const [patientId, setPatientId] = useState("");
  const isPatient = isPatientUser();

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

  const [time, setTime] = useState("");

  const updateChange = (newValue: string) => {
    setTime(newValue);
  };

  const onSubmit = async (data: any) => {
    let fromToTime: any = time.split("-");

    let bookAppointmentDto: any = {
      doctor: { id: doctorDetails.id },
      patient: { id: patientId },
      appointment_date: data.date,
      appointment_from_time: fromToTime[0],
      appointment_to_time: fromToTime[1],
      appointment_type: "Direct",
      appointment_status: "Pending",
    };
    try {
      const response = await createAppointment(bookAppointmentDto);
      if (response.status === 201) {
        toast("Appointment Booked successfully..!", { type: "success" });
        navigate(`/patient/my-appointments?email=${emailId}`);
      }
    } catch (error: any) {
      if (error?.response?.status === 403) {
        logout();
        navigate("/login");
      } else if (error?.response?.data) {
        toast(error?.response?.data?.message, { type: "error" });
      } else {
        toast(error?.message, { type: "error" });
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
            {isPatient && (
              <div className="avail">
                <h4>Check Availability & Book Appointment</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group mt-3">
                    <input
                      type="date"
                      {...register("date")}
                      placeholder="Appointment Date"
                      min={new Date().toISOString().split('T')[0]}
                      className={`form-control ${errors.date ? "error" : ""} `}
                    />
                    <p className="error">{errors.date?.message}</p>
                  </div>
                  <div className="form-group mt-3 mb-3">
                    <Row>
                      <Col xs={12} md={12} sm={12} lg={12}>
                        <AppointmentTimeDropdown
                          fromTime={doctorDetails?.availabilityFromTime}
                          toTime={doctorDetails?.availabilityToTime}
                          duration={doctorDetails?.consultingHrs}
                          updateChange={updateChange}
                        />
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col xs={12} md={6} sm={6} lg={6}>
                        <input
                          type="time"
                          {...register("fromTime")}
                          placeholder="Appointment From Time"
                          className={`form-control ${
                            errors.fromTime ? "error" : ""
                          } `}
                        />
                        <p className="error">{errors.fromTime?.message}</p>
                      </Col>
                      <Col xs={12} md={6} sm={6} lg={6}>
                        <input
                          type="time"
                          {...register("toTime")}
                          placeholder="Appointment To Time"
                          className={`form-control ${
                            errors.fromTime ? "error" : ""
                          } `}
                        />
                        <p className="error">{errors.toTime?.message}</p>
                      </Col>
                    </Row> */}
                  </div>

                  <input
                    type="submit"
                    className="btn btn-info"
                    value="Book Now"
                  />
                </form>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default DoctorView;
