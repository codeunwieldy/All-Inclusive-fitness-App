import express from 'express';
import session from 'express-session';

import{fetchData, createProfile,getProfile,deleteProfile,updateProfile,putCalories,deleteCalories,getAllClories,putWeight,deleteWeight,getAllWeight} from 'database.js';

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
        const user = await createProfile(first_name, last_name, username, email, password, height, age, weight);
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
app.post("/signUp", async(req,res) =>{
    const { data } = req.body;
    
    try {
        const user = await updateProfile(user_id, data);
        
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
        const twoTableData = await get2ForAnalytics(UserID,request)
        
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
    res.seatus(500).send('something went wrong')
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});