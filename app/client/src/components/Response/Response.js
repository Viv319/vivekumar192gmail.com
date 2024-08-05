import React, { useState, useEffect } from "react";
import styles from "./Response.module.css";
import { useNavigate } from "react-router-dom";
import close from "../../assets/images/close.png";
import { getSahredFormResponse } from "../../api/share";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import {
  // updateUrlView,
  viewUrlView,
  updateUrlStats,
  viewUrlStats,
  viewCompletionRate,
} from "../../api/popup";

import { getFormResponse } from "../../api/share";

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

  const { formId } = useParams();

  const [view, setView] = useState([]);

  const [stat, setStat] = useState([]);

  const [completionRate, setCompletionRate] = useState([]);

  useEffect(() => {
    const viewCOunt = async () => {
      try {
        const viewCount = await viewUrlView(formId);
        console.log("view count: " + viewCount.totalViews);
        setView(viewCount);
      } catch (error) {
        console.log("Error updating view count: ", error);
      }
    };

    const viewStats = async () => {
      try {
        const viewStatsResult = await viewUrlStats(formId);
        setStat(viewStatsResult);
        console.log("view stats", viewStatsResult.totalStarts);
      } catch (error) {
        console.log("Error fetching view stats: ", error);
      }
    };

    const fetchShareResponse = async () => {
      try {
        const result = await getFormResponse();
        setShareData(result.data);
        console.log("result from getSahredFormResponse: ", result);
      } catch (error) {
        console.log("Error fetching share data: ", error);
      }
    };

    const fetchCompletionRate = async () => {
      try {
        const completionRate = await viewCompletionRate(formId);
        console.log("completion rate: " + completionRate.completionRate);
        setCompletionRate(completionRate);
      } catch (error) {
        console.log("Error fetching completion rate: ", error);
      }
    };

    fetchCompletionRate();
    viewStats();
    viewCOunt();

    fetchShareResponse();
  }, []);

  const allowedInputTypes = [
    "Text Input",
    "Number Input",
    "Email Input",
    "Phone Input",
    "Date Input",
    "Rating Input",
    "Button",
  ];

  // const uniqueContentTypes = new Set();
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
        <div className={styles.responseContainer1}>
          {shareData.length > 0 && (
            <p className={styles.middle}>
              <p className={styles.views}>Views {view.totalViews}</p>
              <p className={styles.starts}>Starts {stat.totalStarts}</p>
              <p className={styles.completionRate}>
                Completion rate{" "}
                {isFinite(completionRate.completionRate / stat.totalStarts)
                  ? (completionRate.completionRate / stat.totalStarts) * 100
                  : 0}
                %
              </p>
            </p>
          )}
        </div>

        <div className={styles.responseContainer2}>
          {shareData.length > 0 ? (
            shareData.map((form, index) => (
              <div key={index} className={styles.responseContainer}>
                <div className={styles.showResponse}>
                  <div className={styles.sub}>Submitted at</div>
                  {form.contents
                    .filter((content) =>
                      allowedInputTypes.includes(content.contentType)
                    )
                    // .slice(0, 1)
                    .map((content, index) => {
                      return (
                        <div key={index} className={styles.responseItem}>
                          <p className={styles.inputValue}>
                            {content.contentType} {index + 1}
                          </p>
                        </div>
                      );
                    })}
                </div>
                <div className={styles.showResponse2}>
                  <div className={styles.resp}> {index + 1} </div>
                  <div className={styles.submissionTime}>
                    {new Date(form.submitionStartTime).toLocaleDateString(
                      "en-IN",
                      {
                        timeZone: "Asia/Kolkata",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                    ,{" "}
                    {new Date(form.submitionStartTime)
                      .toLocaleTimeString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })
                      .toLowerCase()}
                  </div>
                  <div className={styles.response}>
                    {form.contents
                      .filter((content) =>
                        allowedInputTypes.includes(content.contentType)
                      )
                      .map((content, index) => (
                        <div key={index} className={styles.responseItem}>
                          <p className={styles.inputValue}>
                            {content.inputValue}
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
    </div>
  );
}
