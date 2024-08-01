import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchPopupByFormId } from "../../api/popup";
import themeformcircle from "../../assets/images/themeformcircle.png";
import styles from "./Share.module.css";
import send from "../../assets/images/send.png";
import {
  saveShareResponse,
  updateShareResponse,
  incrementViewCount,
} from "../../api/share";

export default function Share() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [shareFormShow, setShareFormShow] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [disabledElements, setDisabledElements] = useState({});
  const [selectedRating, setSelectedRating] = useState({});
  const [submissionId, setSubmissionId] = useState(null);

  const [submitionStartTime, setSubmitionStartTime] = useState(null);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    if (id) {
      localStorage.setItem("shareFormId", id);
    }
    const fetchFormByFormId = async () => {
      try {
        const result = await fetchPopupByFormId(id);
        if (result && result.popups && result.popups.length > 0) {
          setShareFormShow(result.popups[0]);
          const initialValues = result.popups[0].contents.reduce(
            (acc, content, index) => {
              if (
                [
                  "Text Input",
                  "Number Input",
                  "Email Input",
                  "Phone Input",
                  "Date Input",
                  "Rating Input",
                ].includes(content.contentType)
              ) {
                acc[`input${index}`] = "";
              }
              return acc;
            },
            {}
          );

          setInputValues(initialValues);
          setSubmitionStartTime(new Date().toISOString());
        }
        console.log("result from fetchPopupByFormId: ", result);

        // ................................

        const i = localStorage.getItem("shareFormId");
        if (i) {
          const incResult = await incrementViewCount(id); // Use form ID for updating view count
          console.log("Increment result:", incResult);
          // setShareData((prevData) =>
          //   prevData.map((form) =>
          //     form._id === i
          //       ? { ...form, totalViews: incResult.totalViews }
          //       : form
          //   )
          // );
        }
      } catch (error) {
        console.error("Error fetching popup details:", error);
      }
    };
    fetchFormByFormId();
  }, [id, navigate]);

  const handleInputChange = (e, index) => {
    setInputValues({
      ...inputValues,
      [`input${index}`]: e.target.value,
    });
  };

  const handleElementClick = (element) => {
    setDisabledElements((prev) => ({
      ...prev,
      [element]: true,
    }));
    handleSave();
  };

  const handleRatingClick = (index, rating) => {
    setSelectedRating((prev) => ({
      ...prev,
      [index]: rating,
    }));
  };

  const renderContent = (content, index) => {
    const isDisabled = (element) => disabledElements[element];

    switch (content.contentType) {
      case "Text":
        return (
          <div className={styles.text1}>
            <img src={themeformcircle} alt="circle" />
            <p>{content.inputValue}</p>
          </div>
        );
      case "Image":
        return (
          <>
            <img src={themeformcircle} alt="circle" />
            <img
              src={content.inputValue}
              alt="content"
              style={{ maxWidth: "100%" }}
              className={isDisabled(`image${index}`) ? styles.disabled : ""}
              // onClick={() => {
              //   if (!isDisabled(`image${index}`))
              //     handleElementClick(`image${index}`);
              // }}
            />
          </>
        );
      case "Video":
        return (
          <>
            <img src={themeformcircle} alt="circle" />
            <video controls style={{ width: "320", height: "240" }}>
              <source src={content.inputValue} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>
        );
      case "Gif":
        return (
          <>
            <img src={themeformcircle} alt="circle" />
            <img
              src={content.inputValue}
              alt="gif"
              style={{ maxWidth: "100%" }}
              className={isDisabled(`gif${index}`) ? styles.disabled : ""}
              // onClick={() => {
              //   if (!isDisabled(`gif${index}`))
              //     handleElementClick(`gif${index}`);
              // }}
            />
          </>
        );
      case "Text Input":
        return (
          <div className={styles.bigTextInput}>
            <input
              type="text"
              placeholder="Enter your text"
              className={styles.textInput}
              value={inputValues[`input${index}`] || ""}
              onChange={(e) => handleInputChange(e, index)}
              disabled={isDisabled(`textInput${index}`)}
            />
            <div
              className={`${styles.img1} ${
                isDisabled(`textInput${index}`) ? styles.disabled : ""
              }`}
              onClick={() => {
                if (!isDisabled(`textInput${index}`))
                  handleElementClick(`textInput${index}`);
              }}
            >
              <img src={send} alt="send" />
            </div>
          </div>
        );
      case "Number Input":
        return (
          <div className={styles.bigNumber}>
            <input
              type="number"
              className={styles.number}
              placeholder="Enter a number"
              value={inputValues[`input${index}`] || ""}
              onChange={(e) => handleInputChange(e, index)}
              disabled={isDisabled(`numberInput${index}`)}
            />
            <div
              className={`${styles.img2} ${
                isDisabled(`numberInput${index}`) ? styles.disabled : ""
              }`}
              onClick={() => {
                if (!isDisabled(`numberInput${index}`))
                  handleElementClick(`numberInput${index}`);
              }}
            >
              <img src={send} alt="send" />
            </div>
          </div>
        );
      case "Email Input":
        return (
          <div className={styles.bigEmail}>
            <input
              type="email"
              className={styles.email}
              placeholder="Enter your email"
              value={inputValues[`input${index}`] || ""}
              onChange={(e) => handleInputChange(e, index)}
              disabled={isDisabled(`emailInput${index}`)}
            />
            <div
              className={`${styles.img3} ${
                isDisabled(`emailInput${index}`) ? styles.disabled : ""
              }`}
              onClick={() => {
                if (!isDisabled(`emailInput${index}`))
                  handleElementClick(`emailInput${index}`);
              }}
            >
              <img src={send} alt="send" />
            </div>
          </div>
        );
      case "Phone Input":
        return (
          <div className={styles.bigPhone}>
            <input
              type="string"
              className={styles.phone}
              placeholder="Enter your phone"
              value={inputValues[`input${index}`] || ""}
              onChange={(e) => handleInputChange(e, index)}
              disabled={isDisabled(`phoneInput${index}`)}
            />
            <div
              className={`${styles.img4} ${
                isDisabled(`phoneInput${index}`) ? styles.disabled : ""
              }`}
              onClick={() => {
                if (!isDisabled(`phoneInput${index}`))
                  handleElementClick(`phoneInput${index}`);
              }}
            >
              <img src={send} alt="send" />
            </div>
          </div>
        );
      case "Date Input":
        return (
          <div className={styles.bigDate}>
            <input
              type="date"
              className={styles.date}
              placeholder="Select a date"
              value={inputValues[`input${index}`] || ""}
              onChange={(e) => handleInputChange(e, index)}
              disabled={isDisabled(`dateInput${index}`)}
            />
            <div
              className={`${styles.img5} ${
                isDisabled(`dateInput${index}`) ? styles.disabled : ""
              }`}
              onClick={() => {
                if (!isDisabled(`dateInput${index}`))
                  handleElementClick(`dateInput${index}`);
              }}
            >
              <img src={send} alt="send" />
            </div>
          </div>
        );
      case "Rating Input":
        return (
          <div className={styles.starRating}>
            <div className={styles.rating}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <div
                  key={rating}
                  className={`${styles[`rating${rating}`]} ${
                    selectedRating[index] === rating ? styles.selected : ""
                  } ${
                    isDisabled(`ratingInput${index}`) &&
                    selectedRating[index] !== rating
                      ? styles.disabled
                      : ""
                  }`}
                  onClick={() => {
                    if (!isDisabled(`ratingInput${index}`))
                      handleRatingClick(index, rating);
                  }}
                >
                  {rating}
                </div>
              ))}
            </div>
            <div
              className={`${styles.img6} ${
                isDisabled(`ratingInput${index}`) ? styles.disabled : ""
              }`}
              onClick={() => {
                if (!isDisabled(`ratingInput${index}`))
                  handleElementClick(`ratingInput${index}`);
              }}
            >
              <input
                style={{
                  backgroundColor: "#053EC4",
                  color: "white",
                  border: "0px",
                  outline: "none",
                }}
              />
            </div>
          </div>
        );
      case "Button":
        return (
          <div className={styles.bigButton}>
            <div
              className={`${styles.img7} ${
                isDisabled(`button${index}`) ? styles.disabled : ""
              }`}
              onClick={() => {
                if (!isDisabled(`button${index}`))
                  handleElementClick(`button${index}`);
              }}
            >
              <input
                style={{
                  backgroundColor: "#053EC4",
                  color: "white",
                  border: "0px",
                  outline: "none",
                }}
              />
            </div>
          </div>
        );
      default:
        return <p>Unknown content type</p>;
    }
  };

  const getThemeClass = (theme) => {
    switch (theme) {
      case "light":
        return styles.lightTheme;
      case "dark":
        return styles.darkTheme;
      case "blue":
        return styles.blueTheme;
      default:
        return "";
    }
  };

  const handleSave = async () => {
    try {
      const updatedContents = shareFormShow.contents.map((content, i) => {
        if (
          [
            "Text Input",
            "Number Input",
            "Email Input",
            "Phone Input",
            "Date Input",
            "Rating Input",
            "Button",
          ].includes(content.contentType)
        ) {
          return {
            ...content,
            inputValue:
              inputValues[`input${i}`] ||
              selectedRating[i] ||
              content.inputValue,
          };
        }
        return content;
      });

      const totalViews = shareFormShow.totalViews + 1;

      if (!submissionId) {
        // If no submissionId, save new entry
        const response = await saveShareResponse({
          contents: updatedContents,
          totalViews,
          totalStarts: shareFormShow.totalStarts,
          completionRate: shareFormShow.completionRate,
          submitionStartTime,
          formId: id,
        });

        console.log(response.data._id);

        setSubmissionId(response.data._id); // Save the ID for future updates

        localStorage.setItem("submissionId", response.data._id);
        console.log("Form response saved successfully:", response);
      } else {
        // Update existing entry
        localStorage.setItem("submissionId", submissionId);
        await updateShareResponse({
          contents: updatedContents,
          totalViews,
          totalStarts: shareFormShow.totalStarts,
          completionRate: shareFormShow.completionRate,
          submitionStartTime,
          // formId: id,
        });
        console.log("Form response updated successfully");
      }
    } catch (error) {
      console.error("Error saving form response:", error);
    }
  };

  return (
    <div className={getThemeClass(shareFormShow?.theme)}>
      <h1>Fill Form</h1>
      {shareFormShow ? (
        <div>
          <h2>{shareFormShow.name}</h2>
          <p>Theme: {shareFormShow.theme}</p>
          <div>
            <h3>Contents:</h3>
            {shareFormShow.contents && shareFormShow.contents.length > 0 ? (
              <ul>
                {shareFormShow.contents.map((content, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {renderContent(content, index)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No contents available</p>
            )}
          </div>
        </div>
      ) : (
        <p>No data to show</p>
      )}
    </div>
  );
}
