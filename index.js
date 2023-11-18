import express from "express";
import bodyParser from "body-parser";
import { join, resolve } from "path";
import { getAll, getId, insertData, updateData, deleteData } from "./db.js";

const app = express();
const port = 3000;
const __dirname = resolve()

app.use(express.static(join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    getAll().then((out)=>{
        res.render('index.ejs', {data: out});
    })
});

app.get('/add-post', (req, res) => {
    res.render('add-post.ejs');
});

app.post('/sumbit-new-post', (req, res) =>{
    const post = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        body: req.body.body
    };
    // blog_data.push(post);
    insertData(post);
    res.redirect('/');
});

app.get('/post/:postTitle/:postNo', (req, res)=>{
    console.log(req.params.postNo)
    getId(req.params.postNo).then((out)=>{
        res.render('post.ejs', out);
    });
    // console.log(blog_data[req.params.postNo]);
});

app.get('/update-post/:id', (req, res)=>{
    getId(req.params.id).then((out)=>{
        res.render('update.ejs',out);
    })
});

app.post('/sumbit-updated-post/:id', (req, res)=>{
    let data = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        body: req.body.body
    };
    updateData(req.params.id, data);

    res.redirect("/post/"+ data.title + "/" + req.params.id);
});

app.get('/delete-post/:id', (req, res) => {
    deleteData(req.params.id);
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log(`listening on port ${port} on http://localhost:${port}`);
});

