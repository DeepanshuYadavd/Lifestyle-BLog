// import files:
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const handler=require("./controller/handler");
// set view engine:
app.set("view engine", "ejs");

// use css file
app.use(express.static("public"));

// use middleware for taking the data from form:
app.use(express.urlencoded({ extended: true }));

// connection with db:
const uri = "mongodb://127.0.0.1:27017/myblogs";
mongoose
  .connect(uri)
  .then(() => {
    console.log("connected with database");
  })
  .catch((error) => {
    console.error(error);
  });

// render ejs templates:
app.get("/", (req, res) => {
  res.redirect("/myblogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create" });
});

// route to myblogs or home page:
app.get("/myblogs",handler.index);

// route to detail of blogs
app.get("/myblogs/:id",handler.detail);

// delete the blog:
app.delete("/myblogs/:id",handler.delete_blog);

// post:to post the blog in database
app.post("/myblogs", handler.post_blog);

// error route:
app.use((req, res) => {
  res.status(404).render("error", { title: "404" });
});

// localhost connection:
app.listen(3000, "127.0.0.1", () => {
  console.log("connection established");
});
