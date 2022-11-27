const express = require("express");
const data = require("./data.json");

const app = express();



app.get("/api", (req, res) => {
    res.json(data);
});

app.get("/api/:id", (req, res) => {

    const userData = data.users.filter(user => {
        if (user.id.toString() === req.params.id.toString()) {
            return user
        }
    })

    res.json(userData[0]);
});

app.get("/api/:id/messages", (req, res) => {

    const userData = data.users.filter(user => {

        if (user.id.toString() === req.params.id.toString()) {

            return user.message
        }
    })

    res.json(userData[0].message);
});

app.get("/api/:id/messages/:messageId", (req, res) => {

    const userData = data.users.filter(user => user.id.toString() === req.params.id)[0].message.filter(item=>{

        if(item.id.toString() === req.params.messageId){
          return item
        }
    });

    res.json(userData[0]);
});



app.listen("3000", () => {
    console.log("3000 portu dinleniyor!");
})