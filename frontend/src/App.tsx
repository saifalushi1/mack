import { useEffect, useState } from "react"
import { socket } from "./clientUtils/socket"
import { Routes, Route, useNavigate } from "react-router-dom"
import Chat from "./components/Chat"
import Navigation from "./components/navigation/Navigation"
import SignUp from "./components/login/SignUp"
import LoginPage from "./components/login/LoginPage"
import {redirectUser} from "domain/auth"

export interface User {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
}


const App = () => {
    const navigate = useNavigate()
    const [connected, setConnected] = useState<boolean>(false)
    const [LoggedIn, setLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<User>({
        id: undefined,
        username: "",
        email: "",
        firstName: "",
        lastName: ""
    })
    useEffect(() => {
        socket.on("connect", () => {
          setConnected(true);
        });
        redirectUser(setUser, setLoggedIn).then((shouldRedirect: boolean) => {
            if(shouldRedirect){
                navigate("/")
            }
        })
    }, []);
    
    
    return (
        <>
            <Navigation loggedIn={LoggedIn} setLoggedIn={setLoggedIn} />
            <Routes>
                <Route path="/" element={<LoginPage setUser={setUser} setLoggedIn={setLoggedIn}/>} />
                <Route path="/chat" element={<Chat user={user} connected={connected} />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </>
    )
}

export default App