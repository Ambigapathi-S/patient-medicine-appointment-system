import React, { useEffect, useState } from "react";
import { deleteDoctor, getDoctorList } from "../../service/DoctorPatientService";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { isAdminUser } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const [doctorList, setDoctorList] = useState([]);
  const navigate = useNavigate();
  const isAdmin = isAdminUser();
  useEffect(() => {
    callDoctorListApi();
  }, []);

  const callDoctorListApi = async () => {
    try {
      const response = await getDoctorList();
      setDoctorList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  function updateDoctor(id: number) {
    navigate(`/doctor/update/${id}`);
  }

  function viewDoctor(id: number) {
    navigate(`/doctor/view/${id}`);
  }

  const removeDoctor = async (id: number) => {
    try {
      const response = await deleteDoctor(id);
      callDoctorListApi();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <div className="doctorList">
        <h3 className="title-h3">Doctor's List</h3>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Designation</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctorList.map((doctor: any, index) => (
              <tr key={doctor.id}>
                <td>{index + 1}</td>
                <td>{doctor.fullName}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.designation}</td>
                <td>{doctor.phoneNumber}</td>
                <td>{doctor.email}</td>
                <td className="action-icons text-center">
                  {isAdmin && (
                    <span className="edit tooltip">
                      <button onClick={() => updateDoctor(doctor.id)}>
                        <span className="icon">
                          <FaRegEdit />
                        </span>
                        <span className="tooltiptext">Update</span>
                      </button>
                    </span>
                  )}
                  {isAdmin && (
                    <span className="delete tooltip">
                      <button onClick={() => removeDoctor(doctor.id)}>
                        <span className="icon">
                          <MdDeleteOutline />
                        </span>
                        <span className="tooltiptext">Delete</span>
                      </button>
                    </span>
                  )}
                  <span className="view tooltip">
                    <button onClick={() => viewDoctor(doctor.id)}>
                      <span className="icon">
                        <CiViewList />
                      </span>
                      <span className="tooltiptext">View</span>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
            {!doctorList.length && (
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

export default DoctorList;
