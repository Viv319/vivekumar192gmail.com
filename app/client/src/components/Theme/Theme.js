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

import themeformcircle from "../../assets/images/themeformcircle.png";
// import theme11 from "../../assets/images/theme11.png";
// import theme22 from "../../assets/images/theme22.png";

export default function Theme() {
  const [username, setUsername] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(""); // State to track selected theme
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const usernameId = userId ? userId.replace(/"/g, "") : "";

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
            {/* <div className={styles.img12}>
              <div>
                <img
                  src={themeformcircle}
                  className={styles.themeformcircle}
                ></img>
                <div>Hello</div>
              </div>
            </div> */}
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
    </div>
  );
}
