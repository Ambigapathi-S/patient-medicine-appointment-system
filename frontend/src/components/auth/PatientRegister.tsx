import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { patientRegister, logout } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const PatientRegisterSchema = yup
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
    password: yup
      .string()
      .required("Password is Required!")
      .min(4, "Enter atleast 4 characters")
      .max(15, "Maximum length is 15 Characters"),
  })
  .required();

const PatientRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PatientRegisterSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (register: {}) => {
    try {
      const response = await patientRegister(register);
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
      let resMsg = error.response.data.message;
      toast(resMsg);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <div className="FormUI">
        <h3 className="title">Patient Registration</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              {...register("fullName")}
              placeholder="Full Name"
              className={`form-control ${errors.fullName ? "error" : ""} `}
            />
            <p className="error">{errors.fullName?.message}</p>
          </div>
          <div className="form-group">
            <input
              type="date"
              {...register("dob")}
              placeholder="Date Of Birth"
              className={`form-control ${errors.dob ? "error" : ""} `}
            />
            <p className="error">{errors.dob?.message}</p>
          </div>
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
          <div className="form-group">
            <input
              {...register("address")}
              placeholder="Address"
              className={`form-control ${errors.address ? "error" : ""} `}
            />
            <p className="error">{errors.address?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("phoneNumber")}
              placeholder="Phone Number"
              className={`form-control ${errors.phoneNumber ? "error" : ""} `}
            />
            <p className="error">{errors.phoneNumber?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("email")}
              placeholder="Email Address"
              className={`form-control ${errors.email ? "error" : ""} `}
            />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("bloodGroup")}
              placeholder="Blood Type"
              className={`form-control ${errors.bloodGroup ? "error" : ""} `}
            />
            <p className="error">{errors.bloodGroup?.message}</p>
          </div>
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
          <div className="form-group">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className={`form-control ${errors.password ? "error" : ""} `}
            />
            <p className="error">{errors.password?.message}</p>
          </div>
          <div className="text-center">
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default PatientRegister;
