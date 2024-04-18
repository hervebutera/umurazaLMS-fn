const CourseDetails = (props) => {
  const expectations = JSON.parse(props.data.expectations);

  return (
    <div className="block space-y-8  sm:inline-block pb-4 w-full h-full  bg-white  ">
      <img
        className="pb-3  w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[500px] rounded-t-xl  lg:rounded-t-2xl object-cover "
        style={{ objectPosition: "25% 25%" }}
        src={props.data.course_imageUrl}
        alt="course image"
      />
      <div className="flex flex-col gap-2">
        <h5 className="text-xl md:text-2xl font-semibold  text-gray-900 ">
          {props.data.title}
        </h5>
        <div className="flex flex-col md:flex-row  md:justify-between">
          <span className="text-base">
            Instruction mode:
            <span className="text-blue-800"> {props.data.learning_mode}</span>
          </span>
          <span className="text-base">
            Eligible age:{" "}
            <span className="md:bg-blue-100 text-blue-800 text-base md:text-sm md:font-semibold px-2.5 py-1 rounded ">
              {props.data.min_eligible_age > 0
                ? `${props.data.min_eligible_age} `
                : ""}
              {props.data.max_eligible_age > 0
                ? `- ${props.data.max_eligible_age} `
                : "+ "}
              years
            </span>
          </span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <span className="text-base ">Cost: </span>
          <span className="text-3xl font-bold text-gray-900 ">
            ${props.data.priceInUSD}
          </span>
          <span className="text-base">/{props.data.repayment_interval}</span>
        </div>
        {props.data.age_eligibility && (
          <p class="mt-2 text-sm text-red-600">
            {`You are ${
              props.data.age_eligibility.charAt(0).toLowerCase() +
              props.data.age_eligibility.slice(1)
            }`}
          </p>
        )}

        <div className="flex items-center ">
          <button
            to={props.ctaBtn_Link}
            className="text-white w-full md:w-[50%] bg-darkBrown disabled:bg-disabledBrown disabled:cursor-not-allowed hover:bg-veryDarkBrown  focus:outline-none font-semibold rounded-lg text-base px-5 py-2.5 text-center "
            disabled={props.data.age_eligibility ? true : false}
          >
            {props.ctaBtn_value}
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-7 class-hero-text">
        <div className="flex flex-col gap-2">
          <h1 class="text-lg  font-bold text-gray-900 lg:text-xl">
            About the program
          </h1>
          <p class="text-sm xs:text-base text-gray-600 ">
            {props.data.description}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 class="text-lg font-bold text-gray-900 lg:text-xl">
            What to expect{" "}
          </h1>

          <ul class="w-full lg:w-[70%] space-y-4 text-gray-600 list-disc list-inside ">
            {Object.keys(expectations).map((expectationKey, index) => {
              return (
                <li key={index}>
                  <span className="text-gray-900 font-semibold">
                    {expectationKey}
                    {": "}
                    <br />
                  </span>
                  <p className="ml-5">{expectations[expectationKey]} </p>
                </li>
              );
            })}
          </ul>
          {props.data.more_included.length > 0 && (
            <div className="mt-8">
              <span className="text-gray-900 font-semibold">Included: </span>
              <p className="ml-5">{props.data.more_included} </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
