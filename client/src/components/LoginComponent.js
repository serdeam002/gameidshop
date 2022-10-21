import { useState,useEffect } from "react";
import axios from "axios"
import Swal from 'sweetalert2';
import { authenticate, getUser } from "../services/authhorize";
import {withRouter} from "react-router-dom"

const LoginComponent = (props) => {
    const [state, setState] = useState({
        username: "",
        password: ""
    })
    const { username, password } = state
    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    }

    const submitForm = (e) => {
        e.preventDefault();
        axios
        .post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
            //login สำเร็จ
            authenticate(response,()=>props.history.push("/"))
        }).catch(err=>{
            Swal.fire('แจ้งเตือน', err.response.data.error, 'error')
        })
    }

    useEffect(()=>{
        getUser() && props.history.push("/")
        // eslint-disable-next-line
    },[])

    return (
        <div className="container p-5">
            <h1>เข้าสู่ระบบ</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-person"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={inputValue("username")} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-key"></i>
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={inputValue("password")} />
                    </div>
                </div><br />
                <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary" />
            </form>
        </div>
    )
}

export default withRouter(LoginComponent);