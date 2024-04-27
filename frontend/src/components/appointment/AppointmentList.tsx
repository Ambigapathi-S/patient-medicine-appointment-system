import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  cancelAppointment,
  getAllAppointments,
} from "../../service/AppointmentService";
import { Container } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { isAdminUser, logout } from "../../service/AuthService";

const AppointmentList = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const navigate = useNavigate();
  const isAdmin = isAdminUser();

  useEffect(() => {
    callAppointmentsListApi();
  }, []);

  const callAppointmentsListApi = async () => {
    try {
      const response = await getAllAppointments();
      setAppointmentList(response.data);
    } catch (error: any) {
      if (error?.response?.status == 403) {
        logout();
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };

  const removeAppointment = async (id: number) => {
    try {
      const response = await cancelAppointment(id);
      callAppointmentsListApi();
    } catch (error: any) {
      if (error?.response?.status == 403) {
        logout();
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };

  function viewAppointment(id: number) {
    navigate(`/appointment/view/${id}`);
  }

  return (
    <Container>
      <div className="doctorList">
        <h3 className="title-h3"> Appointment's List</h3>
        <div className="table-responsive">
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Doctor Name - ID</th>
                <th>Patient ID</th>
                <th>Appointment date</th>
                <th>From Time</th>
                <th>To Time</th>
                <th>Appointment Type</th>
                <th>Appointment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointmentList.map((appointment: any, index) => (
                <tr key={appointment.id}>
                  <td>{index + 1}</td>
                  <td>
                    {appointment.doctor.fullName} - ({appointment.doctor.id})
                  </td>
                  <td>
                    {appointment.patient.fullName} - ({appointment.patient.id})
                  </td>
                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.appointment_from_time}</td>
                  <td>{appointment.appointment_to_time}</td>
                  <td>{appointment.appointment_type}</td>
                  <td>{appointment.appointment_status}</td>
                  <td className="action-icons text-center">
                    {isAdmin && (
                      <span className="delete tooltip">
                        <button
                          onClick={() => removeAppointment(appointment.id)}
                        >
                          <span className="icon">
                            <MdDeleteOutline />
                          </span>
                          <span className="tooltiptext">Delete</span>
                        </button>
                      </span>
                    )}
                    <span className="view tooltip">
                      <button onClick={() => viewAppointment(appointment.id)}>
                        <span className="icon">
                          <CiViewList />
                        </span>
                        <span className="tooltiptext">View</span>
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
              {!appointmentList.length && (
                <tr>
                  <td colSpan={9} className="text-center">
                    No Appointment's Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default AppointmentList;
