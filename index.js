const express = require("express")
const { registerRouter } = require("./routes/register.route");
const { loginRouter } = require("./routes/login.route");
const cors = require("cors");
const { connection } = require("./config/db");
const hotelRouter = require("./routes/hotel.route");
const roomRouter = require("./routes/room.route");
const { bookingRouter } = require("./routes/booking.route");



const app = express();
app.use(cors()) 

app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome to api")
})

app.use("/register",registerRouter)
app.use("/login",loginRouter)
app.use("/hotel",hotelRouter)
app.use("/room",roomRouter)
app.use("/booking",bookingRouter)








app.listen(8080, async () => {
    try{
        await connection
        console.log("Connection to DB successfully")
    }
    catch(err){
        console.log(err)
        console.log("Error connecting to DB")
    }
    console.log(`Listening on PORT 8080`)
})
