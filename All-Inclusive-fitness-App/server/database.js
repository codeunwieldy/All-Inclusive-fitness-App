import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
     host: 'localhost',
     user: process.env.DB_user,
     password: process.env.DB_psword,
     database: process.env.DB_name
 });

export async function fetchData(userId) {
    try {
       const result = await pool.query(`SELECT weight FROM userprofile WHERE user_id = ?`,[userId]);
        console.log(result);
    } catch (error) {
        console.error('Error executing query:', error);
    }
}
export async function findUser(email){
     try {
          const result = await pool.query(`SELECT * FROM userprofile WHERE email = ? LIMIT 1;`,[email]);
           return result[0][0];
       } catch (error) {
           console.error('Error executing query:', error);
       }
}
//////////////////////////////////////////
export async function getProfile(id) {
     try {
         const [rows] = await pool.query(`SELECT * FROM userprofile WHERE user_id = ?`, [id]);
         return rows[0];
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error retrieving profile');
     }
 }
 export async function createProfile(email, password) { //just for testing
     try {
         const [result] = await pool.query(`
         INSERT INTO userprofile (email, passwrd) 
         VALUES (?, ?)`, [email, password]);
         const id = result.insertId;
         return getProfile(id);
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error creating profile');
     }
 }
 /*
 export async function createProfile(first_name, last_name, username, email, password, height, age, weight) {
     try {
         const [result] = await pool.query(`
         INSERT INTO userprofile (first_name, last_name, username, email, password, height, age, weight) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [first_name, last_name, username, email, password, height, age, weight]);
         const id = result.insertId;
         return getProfile(id);
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error creating profile');
     }
 }*/
 //////////////////////////////////////
 export async function deleteProfile(request) {
     try {
          const{sessionID} = request
          const user_id = await getSessionUserID(sessionID);
         const [result] = await pool.query(`
         DELETE FROM userprofile WHERE user_id = ?`, [user_id]);
          // return somthing here put in later
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error deleting profile');
     }
 }
 export async function updateProfile(request) { //this recives the needed values to update as an object thats comes in the sessionID and the data:data1,data2..
     try {
         const{sessionID,data} = request;
         const user_id = await getSessionUserID(sessionID);
         // Construct the SET clause dynamically based on the provided data
         const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
 
         // Construct the values array containing the updated data
         const values = [...Object.values(data), user_id];
 
         // Execute the dynamic SQL query
         const [rows] = await pool.query(`UPDATE userprofile SET ${setClause} WHERE user_id = ?`, values);
         
         return rows[0]; // just returning the updated row
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error updating profile');
     }
 }
 
 export async function putCalories(calories,request) {
     try {
          const{sessionID} = request;
          const UserID = await getSessionUserID(sessionID);
          const [result] = await pool.query(`
         INSERT INTO caloriedata (calories,UserID) 
         VALUES (?,?)`, [calories,UserID]);
         //maybe i should return the insertID here idk
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error adding calories');
     }
 }
 export async function deleteCalories(insertID, request) {
     try {
          const{sessionID} = request;
          const UserID = await getSessionUserID(sessionID);
         const [result] = await pool.query(`
         DELETE FROM caloriedata WHERE calorie_id = ? AND UserID = ?`, [insertID,UserID]);
     // return somthing here put in later
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error creating profile');
     }
 }
 export async function getAllCalories(request) {
     try {
          const{sessionID} = request;
          const UserID = await getSessionUserID(sessionID);
         const [result] = await pool.query(`
         SELECT * from caloriedata WHERE UserID = ? `, [UserID]);
         return result[0]; //returns hte calorie_id,calories,calorie_date and UserID
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error creating profile');
     }
 }
 export async function putWeight(weight,request) {
     try {
          const{sessionID} = request;
          const UserID = await getSessionUserID(sessionID);
         const [result] = await pool.query(`
         INSERT INTO weightupdates (Weight,UserID) 
         VALUES (?,?)`, [weight,UserID]);
         const [resultprofile] = await pool.query(`
         INSERT INTO userprofile (Weight,user_id) 
         VALUES (?,?)`, [weight,UserID]);
         //maybe i should return the insertID here idk
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error adding weight');
     }
 }
 export async function deleteWeight(insertID, request) {
     try {
          const{sessionID} = request;
          const UserID = await getSessionUserID(sessionID);
         const [result] = await pool.query(`
         DELETE FROM weightupdates WHERE weight_id = ? AND UserID = ?`, [insertID,UserID]);
     // return somthing here put in later
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error deleting weight data');
     }
 }
 export async function getAllWeight(request) {
     try {
          const{sessionID} = request;
          const UserID = await getSessionUserID(sessionID);
         const [result] = await pool.query(`
         SELECT * from weightupdates WHERE UserID = ? `, [UserID]);
         return result[0]; //returns the UserID weight updateDate and weight_id
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error getting weight data');
     }
 }

 export async function putLifts(weight,request) {
     try {
          const{sessionID} = request
         const UserID = await getSessionUserID(sessionID);
         const [result] = await pool.query(`
         INSERT INTO lifts (exercise_type,UserID) 
         VALUES (?,?)`, [weight,UserID]);
         //maybe i should return the insertID here idk
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error adding lift');
     }
 }

 export async function deleteLifts(insertID,request) {
     try {
          const{sessionID} = request
         const UserID = await getSessionUserID(sessionID);
         const [result] = await pool.query(`
         DELETE FROM weightupdates WHERE weight_id = ? AND UserID = ?`, [insertID,UserID]); 
         
         //maybe i should return the insertID here idk 
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error deleting lift');
     }
 }
 export async function getAllLifts(request) {
     try {
          const{sessionID} = request
          const UserID = await getSessionUserID(sessionID);
         const [result] = await pool.query(`
         SELECT * from lifts WHERE UserID = ? `, [UserID]);
         return result[0]; //returns the UserID weight updateDate and weight_id
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error getting lifts data');
     }
 }
 export async function get2ForAnalytics(request) { //request is an object or array that contains the {UserID: ,table1,dataType1: , table2, dataType2: }
     try {
          const {sessionID,table1,dataType1,table2,dataType2} = request
           // Retrieve user ID associated with the session ID from your session store (e.g., Redis)
          const UserID = await getSessionUserID(sessionID); /// need to make this
          // Construct the SQL query string
        const queryString = `
        SELECT t1.*, t2.*
        FROM ${table1} t1
        JOIN ${table2} t2 ON t1.UserID = t2.UserID
        WHERE t1.UserID = ? AND t2.dataType1 = ? AND t2.dataType2 = ?`;
          const [result] = await pool.query(queryString, [UserID, dataType1, dataType2]);
         return result[0]; //returns the UserID weight updateDate and weight_id
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error getting Analytics data');
     }
 }

///////////////////////////////////////////////////////////////////////////////////////
/*next make the lifts call that can take in any of the exercises, get them dynamically based on whats asked for,
this will go  into a graph comparing a certain lift vs somthign else.
so will get the excercise entry and the amount with it.
can add in new lift with what type of lift and the amount*/