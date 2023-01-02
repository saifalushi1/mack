import { Dispatch, SetStateAction, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import { Iuser } from "../../App"
import { socket } from "../../clientUtils/socket"

axios.defaults.withCredentials = true
const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

interface IUserLogin {
    email: string
    password: string
}

interface IUserError {
    isError: boolean
    errorMessage: string
}

interface IProps {
    setUser: Dispatch<SetStateAction<Iuser>>
}

const LoginPage = ({ setUser }: IProps) => {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState<IUserLogin>({ email: "", password: "" })
    const [userError, setUserError] = useState<IUserError>({ isError: false, errorMessage: "" })

    const showUserError = (): JSX.Element => {
        return <p className="text-red-400">{userError.errorMessage}</p>
    }

    const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
        const apiURL = process.env.REACT_APP_USER_ENDPOINT!
        event.preventDefault()

        try {
            setUserError((prevState) => ({ ...prevState, isError: false }))
            const loginData = await axios.post(`${apiURL}/login`, {
                email: userLogin.email,
                password: userLogin.password
            })
            setUser(loginData.data.userinfo)
            navigate("/chat")

        } catch (err) {
            handleError(err, setUserError)
        }
    }
    return (
        <>
            <div className="flex items-center justify-center h-screen min-h-full px-4 pb-6 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-6">
                    <Header
                        heading="Login to your account"
                        paragraph="Don't have an account yet? "
                        linkName="Signup"
                        linkUrl="/signup"
                    />
                    <form onSubmit={handleSubmit}>
                    <div className="mt-6 space-y-6">
                        <div className="-space-y-px">
                            <div className="my-5">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    autoComplete="email"
                                    className={fixedInputClass}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setUserLogin((prevLogin) => ({
                                            ...prevLogin,
                                            email: e.target.value
                                        }))
                                    }}
                                    required
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 space-y-4">
                        <div className="-space-y-px">
                            <input
                                type="password"
                                autoComplete="current-password"
                                placeholder="Password"
                                className={fixedInputClass}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setUserLogin((prevLogin) => ({
                                        ...prevLogin,
                                        password: e.target.value
                                    }))
                                }}
                                required
                            ></input>
                            {userError.isError === false ? "" : showUserError()}
                        </div>
                    </div>
                    <div className="flex items-center justify-between ">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <label
                                htmlFor="remember-me"
                                className="block ml-2 text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm mt-4">
                            <a
                                href="#"
                                className="font-medium text-purple-600 hover:text-purple-500"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <button type="submit"
                        className="relative flex justify-center w-full px-4 py-2 mt-10 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        // onClick={() => handleSubmit()}
                    >
                        Login
                    </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage


function handleError(err: unknown, setUserError: Dispatch<SetStateAction<IUserError>>){
    if (axios.isAxiosError(err)) {
        setUserError((prevState) => ({ ...prevState, isError: true }))
        if (!err?.response) {
            console.error("No Server Response")
        } else if (err.response?.status === 401) {
            setUserError((prevState) => ({
                ...prevState,
                errorMessage: "Incorrect username or password"
            }))
            console.error(err.response?.data)
        } else if (err.response?.status === 404) {
            setUserError((prevState) => ({
                ...prevState,
                errorMessage: "No account found"
            }))
            console.error(err.response?.data)
        } else if (err.response?.status === 400) {
            setUserError((prevState) => ({
                ...prevState,
                errorMessage: "Must enter email and password"
            }))
            console.error(err.response?.data)
        } else {
            setUserError((prevState) => ({
                ...prevState,
                errorMessage: "login Failed"
            }))
            console.error("Login Failed")
        }
}
}