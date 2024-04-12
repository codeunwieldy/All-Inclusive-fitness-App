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
 export async function creatProfile(first_name, last_name, username, email, password, height, age, weight) {
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

// Call the fetchData function to execute the query
fetchData();