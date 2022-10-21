import Swal from "sweetalert2";

//เก็บ token / username =>session storage
export const authenticate = (response, next) => {
    if (window !== "undefined") {
        //เก็บข้อมูล session storage
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        sessionStorage.setItem("user", JSON.stringify(response.data.username))
    }
    next()
}

//ดึงข้อมูล token
export const getToken = () => {
    if (window !== "undefined") {
        if (sessionStorage.getItem("token")) {
            return JSON.parse(sessionStorage.getItem("token"))
        } else {
            return false
        }
    }
}

//ดึงข้อมูล user
export const getUser = () => {
    if (window !== "undefined") {
        if (sessionStorage.getItem("user")) {
            return JSON.parse(sessionStorage.getItem("user"))
        } else {
            return false
        }
    }
}

//logout
export const logout = (next) => {
    if (window !== "undefined") {
        Swal.fire({
            title: "ต้องการออกจากระบบหรือไม่ ?",
            icon: "warning",
            showCancelButton: true
        }).then((result) => {
            //ปุ่ม OK
            if (result.isConfirmed) {
                sessionStorage.removeItem("token")
                sessionStorage.removeItem("user")
                next()
            }
        })
    }
}