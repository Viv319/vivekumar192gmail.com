import React, { useState } from "react";
import styles from "./Register.module.css";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backarrow from "../../assets/images/arrow_back.png";
import Ellipse1 from "../../assets/images/Ellipse 1.png";
import Ellipse2 from "../../assets/images/Ellipse 2.png";
import group from "../../assets/images/Group 2.png";

export default function Register() {
  const notify = () => {
    toast.success("Register successful", {
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

  const errorNotify = () => {
    toast.error("Something went wrong", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const [errors, setErrors] = useState({
    email: null,
    name: null,
    password: null,
    confirmPassword: null,
  });

  const navigate = useNavigate();

  const [formData, setFormDate] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setFormDate({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (formData.name.trim().length === 0) {
      newErrors.name = "Name can't be empty";
    }
    if (formData.email.trim().length === 0) {
      newErrors.email = "Email can't be empty";
    }
    if (formData.password.trim().length === 0) {
      newErrors.password = "Password can't be empty";
    }
    if (formData.confirmPassword.trim().length === 0) {
      newErrors.confirmPassword = "Confirm Password can't be empty";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const result = await registerUser(formData);
      if (result) {
        // notify();
        // setTimeout(() => {
        navigate("/");
        // }, 3000);
      } else {
        errorNotify();
      }
    } catch (error) {
      errorNotify();
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
            className={errors.name ? styles.labelError : ""}
          >
            Username
          </div>
          <input
            className={`${styles.input} ${
              errors.name ? styles.inputError : ""
            }`}
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Enter a username"
          />
        </div>
        {errors.name && <p className={styles.labelError1}>{errors.name}</p>}

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
            onChange={handleChange}
            type="email"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && <p className={styles.labelError1}>{errors.email}</p>}

        <div className={styles.user}>
          <div
            style={{ marginBottom: "0.5rem" }}
            className={errors.confirmPassword ? styles.labelError : ""}
          >
            Password
          </div>
          <input
            className={`${styles.input} ${
              errors.confirmPassword ? styles.inputError : ""
            }`}
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            placeholder="***********"
          />
        </div>
        {errors.confirmPassword && (
          <p className={styles.labelError1}>{errors.confirmPassword}</p>
        )}

        <div className={styles.user}>
          <div
            style={{ marginBottom: "0.5rem" }}
            className={errors.password ? styles.labelError : ""}
          >
            Confirm Password
          </div>
          <input
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="***********"
          />
        </div>
        {errors.password && (
          <p className={styles.labelError1}>{errors.password}</p>
        )}

        <button onClick={handleSubmit} className={styles.button}>
          Sign Up
        </button>
        <div className={styles.footer}>
          Already have an account?
          <span className={styles.underline} onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
