const jwt = require("jsonwebtoken")

exports.login=(req,res)=>{
    //ข้อมูล username,password
    const {username,password} = req.body
    if(password === process.env.PASSWORD){
        //login
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1h'})
        return res.json({token,username})
    }else{
        return res.status(400).json({error:"รหัสผ่านไม่ถูกต้อง!"})
    }
}