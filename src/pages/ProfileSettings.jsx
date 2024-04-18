import CentralView from "../Layouts/centralView";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_URL from "../environments";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";


const ProfileSettings = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPasswordInputs, setShowPasswordInputs] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [userProfileInfo, setUserProfileInfo] = useState({})

    const passwordRef = useRef()
    const confirm_passwordRef = useRef()

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)

        axios({
            url: `${API_URL}/user/myprofile`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("rcv_token")}`
            }
          }).then(res => {
              setErrorMessage("")
              setUserProfileInfo(res.data);
              setLoading(false)
          }).catch(error => {
              setLoading(false)
              if (error.response.data.message === "jwt expired, Please login again") {
                  navigate("/login")
              } else {
                setErrorMessage("Unable to get user information. Please try again later.")
                console.log(error.response.data.message);   
              }
          })
    }, [])

    const submitPassword = () => {
        if (passwordRef.current.value !== confirm_passwordRef.current.value) {
            setErrorMessage("New password does not match the confirm password value")
            return;
        }
        if (passwordRef.current.value.trim().length === 0) {
            setErrorMessage("A password cannot be made of spaces only!")
            return;
        }
        setBtnLoading(true)
        axios({
            url: `${API_URL}/user/update-password`,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJpZCI6MSwidXNlcm5hbWUiOiJoZXJ2ZTEiLCJ1c2Vycm9sZSI6InN1cGVyX2FkbWluIn0sImlhdCI6MTcxMjY3OTcxNCwiZXhwIjoxNzEyNzE1NzE0fQ.KqR8AhEkQgwinEx0_Qgiy2gO6vCcoioIBHzxA3DA2js`,
                
                // Authorization: `Bearer ${localStorage.getItem("rcv_token")}`
            },
            data: {
                password: passwordRef.current.value,
            }
          }).then(res => {
              setErrorMessage("")
              setSuccessMessage("The password has been changed successfully!")
              setInterval(() => {
                 setSuccessMessage("") 
              }, 5000);
              setBtnLoading(false)
              setShowPasswordInputs(false)
          }).catch(error => {
              setBtnLoading(false)
              if (error.response) {
                if (error.response.data.message === "jwt expired, Please login again") {
                    navigate("/login")
                } else {
                  setErrorMessage(error.response.data.message)
                  console.log(error.response.data.message);   
                }
              } else {
                setErrorMessage("Unable to display user information! Try again later.")
                console.log(error.message);
              }
          })
    }
    
    return (
        <CentralView title="My profile">
            {(loading === false) && (Object.keys(userProfileInfo).length > 0) && (
                <div className="py-3 sm:py-4 w-full md:w-[700px]">
                    {successMessage && (
                        <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                         {successMessage}
                      </div>
                    )}
                {errorMessage && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Error!</span> {errorMessage}
                    </div>
                )}     
                <div className="flex flex-col gap-7 md:flex-row md:gap-20  ">
                    <img className="w-24 h-24 md:w-28 md:h-28  rounded-full self-start" src={userProfileInfo.profileImageUrl} alt="Neil image" />
                    <div className="flex flex-col gap-5 sm:gap-7">
                        {(showPasswordInputs === false) && (
                            <>
                            <div className="flex flex-col gap-5 sm:flex-row sm:gap-7">
                            <label
                                htmlFor="firstname-input"
                                className="flex flex-col text-base font-medium text-gray-900 gap-1 w-full"
                            >
                                <p className="">First Name</p>
                                <input
                                type="text"
                                id="firstname-input"
                                value={userProfileInfo.firstname}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:p-2.5"
                                disabled={true}
                                ></input>
                            </label>
                            <label
                                htmlFor="lastname-input"
                                className="flex flex-col text-base font-medium text-gray-900 gap-1 w-full"
                            >
                                <p className="">Last Name</p>
                                <input
                                type="text"
                                id="lastname-input"
                                value={userProfileInfo.lastname}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:p-2.5"
                                disabled={true}
                                ></input>
                            </label>
                        </div>
                        <label
                            htmlFor="email-input"
                            className="flex flex-col text-base font-medium text-gray-900 gap-1"
                        >
                            <p className="">Email</p>
                            <input
                                type="email"
                                id="email-input"
                                value={userProfileInfo.email}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:p-2.5"
                                disabled={true}
                            ></input>
                            </label>
                            <div className="flex flex-col sm:flex-row gap-5 sm:gap-7">
                            <label
                                htmlFor="phone-input"
                                className="flex flex-col text-base font-medium text-gray-900 gap-1 w-full"
                            >
                                <p className="">Phone Number</p>
                                <input
                                type="tel"
                                id="phone-input"
                                value={userProfileInfo.phone}
                                aria-describedby="helper-text-explanation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                                placeholder="123-456-7890"
                                disabled={true}
                                />
                            </label>
                            <label
                                htmlFor="lastname-input"
                                className="flex flex-col text-base font-medium text-gray-900 gap-1 w-full"
                            >
                                <p className="">Date of Birth</p>
                                <input
                                type="date"
                                value={userProfileInfo.birthdate}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg cursor-pointer block w-full p-2.5 "
                                placeholder="Select date"
                                disabled={true}
                                />
                            </label>
                            </div>
                            </>
                        )}
                        {(showPasswordInputs === true) && (
                            <div className="flex flex-col gap-5 sm:flex-row sm:gap-7">
                            <label
                                htmlFor="password-input"
                                className="flex flex-col text-base font-medium text-gray-900 gap-1 w-full"
                            >
                                <p className="">New Password</p>
                                <input
                                type="password"
                                id="password-input"
                                ref={passwordRef}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:p-2.5"
                                required
                                ></input>
                            </label>
                            <label
                                htmlFor="confirm-password-input"
                                className="flex flex-col text-base font-medium text-gray-900 gap-1 w-full"
                            >
                                <p className="">Confirm Password</p>
                                <input
                                type="password"
                                id="confirm-password-input"
                                ref={confirm_passwordRef}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:p-2.5"
                                required
                                ></input>
                            </label>
                        </div>
                            )}
                        <button
                            type="button"
                            onClick={() => {setShowPasswordInputs(true)}}
                            className={`${(showPasswordInputs === true) && "hidden"} text-white bg-darkBrown disabled:bg-disabledBrown hover:bg-darkBrownHover focus:ring-4 focus:outline-none font-semibold rounded-lg text-base px-5 py-2 sm:py-3 text-center `}
                            >
                            {showPasswordInputs ? "" : "Change password"}
                        </button>
                        <div className={`${(showPasswordInputs === false) ? "hidden" : "flex flex-col sm:flex-row "} gap-2 sm:gap-5`}>
                            <button
                                type="submit"
                                onClick={submitPassword}
                                className="text-white w-full bg-darkBrown disabled:bg-disabledBrown hover:bg-darkBrownHover focus:ring-4 focus:outline-none font-semibold rounded-lg text-base px-5 py-2 sm:py-3 text-center "
                                disabled={btnLoading}
                                >
                                {btnLoading ? "Saving password" : "Save password"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {setShowPasswordInputs(false)}}
                                className="bg-gray-100  text-gray-900 border hover:bg-gray-200 w-full  outline-none font-semibold rounded-lg text-base px-5 py-2 sm:py-3 text-center "
                            >
                                {"Cancel"}
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
            )}
            {loading && <div className="ml-[45%] mt-[40%] sm:mt-[20%]"><Spinner /></div>}
            {errorMessage && (Object.keys(userProfileInfo).length === 0) && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Error!</span> {errorMessage}
                    </div>
                )} 
        </CentralView>
    )
}

export default ProfileSettings;
