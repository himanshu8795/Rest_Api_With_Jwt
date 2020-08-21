require("dotenv").config();
const express = require('express');
const app = express();
const userRouter = require("./api/users/user.router");
app.use(express.json());
// app.get('/api', (req,res)=>{
//     res.json({
//         success : 1,
//         message: "This is rest api working"
//     });
// });

app.use("/api/users", userRouter);
app.listen(process.env.APP_PORT,()=>{
    console.log('server up and runnning on port :', process.env.APP_PORT);
});