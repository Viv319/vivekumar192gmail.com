import React, { useState, useEffect } from "react";
import styles from "./Response.module.css";
import { useNavigate } from "react-router-dom";
import close from "../../assets/images/close.png";
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

  const handleSubmit = async () => {
    // Add logic to save or use the contents
  };

  useEffect(() => {
    const fetchShareResponse = async () => {
      try {
        const result = await getSahredFormResponse();
        setShareData(result.data);
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
          shareData.map((form, index) => (
            <div key={index} className={styles.responseContainer}>
              <p className={styles.middle}>
                <p className={styles.views}>Total Views: {form.totalViews}</p>
                <p className={styles.starts}>
                  Total Starts: {form.totalStarts}
                </p>
                <p className={styles.completionRate}>
                  Completion Rate: {form.completionRate}
                </p>
              </p>
              <div className={styles.responseContainer}>
                <p className={styles.responseTitle}>Response:</p>
                <div className={styles.submissionTime}>
                  Submission Start Time:{" "}
                  {new Date(form.submitionStartTime).toLocaleDateString()}
                </div>
                <div className={styles.response}>
                  {form.contents.map((content, index) => (
                    <div key={index} className={styles.responseItem}>
                      <p className={styles.inputValue}>
                        <strong>Value:</strong> {content.inputValue}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.p1}>No Response yet collected</p>
        )}
      </div>
    </div>
  );
}
