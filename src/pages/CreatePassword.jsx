import { useRef, useState } from "react";
import SignedOutNavbar from "../Components/SignedOutNavbar";

const CreatePassword = () => {
  const [formError, setFormError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const passwordRef = useRef();
  const confirm_passwordRef = useRef();

  return (
    <>
      <SignedOutNavbar firstname="Herve" />
      <div className="px-3 lg:px-5 lg:pl-3 space-y-3 mt-28 mx-auto w-[90%] sm:w-[80%] md:w-[60%] xl:w-[40%] lg:ml-[10%]">
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
            Create a new password{" "}
          </h2>
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
              value={"h.buterak@gmail.com"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:p-2.5"
              disabled
            ></input>
          </label>
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
          <button
            type="submit"
            className="text-white bg-darkBrown disabled:bg-disabledBrown hover:bg-darkBrownHover focus:ring-4 focus:outline-none font-semibold rounded-lg text-base px-5 py-2 sm:py-3 text-center "
            disabled={btnLoading}
          >
            {btnLoading ? "Creating new password" : "Create password"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePassword;
