import axios from "axios"

export function handleNavigationError(err: unknown) {
    if (axios.isAxiosError(err)) {
        if (!err?.response) {
            console.error("No Server Response")
        } else if (err.response?.status === 400) {
            console.error(err.response?.data)
        } else if (err.response?.status === 401) {
            console.error(err.response?.data)
        } else {
            console.error("Login Failed")
        }
    }
}
