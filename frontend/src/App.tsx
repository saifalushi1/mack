import React, { useEffect, useState } from "react"
import { socket } from "./clientUtils/socket"
import { formatMessage } from "./clientUtils/formatMessage"
import { Routes, Route, Link } from "react-router-dom"
import Chat from "./components/Chat"
import Navigation from "./components/Navigation"
import SignUp from "./components/login/SignUp"
import LoginPage from "./components/login/LoginPage"
import axios from "axios"

export interface Iuser {
    username: string
    password: string
    email: string
}

const App = () => {
    const [connected, setConnected] = useState<boolean>(false)
    const [user, setUser] = useState<Iuser>({ username: "sushi", password: "", email: "" })

    useEffect(() => {
        socket.on("connect", () => {
            setConnected(true)
        })

        test()
    }, [])
    const test = async () => {
        try {
            const x = await axios.post("http://localhost:8000/user/login", {
                email: "saif@gmail.com",
                password: "123"
            })
            console.log(x.data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/chat" element={<Chat user={user} connected={connected} />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </>
    )
}

export default App
