import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import API_URL from "../environments";
import { setUserState } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [formError, setFormError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const birthdateRef = useRef();
  const passwordRef = useRef();
  const confirm_passwordRef = useRef();

  const submitSignupInfo = (e) => {
    e.preventDefault();
    if (firstnameRef.current.value.trim().length === 0) {
      setFormError("First Name is required");
      return;
    }
    if (lastnameRef.current.value.trim().length === 0) {
      setFormError("Last Name is required");
      return;
    }
    if (phoneRef.current.value.trim().length === 0) {
      setFormError("Phone Number is required");
      return;
    }
    if (passwordRef.current.value !== confirm_passwordRef.current.value) {
      setFormError("New password and confirm password fields don't match");
      return;
    }

    setBtnLoading(true);

    const userData = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
      birthdate: birthdateRef.current.value,
    };

    axios({
      url: `${API_URL}/user/signup`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: userData,
    })
      .then((result) => {
        setBtnLoading(false);

        Dispatch(
          setUserState({
            id: result.data.user.id,
            username: result.data.user.username,
            firstname: result.data.user.firstname,
            lastname: result.data.user.lastname,
            profileImageUrl: result.data.user.profileImageUrl,
            userrole: result.data.user.userrole,
          })
        );
        localStorage.setItem("rcv_token", result.data.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        if (err.response) {
          const error = {
            statusCode: err.response.status,
            message: err.response.data.message,
          };
  
          if (
            error.statusCode === 422 ||
            error.statusCode === 409 ||
            error.statusCode === 401
          ) {
            setFormError(error.message);
          } else {
            setFormError("Unable to create an account! Try again later.");
          }
        } else {
            setFormError("Unable to create an account! Try again later.")
            console.log(err.message);
        }        
        setBtnLoading(false);
      });
  };

  return (
    <div className="h-screen">
      <div className="login-intro hidden h-full lg:relative align-top lg:inline-block lg:border-r-2 border-slate-50 w-1/2">
        <div className="flex flex-col w-[80%] 2xl:w-[80%] mx-auto mt-[20%]  gap-16">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Umuraza Rwanda Cultural</h1>
              <div className="flex flex-row gap-1 items-center">
                  <h1 className="text-2xl font-bold">Village</h1>
                  <h2 className="bg-darkBrown text-xs py-1 px-1.5 rounded-md text-white">
                    LMS
                  </h2>
              </div>
            </div>
            <h3 className="text-base font-medium">
              Learners Management System
            </h3>
          </div>

          <h4 className="text-xl font-bold text-darkBrown">
            A paperwork-free registration.
          </h4>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">How it works:</h3>
            <ol className="list-decimal ml-5 space-y-2">
              <li className="text-base ">
                Fill in information and create an account
              </li>
              <li className="text-base ">
                When logged in, explore in-person classes available
              </li>
              <li className="text-base ">
                Choose your preferred class, and proceed to checkout.
              </li>
              <li className="text-base ">
                At the start of classes, your unique <strong>username</strong>{" "}
                will be requested for registration verification.
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="bg-white block w-full lg:inline-block lg:w-1/2 h-full align-top">
        <div className="flex flex-col gap-7 mt-[30%] pb-8 sm:mt-[15%] lg:mt-[10%] lg:gap-12">
          <div className="flex flex-col lg:hidden md:gap-1">
            <div className="flex flex-col mx-auto">
              <h1 className="text-base sm:text-xl font-bold">
                Umuraza Rwanda Cultural
              </h1>
              <div className="flex flex-row gap-1 items-center">
                <h1 className="text-base sm:text-xl font-bold text-center">Village</h1>
                <h2 className="bg-darkBrown text-xs py-1 px-1.5 rounded-md text-white">
                  LMS
                </h2>
              </div>
            </div>
            <h3 className="text-xs sm:text-sm font-medium  mx-auto">
              Learners Management System
            </h3>
          </div>
          <h2 className="mx-auto text-base lg:mx-0 lg:mr-[10%] lg:text-right font-medium">
            You already signed up?{" "}
            <Link
              to={"/login"}
              className="text-darkBrown hover:underline cursor-pointer ml-1"
            >
              Log In
            </Link>
          </h2>
          <form className="flex flex-col w-[90%] md:w-[80%] mx-auto gap-5 sm:gap-7">
            <div className="flex flex-col gap-1 md:gap-2">
              {formError && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">Error!</span> {formError}
                </div>
              )}
              <h2 className="text-lg sm:text-xl text-center md:text-2xl lg:text-left font-bold">
                Create an account
              </h2>
              <h3 className="text-xs sm:text-base text-greyTextColor">
                Enter your information to create an account in the Learners
                Management System
              </h3>
            </div>
            <div className="flex flex-col gap-5 sm:flex-row ">
              <label
                htmlFor="firstname-input"
                className="flex flex-col text-base font-medium text-gray-900 gap-1 w-full"
              >
                <p className="">First Name</p>
                <input
                  type="text"
                  id="firstname-input"
                  ref={firstnameRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:p-2.5"
                  required
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
                  ref={lastnameRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:p-2.5"
                  required
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
                ref={emailRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:p-2.5"
                required
              ></input>
            </label>
            <div className="flex flex-col sm:flex-row gap-5 ">
              <label
                htmlFor="phone-input"
                className="flex flex-col text-base font-medium text-gray-900 gap-1 w-full"
              >
                <p className="">Phone Number</p>
                <input
                  type="tel"
                  id="phone-input"
                  ref={phoneRef}
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  placeholder="123-456-7890"
                  required
                />
              </label>
              <label
                htmlFor="lastname-input"
                className="flex flex-col text-base font-medium text-gray-900 gap-1 w-full"
              >
                <p className="">Date of Birth</p>
                <input
                  type="date"
                  ref={birthdateRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg cursor-pointer block w-full p-2.5 "
                  placeholder="Select date"
                />
              </label>
            </div>
            <div className="flex flex-col gap-5 sm:flex-row ">
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
            <button
              type="submit"
              onClick={submitSignupInfo}
              className="text-white bg-darkBrown disabled:bg-disabledBrown hover:bg-darkBrownHover focus:ring-4 focus:outline-none font-semibold rounded-lg text-base px-5 py-2 sm:py-3 text-center "
              disabled={btnLoading}
            >
              {btnLoading ? "Creating account" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
