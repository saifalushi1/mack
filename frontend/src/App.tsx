import { useEffect, useState } from "react"
import { socket } from "./clientUtils/socket"
import { Routes, Route } from "react-router-dom"
import Chat from "./components/Chat"
import Navigation from "./components/Navigation"
import SignUp from "./components/login/SignUp"
import LoginPage from "./components/login/LoginPage"

export interface Iuser {
    id: number
    firstName: string
    lastName: string
    username: string
    password: string
    email: string
}

const App = () => {
    const [connected, setConnected] = useState<boolean>(false)
    const [LoggedIn, setLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<Iuser>({
        id: 0,
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: ""
    })
    let x = 1

    useEffect(() => {
        socket.on("connect", () => {
            setConnected(true)
        })

        window.onbeforeunload = function() {
            x = 2
            return true;
        };
    
        return () => {
            window.onbeforeunload = null;
        };

    }, [])
    console.log(user)
    return (
        <>
            <Navigation loggedIn={LoggedIn} />
            <Routes>
                <Route path="/" element={<LoginPage setUser={setUser} />} />
                <Route path="/chat" element={<Chat user={user} connected={connected} />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </>
    )
}

export default App
