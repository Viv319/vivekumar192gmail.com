import React, { useState, useEffect } from "react";
import styles from "./SavedResponse.module.css";
import { useNavigate } from "react-router-dom";
import close from "../../assets/images/close.png";
import { getSahredFormResponse } from "../../api/share";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SavedResponse() {
  const navigate = useNavigate();

  const [shareData, setShareData] = useState([]);

  const clickCross = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    // getSahredFormResponse
    console.log("this is use effect");

    const fetchShareResponse = async () => {
      try {
        const result = await getSahredFormResponse();
        setShareData(result);
        console.log("result from getSahredFormResponse: ", result);
      } catch (error) {
        console.log("Error fetching share data: ", error);
      }
    };
    fetchShareResponse();
  }, []);

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

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.formOption}>
          <div className={styles.selectedOption1}>Response</div>
        </div>

        <div className={styles.right}>
          <div className={styles.option3} onClick={clickCross}>
            <img src={close} alt="Close" />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        {shareData.length > 0 ? (
          <div className={styles.responseContainer}>
            <p className={styles.responseTitle}>Response:</p>
            <div className={styles.response}>
              {shareData.map((response, index) => (
                <div key={index} className={styles.responseItem}>
                  {response.inputText}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className={styles.p1}>No Response yet collected</p>
        )}
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
