import { Link } from "react-router-dom"

const SignUp = () => {
    return (
        <>
            <input type="email" placeholder="Email Address" autoComplete="email" required />
            <input type="text" placeholder="Username" autoComplete="username" required />
            <input type="password" placeholder="Password" required minLength={8} />
            <input type="password" placeholder="Enter Password Again" required minLength={8} />
            <button type="submit">Create Accunt</button>
        </>
    )
}

export default SignUp
