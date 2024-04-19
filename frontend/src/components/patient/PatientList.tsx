import React, { useEffect, useState } from "react";
import { deletePatient, getPatientList } from "../../service/DoctorPatientService";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { isAdminUser } from "../../service/AuthService";

const PatientList = () => {
  const [patientList, setPatientList] = useState([]);
  const navigate = useNavigate();
  const isAdmin = isAdminUser();
  useEffect(() => {
    callPatientListApi();
  }, []);

  const callPatientListApi = async () => {
    try {
      const response = await getPatientList();
      setPatientList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  function updatePatient(id: number) {
    navigate(`/patient/update/${id}`);
  }

  function viewPatient(id: number) {
    navigate(`/patient/view/${id}`);
  }

  const removePatient = async (id: number) => {
    try {
      const response = await deletePatient(id);
      callPatientListApi();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="doctorList">
        <h3 className="title-h3">Patient's List</h3>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patientList.map((patient: any, index) => (
              <tr key={patient.id}>
                <td>{index + 1}</td>
                <td>{patient.fullName}</td>
                <td>{patient.dob}</td>
                <td>{patient.address}</td>
                <td>{patient.phoneNumber}</td>
                <td>{patient.email}</td>
                <td className="action-icons text-center">
                  {isAdmin && (
                    <span className="edit tooltip">
                      <button onClick={() => updatePatient(patient.id)}>
                        <span className="icon">
                          <FaRegEdit />
                        </span>
                        <span className="tooltiptext">Update</span>
                      </button>
                    </span>
                  )}
                  {isAdmin && (
                    <span className="delete tooltip">
                      <button onClick={() => removePatient(patient.id)}>
                        <span className="icon">
                          <MdDeleteOutline />
                        </span>
                        <span className="tooltiptext">Delete</span>
                      </button>
                    </span>
                  )}
                  <span className="view tooltip">
                    <button onClick={() => viewPatient(patient.id)}>
                      <span className="icon">
                        <CiViewList />
                      </span>
                      <span className="tooltiptext">View</span>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
            {!patientList.length && (
              <tr>
                <td colSpan={7} className="text-center">
                  No Patient's Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default PatientList;
