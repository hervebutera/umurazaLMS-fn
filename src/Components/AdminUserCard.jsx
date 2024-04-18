import axios from "axios";
import { useState } from "react";
import API_URL from "../environments";
import { useNavigate } from "react-router-dom";


const AdminUserCard = (props) => {
    const [showRoleInputs, setShowRoleInputs] = useState(false)
    const [showActivateActions, setShowActivateActions] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    
    const navigate = useNavigate();


    const changeUserRole = () => {
        setBtnLoading(true)
        axios({
            url: `${API_URL}/user/changerole/${props.userData.id}`,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("rcv_token")}`
            }
          }).then(res => {
              props.setPageErrorMessage("")
              props.setSuccessMessage("User role changed successfully!")
              setInterval(() => {
                 props.setSuccessMessage("") 
              }, 5000);
              setBtnLoading(false)
          }).catch(error => {
            setBtnLoading(false)
              
            if (error.response) {
                if (error.response.data.message === "jwt expired, Please login again") {
                    navigate("/login")
                } else {
                    props.setPageErrorMessage(error.response.data.message)
                    console.log(error.response.data.message);   
                }
            } else {
                props.setPageErrorMessage("Unable to change user role. Try again later.")
                console.log(error.response.data.message); 
            }
        })
    }

    const changeActiveStatus = () => {
        setBtnLoading(false)
        axios({
            url: `${API_URL}/user/changeactivestatus/${props.userData.id}`,
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("rcv_token")}`
            }
          }).then(res => {
              props.setPageErrorMessage("")
              props.setSuccessMessage("The password has been changed successfully!")
              setInterval(() => {
                 props.setSuccessMessage("") 
              }, 5000);
              setBtnLoading(false)
          }).catch(error => {
              setBtnLoading(false)
              
                if (error.response) {
                    if (error.response.data.message === "jwt expired, Please login again") {
                        navigate("/login")
                    } else {
                        props.setPageErrorMessage(error.response.data.message)
                        console.log(error.response.data.message);   
                    }
                } else {
                    props.setPageErrorMessage("Unable to change user active status. Try again later.")
                    console.log(error.response.data.message); 
                }
          })
    }

    return (
        <div id="toast-message-cta" className="w-full max-w-xs sm:max-w-[350px] p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
            <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex flex-row items-center gap-5">
                    <img className="w-12 h-12 sm:w-14 sm:h-14 rounded-full" src={props.userData.profileimageurl} alt="Jese Leos image" />
                    {(props.userData.isActivated === "false") && (
                        <span className="inline-flex sm:hidden items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full ">
                        <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                            Deactivated
                        </span>
                    )}
                </div>
                
                <div className="flex flex-col sm:ms-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{`${props.userData.firstname} ${props.userData.lastname}`}</span>
                    <div className="mb-2">                        
                        <p className="text-sm font-normal">Email:{" "}<span className="text-black">{props.userData.email}</span></p> 
                        <p className="text-sm font-normal">Username:{" "}<span className="text-black">{props.userData.username}</span></p>
                        
                        {(props.userData.isActivated === "false") && (
                            <span className="hidden sm:inline-flex mb-1 w-24 items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full ">
                            <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                Deactivated
                            </span>
                        )}
                    </div>

                    <div className="flex flex-row gap-1 items-center">
                        {(showRoleInputs === false) && (showActivateActions === false) && (
                            <>
                                <button
                                    onClick={() => setShowRoleInputs(true)}
                                    className="inline-flex px-4 py-1 text-sm font-medium text-white bg-darkBrown rounded-lg hover:bg-veryDarkBrown outline-none ">
                                    Change role
                                </button>
                                <button
                                    onClick={() => setShowActivateActions(true)}
                                    className="py-1 px-4 ms-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:z-10 outline-none">
                                    {props.userData.isActivated === "true" ? "Deactivate": "Activate"}
                                </button>
                            </>
                        )}
                        {(showRoleInputs === true) && (
                            <>
                                <button
                                    onClick={changeUserRole}
                                    className="inline-flex px-4 py-1 text-sm font-medium text-white bg-darkBrown rounded-lg disabled:bg-disabledBrown hover:bg-veryDarkBrown outline-none "
                                    disabled={btnLoading}
                                >
                                    {(btnLoading === false) && (props.userData.userrole === "admin") ? "Change to user" : "Change to Admin"}
                                    {btnLoading && "Changing role"}
                                </button>
                                <button
                                    onClick={() => setShowRoleInputs(false)}
                                    className="py-1 px-4 ms-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:z-10 outline-none"
                                    disabled={btnLoading}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                        {(showActivateActions === true) && (
                            <>
                                <button
                                    onClick={changeActiveStatus}
                                    className={`inline-flex px-4 py-1 text-sm font-medium border-2 ${(props.userData.isActivated === "true") ? "text-red-800 border-red-400 bg-red-100 disabled:bg-red-200 hover:bg-red-200 " : "text-green-800 border-green-400 disabled:bg-green-200 bg-green-100 hover:bg-green-200 "}  rounded-lg  outline-none `}
                                    disabled={btnLoading}
                                >
                                    
                                    {props.userData.isActivated === "true" ? "Yes, Deactivate" : "Yes, Activate"}
                                    {btnLoading && (props.userData.isActivated === "true" ? "Deactivating...": "Activating...")}
                                </button>
                                <button
                                    onClick={() => setShowActivateActions(false)}
                                    className="py-1 px-4 ms-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:z-10 outline-none"
                                    disabled={btnLoading}
                                >
                                    
                                    No, Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUserCard;
