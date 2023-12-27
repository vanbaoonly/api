const express = require("express");
const app = express();

const hostname = '127.0.0.1';
const port = 3210;
const courses = [
    { id: 1, title: "react js" },
    { id: 2, title: "node js" },
    { id: 3, title: "boostrap " },
]
app.use(express.json());
//  get
app.get("/api/courses/", (req, res) => {
    res.send(courses)
});
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(courses => courses.id === parseInt(req.params.id));
    course ? res.send(course) : res.status(404).send("id khong ton tai");
});

//  post

app.post("/api/courses/add", (req, res) => {
    const course = {
        id: req.body.id,
        title: req.body.title
    }

    courses.push(course)
    res.send(JSON.stringify({
        success: true,
        notify: "add success.",
        data: courses
    }))


})

//update
app.put("/api/courses/update/:id", (req, res) => {
    const course = courses.find(courses => courses.id === parseInt(req.params.id));
    course.title = req.body.title;
    res.send(JSON.stringify({
        success: true,
        notify: "success update data",
        data: courses
    }))

})


//delete
app.delete('/api/courses/delete/:id', (req, res) => {
    const course = courses.find(courses => courses.id === parseInt(req.params.id));
    let index = courses.indexOf(course);
    console.log(index)
    courses.splice(index, 1);
    res.send(JSON.stringify({
        success: true,
        notify: "success delete data",
        data: courses
    }))
})


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});