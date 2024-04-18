import AdminUserCard from "../Components/AdminUserCard";
import CentralView from "../Layouts/centralView";
import { useEffect, useState, useRef } from "react";
import API_URL from "../environments";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";

const ManageAdmins = () => {
    const [showSearchDrop, setShowSearchDrop] = useState(false);
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [listErrorMessage, setListErrorMessage] = useState("")
    const [pageErrorMessage, setPageErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [listTitle, setListTitle] = useState("Admin users");

    const navigate = useNavigate();

    const searchRef = useRef();

    const submitSearchByUsername = () => {
        console.log(searchRef.current.value);
        setShowSearchDrop(false)
        axios({
            url: `${API_URL}/user/search`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("rcv_token")}`
            },
            data: {
                username: searchRef.current.value,
                email: ""
            }
        }).then(res => {
            setListTitle("Search results ...")  
            setPageErrorMessage("")
            setUsers([...[], res.data]);
            setLoading(false)
          }).catch(error => {
            setLoading(false)
            if (error.response) {
              if (error.response.data.message === "jwt expired, Please login again") {
                  navigate("/login")
              } else {
                setPageErrorMessage(error.response.data.message)
                console.log(error.response.data.message);   
              }
            } else {
              setPageErrorMessage("Unable to get the user searched. Try again later.")
              console.log(error.response);
            }
          })
    }
    const submitSearchByEmail = () => {
        setShowSearchDrop(false)
        axios({
            url: `${API_URL}/user/search`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("rcv_token")}`
            },
            data: {
                username: "",
                email: searchRef.current.value
            }
        }).then(res => {
            setListTitle("Search results ...")  
            setPageErrorMessage("")
            setUsers(res.data);
            setLoading(false)
          }).catch(error => {
            setLoading(false)
            if (error.response) {
              if (error.response.data.message === "jwt expired, Please login again") {
                  navigate("/login")
              } else {
                setPageErrorMessage(error.response.data.message)
                console.log(error.response.data.message);   
              }
            } else {
              setPageErrorMessage("Unable to get the user searched. Try again later.")
              console.log(error.response);
            }
          })
    }

    useEffect(() => {
        axios({
            url: `${API_URL}/user/admins`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("rcv_token")}`
            }
        }).then(res => {
            setListTitle("Admin users")   
            setListErrorMessage("")
            setUsers(res.data);
            setLoading(false)
          }).catch(error => {
            setLoading(false)
            if (error.response) {
              if (error.response.data.message === "jwt expired, Please login again") {
                  navigate("/login")
              } else {
                setListErrorMessage(error.response.data.message)
                console.log(error.response.data.message);   
              }
            } else {
              setListErrorMessage("Unable to get admins' info. Please try again later.")
              console.log(error.response);
            }
          })
    }, [])

  return (
    <CentralView title="Manage Admin Users">
      <div className="relative text-center w-full sm:w-96 mt-7 sm:mt-10 mx-auto">
        {pageErrorMessage && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                {pageErrorMessage}
            </div>
         )}
         {successMessage && (
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
                {successMessage}
            </div>
         )}
        <form className="flex flex-row gap-1 ">
          <input
            type="text"
            id="search-input"
            ref={searchRef}
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg block w-full sm:p-2.5 "
            placeholder="Search username or user email"
          />
          <button
            type="button"
            className="inline-flex items-center py-2 sm:py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 outline-none "
            onClick={() => setShowSearchDrop(!showSearchDrop)}
          >
            Search
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
        </form>
        <div
          id="search-dropdown"
          className={`${showSearchDrop ? "absolute right-0 top-[50px] z-10": "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-30`}
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdown-button"
          >
            <li onClick={submitSearchByUsername}>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
              >
                By username
              </button>
            </li>
            <li onClick={submitSearchByEmail}>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
              >
                By email
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <h1 className="text-lg sm:text-xl font-bold">{listTitle}</h1>
        <div className="flex flex-col py-2 gap-6 sm:flex-row sm:flex-wrap sm:gap-8">
            {loading && <div className="ml-[45%] mt-[40%] sm:mt-[20%]"><Spinner /></div>}
            {listErrorMessage && users.length === 0 && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {listErrorMessage}
                </div>
            )}
            {(loading === false) && users.map((user, index) => {
                return <AdminUserCard
                    key={index}
                    userData={user}
                    setPageErrorMessage={setPageErrorMessage}
                    setSuccessMessage={setSuccessMessage} />
            })}
        </div>
      </div>
    </CentralView>
  );
};

export default ManageAdmins;
