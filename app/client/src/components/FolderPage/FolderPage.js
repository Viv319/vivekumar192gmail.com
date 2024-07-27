import React, { useState, useEffect } from "react";
import styles from "./FolderPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import plus from "../../assets/images/plus.png";
import downarrow from "../../assets/images/downarrow.png";
import { createFolder, getFolderByUserId } from "../../api/folder.js";
import { getFormByUserId } from "../../api/popup.js";
import { useNavigate } from "react-router-dom";
import { getFormByFolderId } from "../../api/popup.js";
import delete1 from "../../assets/images/delete1.png";
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

  const navigate = useNavigate();

  // const userId = localStorage.getItem("userId");
  // const usernameId = userId ? userId.replace(/"/g, "") : "";

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

    //   const fetchFormByUserId = async () => {
    //     try {
    //       const result = await getFormByUserId(usernameId);
    //       console.log("result from getFormByUserId: ", result);
    //       setshowFormData(result);
    //     } catch (error) {
    //       console.log("Error fetching form data: ", error);
    //     }
    //   };
    //   fetchFormByUserId();

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

  // const notify = () => {
  //   toast.success("Login successful", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  // };

  // const tickeCreate = () => {
  //   toast.success("Ticket Created Successfully", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  // };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const clickSetting = () => {
    navigate("/setting");
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setFolderName("");
  };

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // const handleSave = async () => {
  //   if (formData.name.trim().length !== 0) {
  //     const result = await createFolder(formData);
  //     if (result) {
  //       toast.success("Folder created successfully", {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       closePopup();
  //       setFormData({ name: "" });
  //       // setFolderDetails((prevDetails) => [...prevDetails, result]);
  //     }
  //   } else {
  //     toast.error("Folder name cannot be empty", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // };

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
        // setshowFormData((prevDetails) =>
        //   prevDetails.filter((item) => item._id!== folderId)
        // );
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
                <div key={index} className={styles.formdiv2}>
                  {form.name}
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
        {/* {filteredForms && filteredForms.length > 0 ? (
          <div className={styles.formdiv1}>
            {filteredForms
              .filter((form) => form.folderId === folderId) // Filter items where folderId is null
              .map((form, index) => (
                <div key={index} className={styles.formdiv2}>
                  {form.name}
                  <img
                    src={delete1}
                    className={styles.delteIcon2}
                    onClick={() => {
                      handleFormDelete(form._id);
                    }}
                  ></img>
                </div>
              ))}
          </div>
        ) : (
          <></>
        )} */}
      </div>
      {/* {isPopupVisible && (
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
      )} */}
      {isFormDeletePopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            {/* <h2 className={styles.h2}>Delete Folder</h2> */}
            <div className={styles.h3}>
              Are you sure you want to delete this Form?
            </div>
            <div className={styles.popupActions}>
              <button
                // onClick={handleDeleteFolder}
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
