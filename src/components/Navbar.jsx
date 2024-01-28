import Logo from "../assets/SnapChef_Logo.jpeg"
import { useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()
    return (
    <div className="navbar bg-base-100">
        <div className="navbar-start cursor-pointer" onClick={()=>navigate('/')}>
            <img src={Logo} alt="logo" width="100" height="100"/>
            <div className="flex-1 prose">
                <h1 className="text-primary">SnapChef</h1>
            </div>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end">
            <button className="btn btn-secondary mr-5" onClick={()=>{navigate('/about')}}>
                About
            </button>
        </div>

    </div>
    )
}

export default Navbar