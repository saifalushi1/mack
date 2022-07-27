import { Link } from "react-router-dom"
import Header from "./Header"
const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

const SignUp = () => {
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
                                required
                            ></input>
                        </div>
                    </div>
                    <button
                        className="relative flex justify-center w-full px-4 py-2 mt-10 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        onClick={() => ""}
                    >
                        Signup
                    </button>
                </div>
            </div>
        </>
    )
}

export default SignUp
