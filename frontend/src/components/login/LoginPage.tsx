import Header from "./Header"
const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

const LoginPage = () => {
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
                                required
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
