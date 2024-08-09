import React, { useState, useEffect } from "react";
import close from "../../assets/images/close.png";
import styles from "./Workspace.module.css";
import { useNavigate } from "react-router-dom";
import text from "../../assets/images/text.png";
import image from "../../assets/images/image.png";
import video from "../../assets/images/video.png";
import inputText from "../../assets/images/typeText.png";
import number from "../../assets/images/phone.png";
import email from "../../assets/images/attherate.png";
import phone from "../../assets/images/phone.png";
import date from "../../assets/images/date.png";
import rating from "../../assets/images/star.png";
import button from "../../assets/images/button.png";
import smallgif from "../../assets/images/smallgif.png";
import vector from "../../assets/images/vector.png";
import delete1 from "../../assets/images/delete1.png";
import { savePopups } from "../../api/popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Workspace() {
  const navigate = useNavigate();
  const [popups, setPopups] = useState([]);
  const [formName, setFormName] = useState(""); // State for form name
  const [popupCounts, setPopupCounts] = useState({});

  const [isOption1Clicked, setIsOption1Clicked] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  const popupHeight = 50;
  const popupSpacing = 0;

  const clickCross = () => {
    navigate("/dashboard");
  };

  const clickTheme = () => {
    navigate("/workspace/theme");
  };

  const clickResponse = () => {
    navigate("/workspace/response");
  };

  const handleClick = (content) => (event) => {
    const middlerightElement = document.querySelector(`.${styles.middleright}`);
    const rect = middlerightElement.getBoundingClientRect();

    const newTop = popups.length
      ? popups[popups.length - 1].position.top + popupHeight + popupSpacing
      : rect.bottom + window.scrollY + 10;

    const count = (popupCounts[content] || 0) + 1;
    const popup = {
      content,
      count,
      position: {
        // top: newTop,
        // left: rect.left + window.scrollX,
      },
      id: Date.now(),
    };

    setPopups((prevPopups) => [...prevPopups, popup]);
    setPopupCounts((prevCounts) => ({
      ...prevCounts,
      [content]: count,
    }));
  };

  const handleClosePopup = (id) => {
    setPopups((prevPopups) => {
      const popupToClose = prevPopups.find((popup) => popup.id === id);
      const newPopups = prevPopups.filter((popup) => popup.id !== id);
      return newPopups.map((popup, index) => ({
        ...popup,
        position: {
          ...popup.position,
          top: newPopups[0].position.top + index * (popupHeight + popupSpacing),
        },
      }));
    });

    setPopupCounts((prevCounts) => {
      const popupToRemove = popups.find((popup) => popup.id === id);
      if (!popupToRemove) return prevCounts;
      const { content } = popupToRemove;
      const newCount = (prevCounts[content] || 1) - 1;
      if (newCount <= 0) {
        const { [content]: _, ...rest } = prevCounts;
        return rest;
      } else {
        return {
          ...prevCounts,
          [content]: newCount,
        };
      }
    });
  };

  const handleInputChange = (id, event) => {
    setPopups((prevPopups) =>
      prevPopups.map((popup) =>
        popup.id === id ? { ...popup, inputValue: event.target.value } : popup
      )
    );
  };

  const handleOption1Click = () => {
    if (isSaved) {
      setIsOption1Clicked(true);
      toast.success("form link copied successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigator.clipboard.writeText(
        // `http://localhost:3000/share/fillForm/${localStorage.getItem("formId")}`
        `https://vivekumar192-gmail-com-client.vercel.app/share/fillForm/${localStorage.getItem(
          "formId"
        )}`
      );
    } else {
      toast.error("first save the form then share", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleSubmit = async () => {
    const contents = popups.map((popup, index) => ({
      contentType: popup.content,
      order: popup.count,
      inputValue: popup.inputValue || "", // Include input value if present
    }));

    try {
      const folderId = localStorage.getItem("folderId");
      if (folderId) {
        const result = await savePopups({ name: formName, contents, folderId });

        if (result) {
          toast.success("Form created successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          console.log("Popups saved successfully:", result.data._id);

          localStorage.setItem("formId", result.data._id);
          setIsSaved(true);
          // setTimeout(() => {
          // navigate("/dashboard/folder");
          // }, 3000);
        }
      } else {
        const result = await savePopups({
          name: formName,
          contents,
        });

        if (result) {
          toast.success("Form created successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          console.log("Popups saved successfully:", result.data);

          localStorage.setItem("formId", result.data._id);
          setIsSaved(true);
        }
      }
    } catch (error) {
      console.error("Error saving popups:", error);
    }
  };

  const getPlaceholderText = (content) => {
    switch (content) {
      case "Text":
      case "Text Input":
        return "Click to add text";
      case "Image":
      case "Video":
      case "GIF":
      case "Button":
        return "Click to add link";
      default:
        return "";
    }
  };

  const noInputRequired = [
    "Text Input",
    "Number Input",
    "Email Input",
    "Phone Input",
    "Date Input",
    "Rating Input",
    "Button",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.formName}>
          <input
            type="text"
            className={styles.input1}
            placeholder="Enter Form Name"
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>

        <div className={styles.formOption}>
          <div className={styles.selectedOption1}>Flow</div>
          <div className={styles.selectedOption} onClick={clickTheme}>
            Theme
          </div>
          <div className={styles.selectedOption} onClick={clickResponse}>
            Response
          </div>
        </div>

        <div className={styles.right}>
          <div
            className={`${styles.option1} ${
              isOption1Clicked ? styles.option1Clicked : ""
            }`}
            onClick={handleOption1Click}
          >
            Share
          </div>
          <div className={styles.option2} onClick={handleSubmit}>
            Save
          </div>
          <div className={styles.option3} onClick={clickCross}>
            <img src={close} alt="Close" />
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.align}>
            <p className={styles.bubble}>Bubbles</p>
            <div className={styles.container1}>
              <div className={styles.common1} onClick={handleClick("Text")}>
                <img src={text} className={styles.imageCommon} alt="Text" />
                Text
              </div>
              <div className={styles.common2} onClick={handleClick("Image")}>
                <img src={image} className={styles.imageCommon} alt="Image" />
                Image
              </div>
            </div>
            <div className={styles.container2}>
              <div className={styles.common3} onClick={handleClick("Video")}>
                <img src={video} className={styles.imageCommon} alt="Video" />
                Video
              </div>
              <div className={styles.common4} onClick={handleClick("GIF")}>
                <img src={smallgif} className={styles.imageCommon} alt="GIF" />
                GIF
              </div>
            </div>
          </div>

          <div className={styles.align2}>
            <p className={styles.inputs}>Inputs</p>
            <div className={styles.container3}>
              <div
                className={styles.common5}
                onClick={handleClick("Text Input")}
              >
                <img
                  src={inputText}
                  className={styles.imageCommon}
                  alt="Text Input"
                />
                Text
              </div>
              <div
                className={styles.common6}
                onClick={handleClick("Number Input")}
              >
                <img src={number} className={styles.imageCommon} alt="Number" />
                Number
              </div>
            </div>
            <div className={styles.container4}>
              <div
                className={styles.common7}
                onClick={handleClick("Email Input")}
              >
                <img src={email} className={styles.imageCommon} alt="Email" />
                Email
              </div>
              <div
                className={styles.common8}
                onClick={handleClick("Phone Input")}
              >
                <img src={phone} className={styles.imageCommon} alt="Phone" />
                Phone
              </div>
            </div>
            <div className={styles.container5}>
              <div
                className={styles.common9}
                onClick={handleClick("Date Input")}
              >
                <img src={date} className={styles.imageCommon} alt="Date" />
                Date
              </div>
              <div
                className={styles.common10}
                onClick={handleClick("Rating Input")}
              >
                <img src={rating} className={styles.imageCommon} alt="Rating" />
                Rating
              </div>
            </div>
            <div className={styles.common11} onClick={handleClick("Button")}>
              <img src={button} className={styles.imageCommon} alt="Button" />
              Button
            </div>
          </div>
        </div>

        <div className={styles.middleright}>
          <div className={styles.start}>
            <img src={vector} alt="Start" /> Start
          </div>
          <div className={styles.popups}>
            {popups.map((popup, index) => (
              <div
                key={popup.id}
                className={styles.popup}
                style={{
                  top: `${
                    popup.position.top +
                    index * (popupHeight + popupSpacing) -
                    370
                  }px`,
                  left: `${popup.position.left + 270}px`,
                }}
              >
                <div className={styles.popupContent}>
                  <div
                    className={styles.deleteIng}
                    onClick={() => {
                      handleClosePopup(popup.id);
                    }}
                  >
                    <img src={delete1} alt="Delete" />
                  </div>
                  <p className={styles.lastP}>
                    {popup.content} {popup.count}
                  </p>
                  {noInputRequired.includes(popup.content) ? (
                    <p className={styles.hintText}>
                      Hint: User will input a text on his form
                    </p>
                  ) : (
                    <input
                      type="text"
                      className={styles.inputlast}
                      placeholder={getPlaceholderText(popup.content)}
                      onChange={(e) => handleInputChange(popup.id, e)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer></ToastContainer>
    </div>
  );
}
