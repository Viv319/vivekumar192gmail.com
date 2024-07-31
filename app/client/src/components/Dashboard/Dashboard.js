import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import folder from "../../assets/images/folder.png";
import plus from "../../assets/images/plus.png";
import downarrow from "../../assets/images/downarrow.png";
import { createFolder, getFolderByUserId } from "../../api/folder.js";
import { getFormByUserId } from "../../api/popup.js";
import { useNavigate } from "react-router-dom";
import delete1 from "../../assets/images/delete1.png";
import { deleteFolder } from "../../api/folder.js";
import { deleteForm } from "../../api/popup.js";

export default function Home() {
  const [username, setUsername] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderDetails, setFolderDetails] = useState([]);
  const [showFormData, setshowFormData] = useState([]);
  const [hasToastShown, setHasToastShown] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [isFormDeletePopupVisible, setisFormDeletePopupVisible] =
    useState(false);
  const [isFolderDeletePopupVisible, setIsFolderDeletePopupVisible] =
    useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const usernameId = userId ? userId.replace(/"/g, "") : "";
  const closeDeletePopup = () => {
    setisFormDeletePopupVisible(false);
    setIsFolderDeletePopupVisible(false);
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem("name");
    if (storedUsername) {
      const username = storedUsername ? storedUsername.replace(/"/g, "") : "";
      setUsername(username);
    }

    const toastShown = localStorage.getItem("hasToastShown");
    if (!toastShown) {
      notify();
      setHasToastShown(true);
      localStorage.setItem("hasToastShown", "true");
    }

    const fetchFolderByUserId = async () => {
      try {
        const result = await getFolderByUserId(usernameId);
        setFolderDetails(result);
      } catch (error) {
        console.error("Error fetching folder details:", error);
      }
    };

    const fetchFormByUserId = async () => {
      try {
        const result = await getFormByUserId(usernameId);
        console.log("result from getFormByUserId: ", result);
        setshowFormData(result);
      } catch (error) {
        console.log("Error fetching form data: ", error);
      }
    };
    fetchFormByUserId();
    fetchFolderByUserId();
  }, []);

  const notify = () => {
    toast.success("Login successful", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const clickSetting = () => {
    navigate("/setting");
  };

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setFolderName("");
  };

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSave = async () => {
    if (formData.name.trim().length !== 0) {
      const result = await createFolder(formData);
      if (result) {
        toast.success("Folder created successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        closePopup();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        setFormData({ name: "" });
        // setFolderDetails((prevDetails) => [...prevDetails, result]);
      }
    } else {
      toast.error("Folder name cannot be empty", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const clickBot = () => {
    localStorage.removeItem("folderId");
    navigate("/workspace");
  };

  const clicklogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const clickFolder = (folderId) => {
    localStorage.setItem("folderId", folderId);
    navigate("/dashboard/folder");
  };
  const handleFolderDelete = (folId) => {
    console.log(folId);
    localStorage.setItem("folderId", folId);
    setIsFolderDeletePopupVisible(true);
  };

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
  };
  const handleFolderDeleteConfirms = async () => {
    const folderId = localStorage.getItem("folderId");

    const deleteFolderById = async (folderId) => {
      try {
        const result = await deleteFolder(folderId);
        console.log("folder deleted successfully", result);
      } catch (error) {
        console.log("Error deleting folder: ", error);
      }
    };

    const result = await deleteFolderById(folderId);
    console.log(" result after deleting folder ", result);
    localStorage.removeItem("folderId");
    setIsFolderDeletePopupVisible(false);

    window.location.reload();
  };

  const openSavedResponse = () => {
    navigate("/savedResponse");
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
        <div className={styles.container}>
          <div className={styles.folder} onClick={openPopup}>
            <img
              src={folder}
              style={{ marginRight: "8px" }}
              alt="Folder Icon"
            />
            Create a folder
          </div>
          {folderDetails ? (
            <div className={styles.folders}>
              {folderDetails.map((folder, index) => (
                <>
                  <div
                    key={index}
                    className={styles.folderItem}
                    onClick={() => clickFolder(folder._id)}
                  >
                    {folder.name}
                  </div>
                  <img
                    src={delete1}
                    className={styles.delteIcon}
                    onClick={() => {
                      handleFolderDelete(folder._id);
                    }}
                  ></img>
                </>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.form} onClick={clickBot}>
          <img className={styles.formPlus} src={plus} alt="Plus Icon" />
          <div className={styles.formPara}>Create a typebot</div>
        </div>
        {showFormData && showFormData.length > 0 ? (
          <div className={styles.formdiv1}>
            {showFormData
              .filter((form) => form.folderId === null)
              .map((form, index) => (
                <>
                  <div
                    key={index}
                    className={styles.formdiv2}
                    onClick={openSavedResponse}
                  >
                    {form.name}
                  </div>
                  <img
                    src={delete1}
                    className={styles.delteIcon2}
                    onClick={() => {
                      handleFormDelete(form._id);
                    }}
                  ></img>
                </>
              ))}
          </div>
        ) : (
          <></>
        )}

        {/* </div> */}
      </div>
      {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2 className={styles.h2}>Create New Folder</h2>
            <input
              type="name"
              name="name"
              onChange={handleFormChange}
              placeholder="Enter folder name"
              className={styles.input}
            />
            <div className={styles.popupActions}>
              <button onClick={handleSave} className={styles.saveButton}>
                Done
              </button>
              <hr style={{ border: "1px solid #47474A" }}></hr>
              <button onClick={closePopup} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
      {isFolderDeletePopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.h3}>
              Are you sure you want to delete this Folder?
            </div>
            <div className={styles.popupActions}>
              <button
                className={styles.saveButton}
                onClick={handleFolderDeleteConfirms}
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
