import { RotatingSquare } from  'react-loader-spinner'
import "./Loader.css"

const Loader = () => {
    return (
        <div className='loader__container'>
            <RotatingSquare
                height="100"
                width="100"
                color="rgb(150, 207, 207)"
                ariaLabel="rotating-square-loading"
                strokeWidth="4"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
        </div>
    )
}

export default Loader