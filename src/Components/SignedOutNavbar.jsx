import { Link} from "react-router-dom";

const SignedOutNavbar = (props) => {
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        
                        <Link to="/login">
                            <div className="flex flex-col md:me-24 text-sm text-black font-bold ">
                                <h1>Rwanda Cultural</h1>
                                <div className="flex flex-row gap-1">
                                    <h2>Village</h2>
                                    <h2 className="bg-darkBrown text-xs py-1 px-1.5 rounded-md text-white">
                                    LMS
                                    </h2>
                                </div>
                            </div>
                        </Link>
                        
                    </div>
                    {/* <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <div className="flex items-center space-x-4">
                                <div className="flex justify-center min-w-0">
                                <p className="text-base font-bold text-gray-900 truncate">
                                    {props.firstname}
                                </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>    
        </nav>
    )
}

export default SignedOutNavbar;
