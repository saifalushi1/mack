import axios, { AxiosError } from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "./Header"

const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

interface ISignup {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    confirmPassword: string
}

const SignUp = () => {
    const [userSignup, setUserSignup] = useState<ISignup>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [doPasswordsMatch, setDoPasswordsMatch] = useState<boolean>(true)
    const apiURL = process.env.REACT_APP_USER_ENDPOINT || "something went terribly wrong"
    const handleSubmit = async () => {
        if (userSignup.password !== userSignup.confirmPassword) {
            setDoPasswordsMatch(false)
            return
        } else {
            setDoPasswordsMatch(true)
            try {
                const trySign = await axios.post(`${apiURL}/signup`, userSignup)
            } catch (err) {
                // check if error is an axios error
                if (axios.isAxiosError(err)) {
                    if (!err?.response) {
                        console.error("No Server Response")
                    } else if (err.response?.status === 400) {
                        console.error("Missing Username or Password")
                    } else if (err.response?.status === 401) {
                        console.error("Unauthorized")
                    } else if (err.response?.status === 409) {
                        console.error(err.response?.data)
                    } else {
                        console.error("Login Failed")
                    }
                }
            }
        }
    }

    const passwordsDontMatch = (): JSX.Element => {
        return <p className="text-red-400">Passwords Do Not Match</p>
    }
    return (
        <>
            <div className="flex items-center justify-center h-screen min-h-full px-4 pb-6 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-6">
                    <Header
                        heading="Signup to create an account"
                        paragraph="Already have an account? "
                        linkName="login"
                        linkUrl="/"
                    />
                    <div className="mt-8 space-y-6">
                        <div className="-space-y-px">
                            <div className="my-5">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className={fixedInputClass}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setUserSignup((prevSignup) => ({
                                            ...prevSignup,
                                            firstName: e.target.value
                                        }))
                                    }}
                                    maxLength={25}
                                    required
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4">
                        <div className="-space-y-px">
                            <input
                                type="text"
                                placeholder="Last Name"
                                className={fixedInputClass}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setUserSignup((prevSignup) => ({
                                        ...prevSignup,
                                        lastName: e.target.value
                                    }))
                                }}
                                maxLength={40}
                                required
                            ></input>
                        </div>
                    </div>
                    <div className="mt-8 space-y-6">
                        <div className="-space-y-px">
                            <div className="my-5">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className={fixedInputClass}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setUserSignup((prevSignup) => ({
                                            ...prevSignup,
                                            username: e.target.value
                                        }))
                                    }}
                                    required
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 space-y-6">
                        <div className="-space-y-px">
                            <div className="my-5">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    autoComplete="email"
                                    className={fixedInputClass}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setUserSignup((prevSignup) => ({
                                            ...prevSignup,
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
                                placeholder="Password"
                                className={fixedInputClass}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setUserSignup((prevSignup) => ({
                                        ...prevSignup,
                                        password: e.target.value
                                    }))
                                }}
                                required
                            ></input>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4">
                        <div className="-space-y-px">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className={fixedInputClass}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setUserSignup((prevSignup) => ({
                                        ...prevSignup,
                                        confirmPassword: e.target.value
                                    }))
                                }}
                                required
                            ></input>
                            {doPasswordsMatch ? "" : passwordsDontMatch()}
                        </div>
                    </div>
                    <button
                        className="relative flex justify-center w-full px-4 py-2 mt-10 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        onClick={() => handleSubmit()}
                    >
                        Signup
                    </button>
                </div>
            </div>
        </>
    )
}

export default SignUp
