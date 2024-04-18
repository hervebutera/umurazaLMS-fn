import { Link } from "react-router-dom";

const CourseCard = (props) => { 
    return (
        <div className=" inline-block pb-4 w-full sm:max-w-xs bg-white border border-gray-200 rounded-lg shadow ">
            <img
              className="p-3 rounded-t-2xl"
              src={props.data.course_imageUrl}
              alt="course image"
            />
          <div className="flex flex-col gap-2 px-3 sm:px-5 ">
              <h5 className="text-lg font-semibold  text-gray-900 ">
                {props.data.title}
              </h5>
            <div className="flex items-center justify-between">
              <span className="text-blue-800 text-base">{props.data.learning_mode}</span>
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-1 rounded ">
                {(props.data.min_eligible_age > 0) ? `${props.data.min_eligible_age} `: "" }
                {(props.data.max_eligible_age > 0) ? `- ${props.data.max_eligible_age} `: "+ " }
                years
              </span>
            </div>
            <span className="text-3xl font-bold text-gray-900 ">${props.data.priceInUSD}<span className="text-base ml-1">/{props.data.repayment_interval}</span></span>
            <div className="flex items-center ">
                <Link 
                    to={props.ctaBtn_Link}
                    className="text-white w-full bg-darkBrown hover:bg-veryDarkBrown  focus:outline-none font-semibold rounded-lg text-base px-5 py-2.5 text-center "
                >
                    {props.ctaBtn_value}
                </Link>
            </div>
          </div>
        </div>
    )
}

export default CourseCard;
