import { decodeToken } from "react-jwt"
import Cookies from "js-cookie"
import { User } from "../App"
import axios from "axios"
interface Token {
    iat: number
    id: number
    username: string
}
export async function cookieLogin(): Promise<User | undefined> {
    const access_token = Cookies.get("access_token")
    console.log(access_token)
    const token: Token | null = decodeToken(access_token!)
    console.log("token: ", token)
    const apiURL = process.env.REACT_APP_USER_ENDPOINT!
    if (token) {
        const getUser = await axios.get(`${apiURL}/getbyid/${token.id}`)
        return getUser.data
    }
    return undefined
}
