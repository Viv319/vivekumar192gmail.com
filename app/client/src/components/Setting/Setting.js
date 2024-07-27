import React, { useState } from "react";
import styles from "./Setting.module.css";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/auth";
import logout from "../../assets/images/Logout.png";
import profile from "../../assets/images/Profile.png";
import lock from "../../assets/images/lock.png";
import eye from "../../assets/images/eye.png";

export default function Setting() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    name: null,
    oldPassword: null,
    password: null,
  });

  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (formData.password === formData.oldPassword) {
      alert("Password and old password cannot be the same");
      return;
    }

    const result = await updateUser(formData);
    if (result) {
      alert("Profile updated successfully");
      localStorage.clear();
      navigate("/login");
    } else {
      alert(result.message);
    }
  };

  const clickLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleEmailVisibility = () => {
    setIsEmailVisible(!isEmailVisible);
  };

  const toggleOldPasswordVisibility = () => {
    setIsOldPasswordVisible(!isOldPasswordVisible);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.h2}>Settings</h2>

        <div className={styles.common1}>
          <img src={profile} alt="Profile" />
          <input
            className={styles.input}
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Name"
          />
        </div>
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <div className={styles.common}>
          <img src={lock} alt="Lock" />
          <input
            className={styles.input}
            name="email"
            onChange={handleChange}
            type={isEmailVisible ? "text" : "password"}
            placeholder="Update Email"
          />
          <img
            src={eye}
            onClick={toggleEmailVisibility}
            style={{ cursor: "pointer" }}
            alt="Toggle Visibility"
          />
        </div>
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <div className={styles.common}>
          <img src={lock} alt="Lock" />
          <input
            className={styles.input}
            name="oldPassword"
            onChange={handleChange}
            type={isOldPasswordVisible ? "text" : "password"}
            placeholder="Old Password"
          />
          <img
            src={eye}
            onClick={toggleOldPasswordVisibility}
            style={{ cursor: "pointer" }}
            alt="Toggle Visibility"
          />
        </div>
        {errors.oldPassword && (
          <p style={{ color: "red" }}>{errors.oldPassword}</p>
        )}

        <div className={styles.common}>
          <img src={lock} alt="Lock" />
          <input
            className={styles.input}
            name="password"
            onChange={handleChange}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="New Password"
          />
          <img
            src={eye}
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
            alt="Toggle Visibility"
          />
        </div>
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <button onClick={handleSubmit} className={styles.button}>
          Update
        </button>
      </div>
      <div className={styles.logoutbutton}>
        <button className={styles.logout3} onClick={clickLogout}>
          <img src={logout} style={{ marginRight: "10px" }} alt="Logout" /> Log
          out
        </button>
      </div>
    </div>
  );
}
