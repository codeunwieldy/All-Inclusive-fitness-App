import mysql from 'mysql2/promise'; 

async function fetchData() {
    try {
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'Verocity25!',
            database: 'mydb'
        });

        const result = await pool.query('SELECT * FROM userprofile');
        console.log(result);
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

// Call the fetchData function to execute the query
fetchData();