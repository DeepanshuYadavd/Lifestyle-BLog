const blog = require("../model/model");

//  , detail , delete , post:
// route to myblogs or home page:
const index=(req,res)=>{
      // data pick from database and here blog is the collection name.
  blog
  .find()
  .sort({ createdAt: -1 })
  .then((blogs) => {
    //    data sent to ejs file
    res.render("index", { title: "home", blogs });
  })
  .catch((error) => {
    console.error(error._message);
  });
}

// route to detail of blogs
const detail=async(req,res)=>{
    const id = req.params.id;
  const result = await blog.findById(id);
  res.render("detail", { title: "detail", result });
  // another way:
  // blog.findById(id)
  // .then((result)=>{
  //     console.log(result)
  //     res.render("detail",{title:"detail",result})
  // })
  // .catch((error)=>{
  //     console.error(error._message);
  // }); 
}

// delete the blog:
const delete_blog=(req,res)=>{
    const id = req.params.id;
    // jab blog delete ho jaye then ik response jaye jisme path ho home page ka:
    // ye path javascript ke pass jayega jha hum fetch kr re hai:
    blog
      .findByIdAndDelete(id)
      .then((result) => {
    // hum ik path response mai bhjre hai so that delete hone ke baad uss path par request jaye.
        res.json({ redirect: "/myblogs" });
      })
      .catch((error) => {
        console.log(error._message);
      });
}

// post:to post the blog in database
const post_blog=async(req,res)=>{
    const data = req.body;
    // data inserted into database
    await blog.create(data);
    // back to home page
    res.redirect("/myblogs");
}

module.exports={
    index,
    detail,
    delete_blog,
    post_blog
}
