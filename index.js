import express from "express";
import bodyParser from "body-parser";
import { join, resolve } from "path";

const app = express();
const port = 3000;
const blog_data = [];
const __dirname = resolve()

app.use(express.static(join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index.ejs', {data: blog_data});
});

app.get('/add-post', (req, res) => {
    res.render('add-post.ejs');
});

app.post('/sumbit-new-post', (req, res) =>{
    const post = {
        index: blog_data.length,
        title: req.body.title,
        sub: req.body.subtitle,
        body: req.body.body
    };
    blog_data.push(post);
    res.redirect('/');
});

app.get('/post/:postTitle/:postNo', (req, res)=>{
    res.render('post.ejs', blog_data[req.params.postNo]);
    // console.log(blog_data[req.params.postNo]);
});

app.get('/update-post/:id', (req, res)=>{
    res.render('update.ejs', blog_data[req.params.id]);
});

app.post('/sumbit-updated-post/:id', (req, res)=>{
    blog_data[req.params.id] = {
        index: req.params.id,
        title: req.body.title,
        sub: req.body.subtitle,
        body: req.body.body
    };
    res.redirect("/post/"+ blog_data[req.params.id].title + "/" + req.params.id);
});

app.get('/delete-post/:id', (req, res) => {
    blog_data.splice(req.params.id, 1);
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log(`listening on port ${port} on http://localhost:${port}`);
});
