import { useRef, useState } from "react";
import SignedOutNavbar from "../Components/SignedOutNavbar.jsx";

const RequestPasswordReset = () => {
  const [formError, setFormError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const emailRef = useRef();

  return (
    <>
      <SignedOutNavbar />
      <div className="px-3 lg:px-5 lg:pl-3 space-y-5 mt-28 mx-auto sm:w-[80%] lg:w-[500px] lg:ml-[10%]">
        <div className="flex flex-col gap-1 md:gap-2">
          {formError && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error!</span> {formError}
            </div>
          )}
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-left font-bold">
            Requesting to reset your password{" "}
          </h2>
          <h3 className="text-xs sm:text-base text-greyTextColor">
            Enter your registered email address and a link to create your new
            password will be sent.
          </h3>
        </div>
        <div className="flex flex-col gap-5">
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
            ></input>
          </label>
          <button
            type="submit"
            className="text-white bg-darkBrown disabled:bg-disabledBrown hover:bg-darkBrownHover focus:ring-4 focus:outline-none font-semibold rounded-lg text-base px-5 py-2 sm:py-3 text-center "
            disabled={btnLoading}
          >
            {btnLoading ? "Sending request" : "Send request"}
          </button>
        </div>
      </div>
    </>
  );
};

export default RequestPasswordReset;
