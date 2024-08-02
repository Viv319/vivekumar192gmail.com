import React, { useState, useEffect } from "react";
import styles from "./Response.module.css";
import { useNavigate } from "react-router-dom";
import close from "../../assets/images/close.png";
import { getFormResponse, incrementViewCount } from "../../api/share";

export default function Response() {
  const navigate = useNavigate();
  const [shareData, setShareData] = useState([]);
  const [stats, setStats] = useState();

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
        const result = await getFormResponse();
        setShareData(result.data);
        console.log("result from getSahredFormResponse: ", result);

        // Increment view count for each form
        // result.data.forEach(async (form) => {

        // });
      } catch (error) {
        console.log("Error fetching share data: ", error);
      }
    };
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
              <p className={styles.views}>
                Total Views: {shareData[0].totalViews}{" "}
                {/* Display the view count */}
              </p>
              <p className={styles.starts}>
                {/* Total Starts: {form.totalStarts} */}
                stats
              </p>
              <p className={styles.completionRate}>
                {/* Completion Rate: {form.completionRate} */}
                completion rate
              </p>
            </p>
          )}
        </div>
        <div className={styles.responseContainer2}>
          <div className={styles.sub}>submitted at</div>
          {shareData.length > 0 ? (
            shareData.map((form, index) => (
              <div key={index} className={styles.responseContainer}>
                <div>
                  {form.contents
                    .filter((content) =>
                      allowedInputTypes.includes(content.contentType)
                    )
                    .map((content, index) => {
                      // if (uniqueContentTypes.has(content.contentType)) {
                      //   return null; // Skip this content if it's already been printed
                      // }

                      // uniqueContentTypes.add(content.contentType); // Add the contentType to the set

                      return (
                        <div key={index} className={styles.responseItem}>
                          <p className={styles.inputValue}>
                            {content.contentType} {content.order - 1}
                          </p>
                        </div>
                      );
                    })}
                </div>
                <div className={styles.resp}> {index + 1} </div>
                <div className={styles.submissionTime}>
                  {/* {index + 1} */}
                  {"     "}{" "}
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
            ))
          ) : (
            <p className={styles.p1}>No Response yet collected</p>
          )}
        </div>
      </div>
    </div>
  );
}
