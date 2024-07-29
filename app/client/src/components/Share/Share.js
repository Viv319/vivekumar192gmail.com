import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchPopupByFormId } from "../../api/popup";
import themeformcircle from "../../assets/images/themeformcircle.png";
import styles from "./Share.module.css";
import send from "../../assets/images/send.png";

export default function Share() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the dynamic segment of the URL

  const [shareFormShow, setShareFormShow] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [selectedElement, setSelectedElement] = useState(null);

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
                acc[`input${index}`] = ""; // Initialize with empty string or default value
              }
              return acc;
            },
            {}
          );
          setInputValues(initialValues);
        }
        console.log("result from fetchPopupByFormId: ", result);
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
    setSelectedElement(element);
  };

  const renderContent = (content, index) => {
    const isSelected = (element) =>
      selectedElement === element ? styles.selected : "";

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
              className={isSelected(`image${index}`)}
              onClick={() => handleElementClick(`image${index}`)}
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
              className={isSelected(`gif${index}`)}
              onClick={() => handleElementClick(`gif${index}`)}
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
            />
            <div className={styles.img1}>
              <img
                src={send}
                alt="send"
                className={isSelected(`textInput${index}`)}
                onClick={() => handleElementClick(`textInput${index}`)}
              />
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
            />
            <div className={styles.img2}>
              <img
                src={send}
                alt="send"
                className={isSelected(`numberInput${index}`)}
                onClick={() => handleElementClick(`numberInput${index}`)}
              />
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
            />
            <div className={styles.img3}>
              <img
                src={send}
                alt="send"
                className={isSelected(`emailInput${index}`)}
                onClick={() => handleElementClick(`emailInput${index}`)}
              />
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
            />
            <div className={styles.img4}>
              <img
                src={send}
                alt="send"
                className={isSelected(`phoneInput${index}`)}
                onClick={() => handleElementClick(`phoneInput${index}`)}
              />
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
            />
            <div className={styles.img5}>
              <img
                src={send}
                alt="send"
                className={isSelected(`dateInput${index}`)}
                onClick={() => handleElementClick(`dateInput${index}`)}
              />
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
                  className={`${styles[`rating${rating}`]} ${isSelected(
                    `rating${rating}`
                  )}`}
                  onClick={() => handleElementClick(`rating${rating}`)}
                >
                  {rating}
                </div>
              ))}
            </div>
            <div className={styles.img6}>
              <img
                src={send}
                alt="send"
                className={isSelected(`ratingInput${index}`)}
                onClick={() => handleElementClick(`ratingInput${index}`)}
              />
            </div>
          </div>
        );
      case "Button":
        return (
          <div className={styles.bigButton}>
            <div className={styles.button}>
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
