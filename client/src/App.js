import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import './App.css';
import renderHTML from "react-render-html"
import { getUser } from "./services/authhorize";

function App() {
  const [blogs, setBlogs] = useState([])

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then(response => {
        setBlogs(response.data)
      })
      .catch(err => alert(err));
  }
  useEffect(() => {
    fetchData()
  }, [])

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "ต้องการลบรายการหรือไม่ ?",
      icon: "warning",
      showCancelButton: true
    }).then((result) => {
      //ปุ่ม OK
      if (result.isConfirmed) {
        deleteBlog(slug)
      }
    })
  }
  const deleteBlog = (slug) => {
    //ส่ง request ไป api เพื่อลบ
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then(response => {
        Swal.fire("Deleted!", response.data.message, "success")
        fetchData()
      }).catch(err => console.log(err))
  }

  return (
    <div className="container p-5">
      <div className="row" >
        {blogs.map((blog, index) => (
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch" key={index}>
            <div className="card mt-4" style={{ width: '380px', height: '560px' }}>
              <img id="img_card" src="" style={{ width: 'auto', height: '300px', }} className="card-img-top" alt="" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{blog.title}</h5>
                <div className="card-text content" style={{ width: 'auto', height: '50px' }}>{renderHTML(blog.content.substring(0, 150))}</div>
                <div className="mt-auto align-self-start">
                  <p className="card-text text-muted">ผู้ขาย : {blog.author} <br /> วันที่ลงขาย : {new Date(blog.createdAt).toLocaleString()}</p>
                  <div className="d-flex">
                    <Link to={`/blog/${blog.slug}`} className="btn btn-primary">รายละเอียด</Link> &nbsp;
                    {
                      getUser() && (
                        <div>
                          <Link className="btn btn-outline-warning" to={`/blog/edit/${blog.slug}`}>แก้ไข</Link> &nbsp;
                          <button className="btn btn-outline-danger" onClick={() => confirmDelete(blog.slug)}>ลบ</button>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
