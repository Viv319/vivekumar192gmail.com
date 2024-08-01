import React, { useState, useEffect } from "react";
import styles from "./FolderPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import plus from "../../assets/images/plus.png";
import downarrow from "../../assets/images/downarrow.png";
import { useNavigate } from "react-router-dom";
import { getFormByFolderId } from "../../api/popup.js";
import delete1 from "../../assets/images/delete1.png";
import { deleteForm } from "../../api/popup.js";

export default function Home() {
  const [username, setUsername] = useState("");
  const [showFormData, setshowFormData] = useState([]);
  const [hasToastShown, setHasToastShown] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isFormDeletePopupVisible, setisFormDeletePopupVisible] =
    useState(false);

  const navigate = useNavigate();

  const closeDeletePopup = () => {
    setisFormDeletePopupVisible(false);
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem("name");
    if (storedUsername) {
      const username = storedUsername ? storedUsername.replace(/"/g, "") : "";
      setUsername(username);
    }

    const toastShown = localStorage.getItem("hasToastShown");
    if (!toastShown) {
      // notify();
      setHasToastShown(true);
      localStorage.setItem("hasToastShown", "true");
    }
    const folderId = localStorage.getItem("folderId");

    const fetchFormByFolderId = async () => {
      try {
        const result = await getFormByFolderId(folderId);
        console.log("result from getFormByFolderId: ", result);
        setshowFormData(result);
      } catch (error) {
        console.log("Error fetching form data: ", error);
      }
    };
    fetchFormByFolderId();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const clickSetting = () => {
    navigate("/setting");
  };

  const openSavedResponse = (formId) => {
    localStorage.setItem("shareFolderId", formId);
    navigate(`/savedResponse/${formId}`);
  };

  const clickBot = () => {
    navigate("/workspace");
  };

  const clicklogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const [filteredForms, setFilteredForms] = useState([]);

  useEffect(() => {
    const folderId = localStorage.getItem("folderId");

    if (folderId && showFormData) {
      const filtered = showFormData.filter(
        (form) => form.folderId === folderId
      );
      setFilteredForms(filtered);
    }
  }, [showFormData]);

  const handleFormDelete = (formId) => {
    setisFormDeletePopupVisible(true);

    localStorage.setItem("formId", formId);
  };

  const handleFormDeleteConfirms = async () => {
    const formId = localStorage.getItem("formId");

    const deleteFormById = async (formId) => {
      try {
        const result = await deleteForm(formId);
        console.log("form deleted successfully ", result);
      } catch (error) {
        console.log("Error deleting form: ", error);
      }
    };

    const result = await deleteFormById(formId);

    console.log(result);

    setisFormDeletePopupVisible(false);

    window.location.reload();

    // un comment below line once development completes
    // localStorage.removeItem("formId");
  };

  return (
    <div className={styles.fullPage}>
      <div className={styles.upper}>
        <div className={styles.header}>
          <span
            className={`${styles.welcome} ${
              isDropdownVisible ? styles.welcomeActive : ""
            }`}
            onClick={toggleDropdown}
          >
            {username}'s workspace
            <img
              style={{ marginLeft: "12px", marginRight: "5px" }}
              src={downarrow}
              alt="Dropdown Arrow"
            />
          </span>
          {isDropdownVisible && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem1} onClick={clickSetting}>
                Settings
              </div>
              <hr></hr>
              <div className={styles.dropdownItem2} onClick={clicklogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.form} onClick={clickBot}>
          <img className={styles.formPlus} src={plus} alt="Plus Icon" />
          <div className={styles.formPara}>Create a typebot</div>
        </div>
        {filteredForms && filteredForms.length > 0 ? (
          <div className={styles.formdiv1}>
            {filteredForms.map((form, index) => (
              <>
                <div
                  key={index}
                  className={styles.formdiv2}
                  onClick={() => openSavedResponse(form._id)}
                >
                  {form.name}
                  {localStorage.setItem("formId", form._id)}
                </div>
                <div>
                  <img
                    src={delete1}
                    className={styles.delteIcon2}
                    onClick={() => {
                      handleFormDelete(form._id);
                    }}
                  ></img>
                </div>
              </>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>

      {isFormDeletePopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.h3}>
              Are you sure you want to delete this Form?
            </div>
            <div className={styles.popupActions}>
              <button
                className={styles.saveButton}
                onClick={handleFormDeleteConfirms}
              >
                Delete
              </button>
              <hr style={{ border: "1px solid #47474A" }}></hr>
              <button
                onClick={closeDeletePopup}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer></ToastContainer>
    </div>
  );
}
