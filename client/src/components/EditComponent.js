import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"

const EditComponent = (props) => {
    const [state, setState] = useState({
        title: "",
        author: "",
        slug: ""
    })
    const { title, author, slug } = state

    const [content, setContent] = useState('')

    const submitContent = (event) => {
        setContent(event)
    }

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
            .then(response => {
                const { title, content, author, slug } = response.data
                setState({ ...state, title, author, slug })
                setContent(content)
            })
            .catch(err => alert(err))
        // eslint-disable-next-line
    }, [])

    const showUpdateForm = () => (
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label>ชื่อบทความ</label>
                <div class="input-group">
                    <span class="input-group-text">
                        <i class="bi bi-pin-angle"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={inputValue("title")}
                        placeholder="ความยาวไม่เกิน 40 ตัวอักษร"
                        maxlength="40" />
                </div>
            </div>
            <div className="form-group">
                <label>รายละเอียด</label>
                <ReactQuill
                    value={content}
                    onChange={submitContent}
                    theme="snow"
                    className="pb-5 mb-3"
                    placeholder="รายละเอียดไอดีเกมของคุณ"
                    style={{ border: '1px solid #6c757d' }} />
            </div>
            <div className="form-group">
                <label>ผู้ขาย</label>
                <div class="input-group">
                    <span class="input-group-text">
                        <i class="bi bi-person"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        value={author}
                        onChange={inputValue("author")} />
                </div>
            </div><br />
            <input type="submit" value="อัพเดตข้อมูล" className="btn btn-primary" /> &nbsp;
            <a className="btn btn-outline-dark" href="/">ย้อนกลับ</a>
        </form>
    )

    //กำหนดค่าให้กับ state
    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    }
    /*const submitContent=(event)=>{
        setContent(event)
    }*/

    const submitForm = (e) => {
        e.preventDefault();
        console.log("API URL = ", process.env.REACT_APP_API)
        axios
            .put(`${process.env.REACT_APP_API}/blog/${slug}`, { title, content, author })
            .then(response => {
                Swal.fire('แจ้งเตือน', "อัพเดตข้อมูลเรียบร้อย", 'success')
                const { title, content, author, slug } = response.data
                setState({ ...state, title, author, slug })
                setContent(content)
            })
            .catch(err => {
                alert(err)
            })
    }
    return (
        <div className="container p-5">
            <h1>แก้ไขรายละเอียด</h1>
            {showUpdateForm()}

        </div>
    )
}

export default EditComponent;