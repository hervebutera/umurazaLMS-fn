import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import API_URL from "../environments";
import { setUserState } from "../redux/userSlice";

const Login = () => {
    const [formError, setFormError] = useState(""); 
    const [btnLoading, setBtnLoading] = useState(false)

    const navigate = useNavigate()
    const Dispatch = useDispatch()

    const emailRef = useRef()
    const passwordRef = useRef()


    const submitLoginInfo = (e) => {
        e.preventDefault()
        if (passwordRef.current.value.trim().length === 0) {
            setFormError("A password cannot be an empty string")
            return;
        }

        setBtnLoading(true)

        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axios({
            url: `${API_URL}/user/login`,
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              data: userData,
        }).then((result) => { 
          setBtnLoading(false) 
          
          Dispatch(setUserState({
              id: result.data.user.id,
              username: result.data.user.username,
              firstname: result.data.user.firstname,
              lastname: result.data.user.lastname,
              profileImageUrl: result.data.user.profileImageUrl,
              userrole: result.data.user.userrole,
          }))
          localStorage.setItem('rcv_token', result.data.token)
          navigate("/", { replace: true })  
          }).catch(err => { 
  
            const error = { 
              statusCode: err.response.status,
              message: err.response.data.message,
            }
    
            if (error.statusCode === 422 ||
              error.statusCode === 401 ||
              error.statusCode === 404) {
              setFormError(error.message)
            } else { 
              setFormError("Unable to sign you in! Try again later.")
            }
            setBtnLoading(false)
          })

    }


    return (
        <div className="h-screen">
            <div className="login-intro hidden h-full lg:relative align-top lg:inline-block lg:border-r-2 border-slate-50 w-1/2" >
                <div className="flex flex-col w-[80%] 2xl:w-[60%] mx-auto mt-[38%] 2xl:mt-[33%] gap-24">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold">Rwanda Cultural</h1>
                            <div className="flex flex-row gap-1 items-center">
                                <h1 className="text-2xl font-bold">Village</h1>
                                <h2 className="bg-darkBrown text-xs py-1 px-1.5 rounded-md text-white">
                                    LMS
                                </h2>
                            </div>
                        </div>
                        <h3 className="text-base font-medium">Learners Management System</h3>
                    </div>
                    <h4 className="text-3xl font-bold text-darkBrown">No paperwork delays - log in and register for your preferred class.</h4>
                </div>
            </div>
            <div className="bg-white block w-full  lg:inline-block lg:w-1/2 h-full align-top">
                <div className="flex flex-col gap-7 mt-[30%] sm:mt-[15%] lg:mt-[10%] lg:gap-28">
                    <div className="flex flex-col lg:hidden md:gap-1">
                        <div className="flex flex-col mx-auto">
                            <h1 className="text-base sm:text-xl font-bold">Rwanda Cultural</h1>
                            <div className="flex flex-row gap-1 items-center">
                                <h1 className="text-base sm:text-xl font-bold text-center">Village</h1>
                                <h2 className="bg-darkBrown text-xs py-1 px-1.5 rounded-md text-white">
                                    LMS
                                </h2>
                            </div>
                        </div>
                        <h3 className="text-xs sm:text-sm font-medium  mx-auto">Learners Management System</h3>
                    </div>
                    <h2 className="mx-auto text-base lg:mx-0 lg:mr-[10%] lg:text-right font-medium">New <span className="lg:hidden">here</span><span className="hidden lg:inline-block">to Rwanda Cultural Village</span>?
                        <Link
                            to={"/signup"}
                            className="text-darkBrown hover:underline cursor-pointer ml-1"
                        >
                            Create an account
                        </Link>
                    </h2>
                    <form className="flex flex-col w-[90%] md:w-[60%] mx-auto gap-5 sm:gap-7">
                        <div className="flex flex-col gap-1 md:gap-2">
                            {formError && (
                                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium">Error!</span> {formError}
                                </div>
                            )}
                            <h2 className="text-lg sm:text-xl text-center md:text-2xl lg:text-left font-bold">Log In</h2>
                            <h3 className="text-xs sm:text-base text-greyTextColor">Enter your email address and password to log in to the Learners Management System</h3>
                        </div>
                        <label htmlFor="email-input" className="flex flex-col text-base font-medium text-gray-900 gap-1">
                            <p className="">Email</p>
                            <input type="email" id="email-input" ref={emailRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:p-2.5" required></input>
                        </label>
                        <label htmlFor="password-input" className="flex flex-col text-base font-medium text-gray-900 gap-1">
                            <p className="">Password</p>
                            <input type="password" id="password-input" ref={passwordRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:p-2.5" required></input>
                            {/* <Link
                                to={"/request-password-reset"}
                                className="text-blue-600 text-right hover:underline cursor-pointer ml-1"
                            >
                                Forgot password?
                            </Link> */}
                        </label>
                        <button type="submit" className="text-white bg-darkBrown disabled:bg-disabledBrown hover:bg-darkBrownHover focus:ring-4 focus:outline-none font-semibold rounded-lg text-base px-5 py-2 sm:py-3 text-center "
                            disabled={btnLoading}
                            onClick={submitLoginInfo}
                        >
                          {btnLoading ? "Logging In": "Log In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
