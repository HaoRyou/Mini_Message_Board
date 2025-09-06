const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];
 const express = require('express');
 const router = express.Router();

 router.get("/", (req,res)=>{
    res.render("index", {messages:messages});
 })

 router.get("/detail/:index", (req,res)=>{
    const i = req.params.index;
    const message = messages[i];
    res.render("detail", {message});
 })

router.get("/new", (req,res)=>{
    res.render("form");
})

router.post("/new", (req, res) => {
  const { user, text } = req.body;
  messages.push({ text, user, added: new Date() });
  res.redirect("/");
});


 module.exports = router;