import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to={"/"}>
                <p className="text-2xl font-bold text-gradient">ResumeReject</p>
            </Link>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Link to="/upload" className="primary-button w-fit">
                    Upload Resume
                </Link>
                <Link to="/logout" className="primary-button w-fit">
                    Logout
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
