import { cookieLogin } from "../../clientUtils/cookieLogin"

export async function redirectUser(setUser: any, setLoggedIn: any): Promise<boolean> {
    const user = await cookieLogin()
    if (user) {
        setUser(user)
        setLoggedIn(true)
        return false
    } else {
        return true
    }
}
