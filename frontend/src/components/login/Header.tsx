import { Link } from "react-router-dom"
import logo from "../../resources/logo.png"

const Header = ({
    heading,
    paragraph,
    linkName,
    linkUrl = "#"
}: {
    heading: string
    paragraph: string
    linkName: string
    linkUrl: string
}) => {
    return (
        <div className="mb-10">
            <div className="flex justify-center">
                <img alt="" className="w-32 h-32 rounded-tl-lg rounded-br-lg" src={logo} />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">{heading}</h2>
            <p className="mt-5 text-sm text-center text-gray-600">
                {paragraph}{" "}
                <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                    {linkName}
                </Link>
            </p>
        </div>
    )
}

export default Header
