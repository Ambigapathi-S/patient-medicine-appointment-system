import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../../service/AuthService";
import { Table } from "react-bootstrap";
import { getAppointmentsByDoctorId } from "../../service/AppointmentService";
import { getDoctorByEmail } from "../../service/DoctorPatientService";
import { CiViewList } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";

const DoctorAppointments = () => {
  const location = useLocation();
  const [appointmentDet, setAppointmentDet]: any = useState([]);
  let doctorId: number;
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParameters = searchParams.getAll("email");
    if (queryParameters.length > 0) {
      const emailAddr: string = queryParameters[0];
      fetchDoctorDetails(emailAddr);
    }
  }, [location]);

  const fetchDoctorDetails = async (email: string) => {
    try {
      if (email) {
        const response = await getDoctorByEmail(email);
        doctorId = response.data.id;
        fetchData(doctorId);
      }
    } catch (error: any) {
      if (error?.response?.status == 403) {
        logout();
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };

  const fetchData = async (doctorId: number) => {
    try {
      if (doctorId) {
        const response = await getAppointmentsByDoctorId(doctorId);
        setAppointmentDet(response.data);
      }
    } catch (error: any) {
      if (error?.response?.status === 403) {
        logout();
        navigate("/login");
      } else {
        let resMsg = error?.response?.data?.message;
        toast(resMsg);
      }
    }
  };
  function viewAppointment(id: number) {
    navigate(`/appointment/view/${id}`);
  }
  function addMedication(id: number) {
    navigate(`/medication/update/${id}`);
  }
  return (
    <Container>
      <ToastContainer />
      <div className="RegisterFormUI FormUI">
        <h3 className="title">My Appointments</h3>
        <div className="table-responsive">
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Appointment Date</th>
                <th>From Time</th>
                <th>To Time</th>
                <th>Patient Name</th>
                <th>Patient Phone</th>
                <th>Patient Address</th>
                <th>Type of Sick</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointmentDet.map((appointment: any, index: number) => (
                <tr key={appointment.id}>
                  <td>{index + 1}</td>
                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.appointment_from_time}</td>
                  <td>{appointment.appointment_to_time}</td>
                  <td>{appointment.patient.fullName}</td>
                  <td>{appointment.patient.phoneNumber}</td>
                  <td>{appointment.patient.address}</td>
                  <td>{appointment.patient.medicalHistory}</td>
                  <td>{appointment.appointment_status}</td>
                  <td className="action-icons text-center">
                    {appointment.appointment_status == "Completed" && (
                      <span className="edit tooltip">
                        <button onClick={() => addMedication(appointment.id)}>
                          <span className="icon">
                            <FaRegEdit />
                          </span>
                          <span className="tooltiptext">Add Medication</span>
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
              {appointmentDet.length == 0 && (
                <tr>
                  <td colSpan={7} className="text-center">
                    No Appointment's Found!
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

export default DoctorAppointments;
