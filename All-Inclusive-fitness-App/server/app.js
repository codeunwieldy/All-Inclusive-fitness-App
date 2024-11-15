import express from 'express';
import bcrypt from 'bcryptjs'
import session from 'express-session';
import RedisStore from 'connect-redis';
import pkg from 'redis';
const { createClient } = pkg;
import dotenv from 'dotenv';
import cors from 'cors';
import { generateToken } from './jwtUtils.js';
import {authenticateJWT} from './authMiddleware.js'

dotenv.config();


import{fetchData, createProfile,getProfile,deleteProfile,updateProfile,putCalories,deleteCalories,getAllCalories,putWeight,deleteWeight,getAllWeight,findUser} from './database.js';

const app = express();



const corsOptions = {
    origin: ['http://127.0.0.1:5500'],  
    credentials: true,
};
app.use(cors(corsOptions));

/*
let redisClient; 
const initializeRedis = async () => {
    redisClient = createClient({
        password: process.env.REDIS_PSWORD,
        socket: {
            host: 'redis-11822.c15.us-east-1-2.ec2.redns.redis-cloud.com',
            port: 11822
        }
    });

    try {
        await redisClient.connect();
    } catch (error) {
        console.error(error);
    }
};


initializeRedis();

const redisStore = new RedisStore({ client: redisClient, prefix: "myapp:" });
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: redisStore,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        path: '/',
        
    }
}));
*/

app.use(express.json());


app.get('/',(req,res)=>{
    req.session.isAuth = true
    console.log( req.session)
    res.send('hello session')
})


app.post("/signUp", async(req,res) =>{
    const {email, password} = req.body;
    
    try {

        const hashedPsw = await bcrypt.hash(password,10)

        const user = await createProfile(email, hashedPsw); //go back and put in everything
        // Set session data after successful profile creation
        const token= generateToken(user);
        

        // Send back the token and the redirect url
        res.status(201).json({
            token,  
            redirectUrl:"http://127.0.0.1:5500/All-Inclusive-fitness-App/client/pages/index.html"
        })
        
        
    } catch (error) {
        console.error('Error in creating profile:', error);
        // Send error response
        res.status(500).json({ error: 'Error in creating profile' });
    }
});


app.post("/logIn", async(req,res) =>{
    const {email,password} = req.body
    try {
        const user = await findUser(email)
        console.log(user);
        if(!user){
            return res.send('http://127.0.0.1:5500/All-Inclusive-fitness-App/client/pages/userLogIn.html')
        }
        const passwordString = String(password);
       console.log((user.passwrd).trim());
        const isMatch = await bcrypt.compare(passwordString,String(user.passwrd).trim())   //look at stack over flow chahe length of password in database
        console.log(password);
        console.log(user.passwrd)
        console.log('ismatch: ',isMatch);
        if(!isMatch){
            return res.send('http://127.0.0.1:5500/All-Inclusive-fitness-App/client/pages/userLogin.html') //here i should be senting the error to change the html to the front
        }
        const token= generateToken(user);
         // Send back the token and the redirect url
         res.status(201).json({
            token,  
            redirectUrl:"http://127.0.0.1:5500/All-Inclusive-fitness-App/client/pages/index.html"
        })
       
    } catch (error) {
        console.error('Error in creating profile:', error);
        // Send error response
        res.status(500).json({ error: 'Error in logging in ' });
    }

});

app.get("/userprofile", async(req,res) =>{
    const {username,email,password,height,weight,age} = req.body
    
});
app.post("/update", async(req,res) =>{
    const { data } = req.body;
    
    try {
        const user = await updateProfile(user_id, data);
        const token= generateToken(user);
        
        res.status(201).send(user); //sending back the new updated user info
    } catch (error) {
        console.error('Error in updating  profile:', error);
        // Send error response
        res.status(500).json({ error: 'Error in updating profile' });
    }
});
app.get("/analytics", async(req,res) =>{
    const {request} = req.body //res.body is an object or array that contains the {UserID: ,table1: ,dataType1: , table2: , dataType2: }
    try {
        const twoTableData = await get2ForAnalytics(request)
        
        res.status(201).send(twoTableData); //sending back the new updated user info
    } catch (error) {
        console.error('Error in getting analytics:', error);
        // Send error response
        res.status(500).json({ error: 'Error in getting analytics' });
    }
    
});
app.post("/analytics", async(req,res) =>{
    const {username,email,password,height,weight,age} = req.body
    
});


app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('something went wrong')
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});