const CentralView = (props) => { 
    return (
        <div className="flex flex-col gap-3 sm:gap-5">
            <div className="mt-5 xl:mt-7 ">
                <h1 className="text-xl sm:text-2xl font-bold">{props.title}</h1>
            </div>
            {props.children}
        </div>
    )
}

export default CentralView;
