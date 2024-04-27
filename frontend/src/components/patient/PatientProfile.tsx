import { useLocation, useParams } from "react-router-dom";
import {
  editpatientDetail,
  getPatientByEmail,
  getPatientById,
} from "../../service/DoctorPatientService";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { isAdminUser, logout } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const PatientRegisterSchemaEdit = yup
  .object({
    fullName: yup.string().required("Full Name is Required!"),
    dob: yup
      .string()
      .required("Date of Birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    gender: yup
      .mixed()
      .oneOf(
        ["Male", "Female", "Other"],
        "Gender must be Male or Female or Other"
      ),
    address: yup.string().required("Address is Required!"),
    phoneNumber: yup
      .string()
      .required("Phone number is Required!")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone number is too short")
      .max(10, "Phone number is too long"),
    email: yup.string().email().required("Email is Required!"),
    bloodGroup: yup.string(),
    medicalHistory: yup.string(),
  })
  .required();

const PatientProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [patientProfile, setPatientProfile] = useState(null);
  const [patientId, setPatientId] = useState("");
  const isAdmin = isAdminUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(PatientRegisterSchemaEdit),
    defaultValues: patientProfile || {},
  });

  useEffect(() => {
    if (location) {
      const searchParams = new URLSearchParams(location.search);
      const queryParameters = searchParams.getAll("email");
      if (queryParameters.length > 0) {
        const emailAddr: string = queryParameters[0];
        fetchData(emailAddr);
      }
    }

    if (id) {
      fetchDataById(id);
    }
  }, [location, id]);

  const fetchData = async (emailAddr: string) => {
    try {
      if (emailAddr) {
        const response = await getPatientByEmail(emailAddr);
        setPatientProfile(response.data);
        setValues(response.data);
        setPatientId(response.data.id);
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

  const fetchDataById = async (id: string) => {
    try {
      if (id) {
        const response = await getPatientById(id);
        setPatientProfile(response.data);
        setValues(response.data);
        setPatientId(response.data.id);
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

  function setValues(data: any) {
    setValue("fullName", data.fullName);
    setValue("dob", data.dob);
    setValue("gender", data.gender);
    setValue("address", data.address);
    setValue("phoneNumber", data.phoneNumber);
    setValue("email", data.email);
    setValue("bloodGroup", data.bloodGroup);
    setValue("medicalHistory", data.medicalHistory);
  }

  const onSubmit = async (register: {}) => {
    try {
      let id = Number(patientId);
      const response = await editpatientDetail(id, register);
      let resMsg = response.data.message;
      if (response.status === 200) {
        toast("Details Updated Successfully!", { type: "success" });
        if (isAdmin) {
          navigate("/patient/list");
        }
      } else if (response.status === 403) {
        logout();
        navigate("/login");
      } else {
        toast(resMsg);
      }
    } catch (error: any) {
      let resMsg = error.response.data.message;
      toast(resMsg);
      if (error?.response?.status == 403) {
        logout();
        navigate("/login");
      }
    }
  };

  return (
    <Container>
      <ToastContainer />
      <div className="FormUI ViewDoctorDetails">
        <div className="head d-flex justify-content-between align-items-center">
          <h3> Update Patient Details</h3>
          <a href="/patient/list" className="btn btn-back">
            Back to List
          </a>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <input
                  {...register("fullName")}
                  placeholder="Full Name"
                  className={`form-control ${errors.fullName ? "error" : ""} `}
                />
                <p className="error">{errors.fullName?.message}</p>
              </div>
            </Col>
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <input
                  type="date"
                  {...register("dob")}
                  placeholder="Date Of Birth"
                  className={`form-control ${errors.dob ? "error" : ""} `}
                />
                <p className="error">{errors.dob?.message}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <select
                  {...register("gender")}
                  className={`form-control ${errors.gender ? "error" : ""} `}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                <p className="error">{errors.gender?.message}</p>
              </div>
            </Col>
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <input
                  {...register("address")}
                  placeholder="Address"
                  className={`form-control ${errors.address ? "error" : ""} `}
                />
                <p className="error">{errors.address?.message}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <input
                  {...register("phoneNumber")}
                  placeholder="Phone Number"
                  className={`form-control ${
                    errors.phoneNumber ? "error" : ""
                  } `}
                />
                <p className="error">{errors.phoneNumber?.message}</p>
              </div>
            </Col>
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <input
                  {...register("email")}
                  placeholder="Email Address"
                  className={`form-control ${errors.email ? "error" : ""} `}
                  readOnly
                />
                <p className="error">{errors.email?.message}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <input
                  {...register("bloodGroup")}
                  placeholder="Blood Type"
                  className={`form-control ${
                    errors.bloodGroup ? "error" : ""
                  } `}
                />
                <p className="error">{errors.bloodGroup?.message}</p>
              </div>
            </Col>
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <input
                  {...register("medicalHistory")}
                  placeholder="Medical History"
                  className={`form-control ${
                    errors.medicalHistory ? "error" : ""
                  } `}
                />
                <p className="error">{errors.medicalHistory?.message}</p>
              </div>
            </Col>
          </Row>
          <div className="text-center">
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default PatientProfile;
