import React, { useState } from "react";
import { loginUser } from "../../api/auth";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backarrow from "../../assets/images/arrow_back.png";
import Ellipse1 from "../../assets/images/Ellipse 1.png";
import Ellipse2 from "../../assets/images/Ellipse 2.png";
import group from "../../assets/images/Group 2.png";
export default function Login() {
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const notify = () => {
    toast.error("Incorrect credencial", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (formData.email.trim().length === 0) {
      newErrors.email = "Email can't be empty";
    }
    if (formData.password.trim().length === 0) {
      newErrors.password = "Password can't be empty";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const result = await loginUser(formData);
      if (result) {
        localStorage.setItem("email", formData.email);
        navigate("/dashboard");
      } else {
        notify();
      }
    } catch (error) {
      setErrors({ ...errors, form: "Login failed, please try again." });
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.backarrow}
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={backarrow} alt="Back" />
      </div>

      <div className={styles.ellipse1}>
        <img src={Ellipse1} alt="Ellipse 1" />
      </div>

      <div className={styles.ellipse2}>
        <img src={Ellipse2} alt="Ellipse 2" />
      </div>

      <div className={styles.group}>
        <img src={group} alt="Group" />
      </div>
      <div className={styles.main}>
        <div className={styles.user}>
          <div
            style={{ marginBottom: "0.5rem" }}
            className={errors.email ? styles.labelError : ""}
          >
            Email
          </div>
          <input
            className={`${styles.input} ${
              errors.email ? styles.inputError : ""
            }`}
            name="email"
            onChange={handleFormChange}
            type="email"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && <p className={styles.labelError1}>{errors.email}</p>}

        <div className={styles.user}>
          <div
            style={{ marginBottom: "0.5rem" }}
            className={errors.password ? styles.labelError : ""}
          >
            Password
          </div>
          <input
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
            name="password"
            onChange={handleFormChange}
            type="password"
            placeholder="*********"
          />
        </div>
        {errors.password && (
          <p className={styles.labelError1}>{errors.password}</p>
        )}

        <button onClick={handleSubmit} className={styles.button}>
          Log in
        </button>
        <span className={styles.footer}>
          Don't have an account?
          <span onClick={() => navigate("/register")} className={styles.span1}>
            Register now
          </span>
        </span>
      </div>
      <ToastContainer />
    </div>
  );
}
