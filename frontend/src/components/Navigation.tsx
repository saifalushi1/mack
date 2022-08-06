import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../styling/nav.css"
axios.defaults.withCredentials = true

interface IProps {
    loggedIn: boolean
}

const Navigation: React.FC<IProps> = ({ loggedIn }): JSX.Element => {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const logout = async (): Promise<void> => {
        const apiURL = process.env.REACT_APP_USER_ENDPOINT!
        try {
            //logout requires userID add context to pass the user info around
            await axios.post(`${apiURL}/logout`, { id: 1 })
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (!err?.response) {
                    console.error("No Server Response")
                } else if (err.response?.status === 400) {
                    // setUserError(true)
                    // console.error("Missing Field")
                    console.error(err.response?.data)
                } else if (err.response?.status === 401) {
                    // setUserError(true)
                    console.error(err.response?.data)
                } else {
                    console.error("Login Failed")
                }
            }
        }
        await axios.post(`${apiURL}/logout`)
    }
    return (
        <>
            <nav className="navigation">
                <Link to="/chat" className="brand-name">
                    Mack
                </Link>
                <button
                    className="hamburger"
                    onClick={() => {
                        setIsNavExpanded(!isNavExpanded)
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
                    <ul>
                        <li>
                            <a href="/home">Home</a>
                        </li>
                        <li>
                            <a href="/about">About</a>
                        </li>
                        <li>
                            <a href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navigation
