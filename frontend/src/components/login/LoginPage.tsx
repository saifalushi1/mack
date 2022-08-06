import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
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

const LoginPage = () => {
    const [userLogin, setUserLogin] = useState<IUserLogin>({ email: "", password: "" })
    const [userError, setUserError] = useState<IUserError>({ isError: false, errorMessage: "" })

    const handleSubmit = async (): Promise<void> => {
        const apiURL = process.env.REACT_APP_USER_ENDPOINT!

        try {
            const loginData = await axios.post(`${apiURL}/login`, {
                email: userLogin.email,
                password: userLogin.password
            })
            console.log(loginData)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (!err?.response) {
                    console.error("No Server Response")
                } else if (err.response?.status === 400) {
                    // setUserError(true)
                    // console.error("Missing Field")
                    console.error(err.response?.data)
                } else if (err.response?.status === 401) {
                    // setUserError(true)
                    console.error(err.response?.data)
                } else {
                    console.error("Login Failed")
                }
            }
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
                    <div className="mt-8 space-y-6">
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
                    <div className="mt-8 space-y-4">
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
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-purple-600 hover:text-purple-500"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <button
                        className="relative flex justify-center w-full px-4 py-2 mt-10 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        onClick={() => handleSubmit()}
                    >
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default LoginPage
