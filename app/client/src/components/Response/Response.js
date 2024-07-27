import React, { useState } from "react";
import styles from "./Response.module.css";
import { useNavigate } from "react-router-dom";
import close from "../../assets/images/close.png";
import theme11 from "../../assets/images/theme11.png";
import theme22 from "../../assets/images/theme22.png";

export default function Response() {
  const navigate = useNavigate();

  const clickSetting = () => {
    navigate("/setting");
  };

  const clickTheme = () => {
    navigate("/workspace/theme");
  };

  const clickCross = () => {
    navigate("/dashboard");
  };

  const clickResponse = () => {
    navigate("/workspace/response");
  };

  const handleSubmit = async () => {
    // Add logic to save or use the contents
  };

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.formOption}>
          <div
            className={styles.selectedOption}
            onClick={() => navigate("/workspace")}
          >
            Flow
          </div>
          <div className={styles.selectedOption} onClick={clickTheme}>
            Theme
          </div>
          <div className={styles.selectedOption1}>Response</div>
        </div>

        <div className={styles.right}>
          <div className={styles.option1}>Share</div>
          <div className={styles.option2} onClick={handleSubmit}>
            Save
          </div>
          <div className={styles.option3} onClick={clickCross}>
            <img src={close} alt="Close" />
          </div>
        </div>
      </div>
      <div className={styles.body}></div>
    </div>
  );
}
