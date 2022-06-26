import { Link } from "react-router-dom"

const SignUp = () => {
    return(
        <>
        <form onSubmit={() => console.log("yer")}>
            <input type="email" placeholder="Email" required/>
            <input type="text" placeholder="Username" required/>
            <input type="password" placeholder="Password" required minLength={8}/>
            <input type="password" placeholder="Enter Password Again" required/>
            <input type="button" value="Create Account"/>
        </form>
        </>
    )
}

export default SignUp