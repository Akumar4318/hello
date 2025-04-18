const express=require('express')
const app=express()
const connectDB=require('./DataBase/database')
require('dotenv').config()
const PORT=process.env.PORT || 4000

const cors=require('cors')
const cookieParse=require('cookie-parser')
const{cloudinaryConnect}=require('./Config/cloudinary')
const fileUpload=require("express-fileupload")

 
const UserRoutes=require('./Routes/User')
const profileRoutes=require('./Routes/Profile')
const paymentRoutes=require('./Routes/Payment')
const courseRoute=require('./Routes/Course')
const contactUsRoute = require("./Routes/Contact");





// connect db
app.use(express.json())
app.use(cookieParse())
app.use(
	cors({

		origin:"https://hello-frontend-hznl.onrender.com",
		credentials:true,
	})
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:'/tmp'
    })
)

// cloudinary connection
cloudinaryConnect();

// routes
app.use('/api/v1/auth',UserRoutes)
app.use('/api/v1/profile',profileRoutes)
app.use('/api/v1/course',courseRoute)
app.use('/api/v1/payment',paymentRoutes)
app.use("/api/v1/reach", contactUsRoute);

app.get('/',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:'your server is up and running.....'
    })
})

app.get('/api/v1',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:'Shi hai'
    })
})

connectDB()
.then(()=>{

    console.log('DB CONNECTED SUCCESSFULLY')

    app.listen(PORT,()=>{
        console.log(`SERVER CREATED AT PORT NO. ${PORT}`)
    })

})
.catch((error)=>{
    console.error(error)
    console.log("DB NOT CONNECTED")
    process.exit(1);
})
