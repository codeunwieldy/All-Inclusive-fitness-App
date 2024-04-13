import mysql from 'mysql2/promise'; 

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

export async function getProfile(id) {
     try {
         const [rows] = await pool.query(`SELECT * FROM userprofile WHERE user_id = ?`, [id]);
         return rows[0];
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error retrieving profile');
     }
 }
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
 }
 export async function deleteProfile(user_id) {
     try {
         const [result] = await pool.query(`
         DELETE FROM userprofile WHERE user_id = ?`, [user_id]);
          // return somthing here put in later
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error deleting profile');
     }
 }
 export async function updateProfile(user_id, data) { //this recives the needed values to update as an object 
     try {
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
 
 export async function putCalories(calories,userID) {
     try {
         const [result] = await pool.query(`
         INSERT INTO caloriedata (calories,UserID) 
         VALUES (?,?)`, [calories,userID]);
         //maybe i should return the insertID here idk
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error adding calories');
     }
 }
 export async function deleteCalories(insertID, userID) {
     try {
         const [result] = await pool.query(`
         DELETE FROM caloriedata WHERE calorie_id = ? AND UserID = ?`, [insertID,userID]);
     // return somthing here put in later
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error creating profile');
     }
 }
 export async function getAllClories(userID) {
     try {
         const [result] = await pool.query(`
         SELECT * from caloriedata WHERE UserID = ? `, [userID]);
         return result[0]; //returns hte calorie_id,calories,calorie_date and UserID
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error creating profile');
     }
 }
 export async function putWeight(weight,userID) {
     try {
         const [result] = await pool.query(`
         INSERT INTO weightupdates (Weight,UserID) 
         VALUES (?,?)`, [weight,userID]);
         //maybe i should return the insertID here idk
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error adding weight');
     }
 }
 export async function deleteWeight(insertID, userID) {
     try {
         const [result] = await pool.query(`
         DELETE FROM weightupdates WHERE weight_id = ? AND UserID = ?`, [insertID,userID]);
     // return somthing here put in later
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error deleting weight data');
     }
 }
 export async function getAllWeight(userID) {
     try {
         const [result] = await pool.query(`
         SELECT * from weightupdates WHERE UserID = ? `, [userID]);
         return result[0]; //returns the UserID weight updateDate and weight_id
     } catch (error) {
         console.error('Error executing query:', error);
         throw new Error('Error getting weight data');
     }
 }
 export async function get2ForAnalytics(request) { //request is an object or array that contains the {UserID: ,table1,dataType1: , table2, dataType2: }
     try {
          const {UserID,table1,dataType1,table2,dataType2} = request
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