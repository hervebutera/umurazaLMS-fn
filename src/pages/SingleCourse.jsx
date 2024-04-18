import { useEffect } from "react";
import CourseDetails from "../Components/CourseDetails";
import CentralView from "../Layouts/centralView";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API_URL from "../environments";
import Spinner from "../Components/Spinner";

const SingleCourse = () => {
    const [courseInfo, setCourseInfo] = useState({});
    const [loading, setLoading] = useState(true)
    const [courseTitle, setCourseTitle] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()
    
  useEffect(() => {
    axios({
      url: `${API_URL}/course/${id}`,
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("rcv_token")}`
      }
    }).then(res => {
        setErrorMessage("")
        setCourseTitle(res.data.title)
        setCourseInfo(res.data);
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
            setErrorMessage("Unable to get class details. Please try again later.")
            console.log(error.message);
        }
    })
  }, [])



    return (
        <CentralView title={loading === false ? courseTitle : "Loading course details ..."}>
            
            {(loading === false) && (Object.keys(courseInfo).length > 0) && <CourseDetails
                data={courseInfo}
                ctaBtn_value="Proceed to checkout"
                ctaBtn_Link={`/class/${courseInfo.id}`}
            />}
            {loading && <div className="ml-[45%] mt-[40%] sm:mt-[20%]"><Spinner /></div>}
            
            {errorMessage && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Error!</span> {errorMessage}
                </div>
            )} 
            
        </CentralView>
    )
}

export default SingleCourse;


