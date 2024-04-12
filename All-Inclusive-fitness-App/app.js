import express from 'express';
import session from 'express-session';

import{fetchData, creatProfile} from 'database.js';

const app = express();

app.use(express.jsob());

app.use(session({
    secret: process.env.SECRET_KEY, // Used to sign the session ID cookie
    resave: false,
    saveUninitialized: false
}));

app.post("/signUp", async(req,res) =>{
    const { first_name, last_name, username, email, password, height, age, weight } = req.body;
    
    try {
        const user = await creatProfile(first_name, last_name, username, email, password, height, age, weight);
        // Set session data after successful profile creation
        req.session.user_id = user.user_id;
        req.session.first_name = user.first_name; 
        req.session.last_name = user.last_name;
        req.session.username = user.username;
        req.session.email = user.email;
        req.session.passwrd = user.passwrd;
        req.session.height = user.height;
        req.session.age = user.age;
        req.session.weight = user.weight;

        // Send response
        res.status(201).end(); //send the 201 back with empty body
    } catch (error) {
        console.error('Error in creating profile:', error);
        // Send error response
        res.status(500).json({ error: 'Error in creating profile' });
    }
});

app.get("/logIn", async(req,res) =>{
    const {username,email,password,height,weight,age} = req.body

});

app.get("/userprofile", async(req,res) =>{
    const {username,email,password,height,weight,age} = req.body
    
});
app.get("/analytics", async(req,res) =>{
    const {username,email,password,height,weight,age} = req.body
    
});
app.post("/analytics", async(req,res) =>{
    const {username,email,password,height,weight,age} = req.body
    
});


app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.seatus(500).send('something went wrong')
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});