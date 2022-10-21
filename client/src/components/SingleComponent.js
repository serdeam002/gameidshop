import axios from "axios";
import { useEffect, useState } from "react";
import renderHTML from "react-render-html"
import './SingleComponent.css'

const SingleComponent = (props) => {
    const [blog, setBlog] = useState('')

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
            .then(response => {
                setBlog(response.data)
            })
            .catch(err => alert(err))
        // eslint-disable-next-line
    }, [])
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <div className="cut">
                        <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" data-bs-interval="false">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://www.w3schools.com/css/ocean.jpg" className="img" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="https://speedthai-it.com/wp-content/uploads/2022/09/305265787_2453055528191215_1126361762591161820_n.jpg" className="img" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="https://pbs.twimg.com/media/E_Z8lM2VUAQcvdu.jpg:large" className="img" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {blog &&
                <div className="mt-5">
                    <h1>{blog.title}</h1>
                    <div className="pt-3">{renderHTML(blog.content)}</div>
                    <p className="text-muted">ผู้ขาย : {blog.author} วันที่ลงขาย : {new Date(blog.createdAt).toLocaleString()}</p>
                </div>}
        </div>
    )
}

export default SingleComponent;