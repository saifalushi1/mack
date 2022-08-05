import React, { useEffect, useState } from "react"
import { socket } from "./clientUtils/socket"
import { Routes, Route, Link } from "react-router-dom"
import Chat from "./components/Chat"
import Navigation from "./components/Navigation"
import SignUp from "./components/login/SignUp"
import LoginPage from "./components/login/LoginPage"
// axios.defaults.withCredentials = true

export interface Iuser {
    username: string
    password: string
    email: string
}

const App = () => {
    const [connected, setConnected] = useState<boolean>(false)
    const [LoggedIn, setLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<Iuser>({ username: "sushi", password: "", email: "" })

    useEffect(() => {
        socket.on("connect", () => {
            setConnected(true)
        })
    }, [])

    return (
        <>
            <Navigation loggedIn={LoggedIn} />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/chat" element={<Chat user={user} connected={connected} />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </>
    )
}

export default App
