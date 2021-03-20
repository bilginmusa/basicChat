const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let messages=[];

io.on("connection",socket=>{
    console.log("New user connected:",socket.id);
    socket.emit("welcome",socket.id);
    socket.emit("messageAll",messages);

    socket.on("message",(message)=>{
        console.log("Message",message);
        messages.push({message:message,userId:socket.id})
        io.emit("message",{
            message:message,
            userId:socket.id
        })
    })

})


http.listen(3001, () => {console.log("Listening on 3001")});
