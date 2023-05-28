import { useEffect, useState } from "react"
import { socket } from "./clientUtils/socket"
import { Routes, Route } from "react-router-dom"
import Chat from "./components/Chat"
import Navigation from "./components/navigation/Navigation"
import SignUp from "./components/login/SignUp"
import LoginPage from "./components/login/LoginPage"
import { cookieLogin } from "./clientUtils/cookieLogin"


export interface Iuser {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
}


const App = () => {
    const [connected, setConnected] = useState<boolean>(false)
    const [LoggedIn, setLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<Iuser>({
        id: 0,
        username: "",
        email: "",
        firstName: "",
        lastName: ""
    })
    useEffect(() => {
        socket.on("connect", () => {
            setConnected(true)
        })
        
        const checkLoggedInStatus = async () => {
            try{
                return await cookieLogin()
            }catch(err){
                console.error(err)
            }
        }
        checkLoggedInStatus().then((user: Iuser | undefined) => {
            if(user){
                setUser(user)
                console.log("in checkedout function", user)
            }
        })
    }, [])
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