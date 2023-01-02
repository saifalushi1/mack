import { decodeToken } from "react-jwt"
import Cookies from "js-cookie"
import { Iuser } from "../App"
import axios from "axios"
interface Token {
    iat: number
    id: number
    username: string
}
export async function cookieLogin(): Promise<Iuser | undefined> {
    let user: Iuser
    const access_token = Cookies.get("access_token")
    const token: Token | null = decodeToken(access_token!)
    const apiURL = process.env.REACT_APP_USER_ENDPOINT!
    if (token) {
        await axios.get(`${apiURL}/getbyid/${token.id}`).then((res) => {
            user = res.data
            return user
        })
    }
    return undefined
}
