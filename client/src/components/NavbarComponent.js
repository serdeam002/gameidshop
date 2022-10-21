import { Link, withRouter } from "react-router-dom";
import { getUser, logout } from "../services/authhorize";

const NavbarComponent = ({ history }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#home">gameidshop</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">หน้าแรก</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/create">ลงขายไอดี</Link>
                        </li>
                        < li className="nav-item">
                            <a className="nav-link disabled" href="#none">Disabled</a>
                        </li>
                            {
                                !getUser() && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">เข้าสู่ระบบ</Link>
                                    </li>
                                )
                            }
                            {
                                getUser() && (
                                    <li className="nav-item">
                                        <a className="nav-link" href="#none" onClick={() => logout(() => history.push("/"))}>ออกจากระบบ</a>
                                    </li>
                                )
                            }
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default withRouter(NavbarComponent);