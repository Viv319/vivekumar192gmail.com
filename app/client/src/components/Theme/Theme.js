import React, { useState } from "react";
import styles from "./Theme.module.css";
import { useNavigate } from "react-router-dom";
import close from "../../assets/images/close.png";
import theme111 from "../../assets/images/theme111.png";
import theme2 from "../../assets/images/theme2.png";
import theme3 from "../../assets/images/theme3.png";
import theme11 from "../../assets/images/theme11.png";
import theme22 from "../../assets/images/theme22.png";
import theme33 from "../../assets/images/theme33.png";
import { updatePopups } from "../../api/popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Theme() {
  const [selectedTheme, setSelectedTheme] = useState(""); // State to track selected theme
  const navigate = useNavigate();

  // const [theme, setTheme] = useState(""); // State to track selected theme

  const [isSaved, setIsSaved] = useState(false);
  const [isOption1Clicked, setIsOption1Clicked] = useState(false);

  const handleOption1Click = () => {
    if (isSaved) {
      setIsOption1Clicked(true);
      toast.success("form link copied successfully successfully", {
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
        `http://localhost:3000/share/fillForm/${localStorage.getItem("formId")}`
      );
    } else {
      toast.error("first save the form theme then share", {
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

  const clickCross = () => {
    navigate("/dashboard");
  };

  const clickResponse = () => {
    navigate("/workspace/response");
  };

  const handleSubmit = async () => {
    try {
      const folderId = localStorage.getItem("folderId");
      if (folderId) {
        const theme = selectedTheme;
        const result = await updatePopups({ theme });

        if (result) {
          console.log("Popups theme saved successfully:", result);

          toast.success("theme updated successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setIsSaved(true);
          // setTimeout(() => {
          // navigate("/dashboard/folder");
          // }, 3000);
        }
      } else {
        const theme = selectedTheme;
        const result = await updatePopups({
          theme,
        });

        if (result) {
          console.log("Popups theme saved successfully:", result);

          toast.success("Form theme updated successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setIsSaved(true);
        }
      }
    } catch (error) {
      console.error("Error updating theme popups:", error);
    }
  };

  // Render the theme preview based on the selected theme
  const renderThemePreview = () => {
    switch (selectedTheme) {
      case "light":
        return (
          <div className={styles.themePreview}>
            <img src={theme11} className={styles.img11}></img>
          </div>
        );
      case "dark":
        return (
          <div className={styles.img12}>
            <img src={theme22} className={styles.img12}></img>
          </div>
        );
      case "blue":
        return (
          // <div className={styles.themePreview}>
          <div className={styles.img13}>
            <img src={theme33} className={styles.img13}></img>
          </div>
          // </div>
        );
      default:
        return (
          <div className={styles.themePreview}>
            <img src={theme11} className={styles.img11}></img>
          </div>
        );
    }
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
          <div className={styles.selectedOption1}>Theme</div>
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
          <div className={styles.choose}>Customize the theme</div>
          <hr className={styles.br}></hr>
          <div className={styles.theme}>
            <div
              className={`${styles.light} ${
                selectedTheme === "light" ? styles.selected : ""
              }`}
              onClick={() => setSelectedTheme("light")}
            >
              <img src={theme111} alt="Light Theme" className={styles.img1} />
            </div>
            <div
              className={`${styles.dark} ${
                selectedTheme === "dark" ? styles.selected : ""
              }`}
              onClick={() => setSelectedTheme("dark")}
            >
              <img src={theme2} alt="Dark Theme" className={styles.img2} />
            </div>
            <div
              className={`${styles.blue} ${
                selectedTheme === "blue" ? styles.selected : ""
              }`}
              onClick={() => setSelectedTheme("blue")}
            >
              <img src={theme3} alt="Blue Theme" className={styles.img3} />
            </div>
          </div>
        </div>
        <div className={styles.right2}>{renderThemePreview()}</div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
