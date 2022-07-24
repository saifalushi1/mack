import React, { useEffect, useState } from "react"
import { socket } from "./clientUtils/socket"
import { formatMessage } from "./clientUtils/formatMessage"
import { Routes, Route, Link } from "react-router-dom"
import Chat from "./components/Chat"
import Login from "./components/Login"
import Navigation from "./components/Navigation"
import SignUp from "./components/SignUp"

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
            console.log(socket.connected) // true
            console.log("connected")
        })
    }, [])

    return (
        <>
            <div className="flex items-center justify-center h-screen min-h-full px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </div>
            </div>
            <Route path="chat" element={<Chat user={user} connected={connected} />} />
        </>
    )
}

export default App
