import React, { useState, useEffect } from "react";
import styles from "./Response.module.css";
import { useNavigate } from "react-router-dom";
import close from "../../assets/images/close.png";
import theme11 from "../../assets/images/theme11.png";
import theme22 from "../../assets/images/theme22.png";
import { getSahredFormResponse } from "../../api/share";

export default function Response() {
  const navigate = useNavigate();

  const [shareData, setShareData] = useState([]);

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

  useEffect(() => {
    // getSahredFormResponse
    console.log("this is use effect");

    const fetchShareResponse = async () => {
      try {
        const result = await getSahredFormResponse();
        setShareData(result);
        console.log("result from getSahredFormResponse: ", result);
      } catch (error) {
        console.log("Error fetching share data: ", error);
      }
    };
    fetchShareResponse();
  }, []);

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
      <div className={styles.body}>
        {shareData.length > 0 ? (
          <div className={styles.responseContainer}>
            <p className={styles.responseTitle}>Response:</p>
            <div className={styles.response}>
              {shareData.map((response, index) => (
                <div key={index} className={styles.responseItem}>
                  {response.inputText}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className={styles.p1}>No Response yet collected</p>
        )}
      </div>
    </div>
  );
}
