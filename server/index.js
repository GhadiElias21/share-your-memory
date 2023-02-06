import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from './routes/posts.js'

const  app = express();

dotenv.config()

app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
import dotenv from 'dotenv'
app.use(cors())


app.use('/posts',postRoutes)

const PORT=process.env.PORT || 5000
mongoose.set('strictQuery', true)
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true,useUnifiedTopology:true})
   .then(()=>{
  app.listen(PORT,()=>console.log(`sever running on port: ${PORT}`))
   }).catch(error=>{
    console.log(error.message)
   })

