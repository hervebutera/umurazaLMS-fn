import CentralView from "../Layouts/centralView";
import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "../Components/Spinner";
import API_URL from "../environments";
import CourseCard from "../Components/CourseCard";
import { useNavigate } from "react-router-dom";

const LearnersCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    axios({
      url: `${API_URL}/course`,
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("rcv_token")}`
      }
    }).then(res => {
      setErrorMessage("")
      setCourses(res.data);
      setLoading(false)
    }).catch(error => {
      setLoading(false)
      if (error.response) {
        if (error.response.data.message === "jwt expired, Please login again") {
            navigate("/login")
        } else {
          setErrorMessage(error.response.data.message)
          console.log(error.response.data.message);   
        }
      } else {
        setErrorMessage("Unable to get classes. Please try again later.")
        console.log(error.response);
      }
    })
  }, [])

  return (
    <CentralView title="All classes">
      <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-8">
        {((loading === false) && (courses.length > 0)) ? courses.map((course, index) => {
          return <CourseCard
            key={index}
            data={course}
            ctaBtn_value="Register"
            ctaBtn_Link={`/class/${course.id}`}
          />
        }) : ""}
        {loading && <div className="ml-[45%] mt-[40%] sm:mt-[20%]"><Spinner /></div>}
        {errorMessage && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Error!</span> {errorMessage}
            </div>
          )}
      </div>
    </CentralView>
  );
};

export default LearnersCourses;
