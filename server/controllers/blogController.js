//ติดต่อกับฐานข้อมูล / ดำเนินการกับฐานข้อมูล
const Blogs = require("../models/blogs")
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const express = require("express");

const app = express()

//บันทึกข้อมูล
exports.create = async (req, res) => {

    let slug = uuidv4();
    let blog = new Blogs({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        img: req.file.filename,
        slug: slug
    })


    blog
        .save()
        .then(() => {
            console.log("Saved successfully!");
            res.status(200).json({'blog': 'blog saved successfully'});
        })
        .catch(err => {
            console.log("blog save unsuccessful!");
            console.log("blog: " + blog);
            console.log(req.file);
            console.log(req.body);
            res.status(400).send('adding new blog failed');
        });

    /*Blogs.create({ obj, slug }, (err, blog) => {
        if (err) {
            console.log(err)
            return
        } else {
            blog.img = req.file.path
            res.json(blog)
        }
    })*/
}

//ดึงข้อมูลบทความทั้งหมด
exports.getAllblogs = (req, res) => {
    Blogs.find({}).exec((err, blogs) => {
        res.json(blogs)
    })
}

//ดึงบทความที่สนใจอ้างอิงตาม slug
exports.singleBlog = (req, res) => {
    const { slug } = req.params
    Blogs.findOne({ slug }).exec((err, blog) => {
        res.json(blog)
    })
}

exports.remove = (req, res) => {
    const { slug } = req.params
    Blogs.findOneAndRemove({ slug }).exec((err, blog) => {
        if (err) console.log(err)
        res.json({
            message: "ลบบทความเรียบร้อย"
        })
    })
}

exports.update = (req, res) => {
    const { slug } = req.params
    // ส่งข้อมูล => title , content, author
    const { title, content, author } = req.body
    Blogs.findOneAndUpdate({ slug }, { title, content, author }, { new: true }).exec((err, blog) => {
        if (err) console.log(err)
        res.json(blog)
    })
}

