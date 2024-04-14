# All-Inclusive-fitness-App

need to see what allmost hosting ports are so i can start testing

need to make the creat a profile pages / keep one js file running on all of them to colect the data from each prompt, make it interactive
make a template that just puts in the new html each time. / see how to do that react 
need to make a usr profile page
need to set up the rest of the tables sin the database and configure everything
add something to check if emails are valid - also validity checkers for all input boxes, and css to make them red and stuff 
need to make routes in the app.js and database.js to :

-create dynamic queries based on which data points are being compared in the analytics page and serve it to the charts.js

i might lump the place to delete entries into the analytics page idk yet





----moving forword as i learn react im going to be transitioning what i have so far into a react app using vite.
    Ive learned alot about sessions and storing user data, im using redis to store session data.
    have to reformat all of my sql quries to grab the userID using the sessionID that looks for the UserID in the redis.
    I have a better understanding of the general flow thatt wil happen, i need to learn more about creating session cookies
    idk if it does that automatically but i need to send it to the front end in the responce to the initial login request
    and figure out how to set cookies into the browser. Then i need to learn how to access those cookies. I still need to set
    up the sessionID validator to check the status of a session. will have event handelers in the case that a user clicks on somthing
    that reqires a valid session-sessionID cookie and sends them back to the login page.That will be handeled mostly in the react.
    -keep in mind that you can set the TTL in redis for the session but also the expiration of the cookie in the browser.

    ---so when the user first logs in it sends a http request to the express endpoint that then verifys in a mysql database if the credentials are valid and then would maybe query some data from the user profile table to then send back to the front end in the form of a cookie that includes the session information, and every request made from the front end from there on out would send the sessionID back for verification of session validity?
