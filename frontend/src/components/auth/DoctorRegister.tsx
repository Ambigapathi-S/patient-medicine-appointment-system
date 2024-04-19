import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { doctorRegister, logout } from "../../service/AuthService";
import {  useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const doctorRegisterSchema = yup
  .object({
    fullName: yup.string().required("Full Name is Required!"),
    dob: yup
      .string()
      .required("Date of Birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    gender: yup.string().required("Gender is Required!"),
    address: yup.string().required("Address is Required!"),
    phoneNumber: yup
      .string()
      .required("Phone number is Required!")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Phone number is too short")
      .max(10, "Phone number is too long"),
    email: yup.string().email().required("Email is Required!"),
    designation: yup.string().required("Doctor designation is Required!"),
    specialization: yup.string().required("Specialization is required!"),
    yearsOfExp: yup.string().required("Experience is required!"),
    password: yup
      .string()
      .required("Password is Required!")
      .min(4, "Enter atleast 4 characters")
      .max(15, "Maximum length is 15 Characters"),
    consultingFees: yup.number().required("Consulting fees is Required!"),
    consultingHrs: yup.number().required("Consulting hours is Required!"),
    availabilityFromTime: yup.string().required("From time is required!"),
    availabilityToTime: yup.string().required("From time is required!"),
  })
  .required();

const DoctorRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(doctorRegisterSchema),
  });

  const navigate = useNavigate();
  const onSubmit = async (register: {}) => {
    try {
      const modifiedData = { ...register, status: "pending" };
      const response = await doctorRegister(modifiedData);
      let resMsg = response.data.message;
      if (response.status === 200) {
        toast(response.data, { type: "success" });
        reset();
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (response.status === 403) {
        logout();
        navigate("/login");
      } else {
        toast(resMsg);
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        logout();
        navigate("/login");
      } else {
        let resMsg = error.response.data.message;
        toast(resMsg);
      }
    }
  };

  return (
    <Container>
      <ToastContainer />
      <div className="RegisterFormUI FormUI">
        <h3 className="title">Doctor Registration & Availability Form</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
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
          <Row className="mb-3">
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
          <Row className="mb-3">
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
                />
                <p className="error">{errors.email?.message}</p>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <input
                  {...register("designation")}
                  placeholder="Designation"
                  className={`form-control ${
                    errors.designation ? "error" : ""
                  } `}
                />
                <p className="error">{errors.designation?.message}</p>
              </div>
            </Col>
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <input
                  {...register("specialization")}
                  placeholder="Specialization"
                  className={`form-control ${
                    errors.specialization ? "error" : ""
                  } `}
                />
                <p className="error">{errors.specialization?.message}</p>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <input
                  {...register("yearsOfExp")}
                  placeholder="Years of Experience"
                  className={`form-control ${
                    errors.yearsOfExp ? "error" : ""
                  } `}
                />
                <p className="error">{errors.yearsOfExp?.message}</p>
              </div>
            </Col>
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className={`form-control ${errors.password ? "error" : ""} `}
                />
                <p className="error">{errors.password?.message}</p>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <input
                  type="text"
                  {...register("consultingFees")}
                  placeholder="Consulting Fees"
                  className={`form-control ${
                    errors.consultingFees ? "error" : ""
                  } `}
                />
                <p className="error">{errors.consultingFees?.message}</p>
              </div>
            </Col>
            <Col md={6} sm={6} lg={6} xs={12}>
              <div className="form-group">
                <select
                  {...register("consultingHrs")}
                  className={`form-control ${
                    errors.consultingHrs ? "error" : ""
                  } `}
                >
                  <option value={30}>30 mins</option>
                  <option value={60}>1 Hour</option>
                </select>
                <p className="error">{errors.consultingHrs?.message}</p>
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="availTimeSlot">Availability</h3>
          </div>
          <Row className="mb-3">
            <Col md={3} sm={3} lg={3} xs={12}>
              <div className="form-group">
                <input
                  type="time"
                  {...register("availabilityFromTime")}
                  placeholder="From Time"
                  className={`form-control ${errors.availabilityFromTime ? "error" : ""} `}
                />
                <p className="error">{errors.availabilityFromTime?.message}</p>
              </div>
            </Col>
            <Col md={3} sm={3} lg={3} xs={12}>
              <div className="form-group">
                <input
                  type="time"
                  {...register("availabilityToTime")}
                  placeholder="To Time"
                  className={`form-control ${errors.availabilityToTime ? "error" : ""} `}
                />
                <p className="error">{errors.availabilityToTime?.message}</p>
              </div>
            </Col>
          </Row>

          <div className="text-center">
            <input type="submit" className="btn btn-primary" />
            <button type="reset" className="btn btn-reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default DoctorRegister;
