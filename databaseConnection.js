const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfigLocal = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	multipleStatements: false,
	namedPlaceholders: true
};

const database = mysql.createPool(dbConfigLocal);

async function initializeDatabase() {
	try {
		console.log("Initializing database...");

		await database.query(`
			CREATE TABLE IF NOT EXISTS web_user (
				web_user_id INT NOT NULL AUTO_INCREMENT,
				first_name VARCHAR(50) NOT NULL,
				last_name VARCHAR(50) NOT NULL,
				email VARCHAR(250) NOT NULL,
				password_hash VARCHAR(200) DEFAULT NULL,
				PRIMARY KEY (web_user_id)
			);
		`);

		await database.query(`
			CREATE TABLE IF NOT EXISTS pet_type (
				pet_type_id INT NOT NULL AUTO_INCREMENT,
				type VARCHAR(50) NOT NULL,
				PRIMARY KEY (pet_type_id),
				UNIQUE KEY type_UNIQUE (type)
			);
		`);

		await database.query(`
			CREATE TABLE IF NOT EXISTS pet (
				pet_id INT NOT NULL AUTO_INCREMENT,
				web_user_id INT NOT NULL,
				name VARCHAR(50) NOT NULL,
				pet_type_id INT NOT NULL,
				image_id VARCHAR(100) DEFAULT NULL,
				PRIMARY KEY (pet_id),
				KEY pet_pet_type_id_idx (pet_type_id),
				KEY pet_web_user_id_idx (web_user_id),
				CONSTRAINT pet_pet_type_id
					FOREIGN KEY (pet_type_id) REFERENCES pet_type (pet_type_id),
				CONSTRAINT pet_web_user_id
					FOREIGN KEY (web_user_id) REFERENCES web_user (web_user_id)
			);
		`);

		await database.query(`
			INSERT INTO web_user (web_user_id, first_name, last_name, email, password_hash)
			SELECT 1, 'Joe', 'Acreman', 'jam@gmail.com',
			'$2a$12$Tr70rVINT3Skq2PCwsOUGegt9AbNo3UtJDBjT2lbnH/y6ADzkTcAO'
			WHERE NOT EXISTS (
				SELECT 1 FROM web_user WHERE web_user_id = 1
			);
		`);

		await database.query(`
			INSERT INTO pet_type (pet_type_id, type)
			SELECT 1, 'cat'
			WHERE NOT EXISTS (
				SELECT 1 FROM pet_type WHERE pet_type_id = 1
			);
		`);

		await database.query(`
			INSERT INTO pet_type (pet_type_id, type)
			SELECT 2, 'dog'
			WHERE NOT EXISTS (
				SELECT 1 FROM pet_type WHERE pet_type_id = 2
			);
		`);

		await database.query(`
			INSERT INTO pet_type (pet_type_id, type)
			SELECT 3, 'fish'
			WHERE NOT EXISTS (
				SELECT 1 FROM pet_type WHERE pet_type_id = 3
			);
		`);

		await database.query(`
			INSERT INTO pet (pet_id, web_user_id, name, pet_type_id, image_id)
			SELECT 1, 1, 'Spark', 1, '4fed88ad-b8d1-4b17-a9ea-c752deac4d6c'
			WHERE NOT EXISTS (
				SELECT 1 FROM pet WHERE pet_id = 1
			);
		`);

		await database.query(`
			INSERT INTO pet (pet_id, web_user_id, name, pet_type_id, image_id)
			SELECT 2, 1, 'Corndog', 2, '7ba956ab-c772-49c3-8721-352c2634e517'
			WHERE NOT EXISTS (
				SELECT 1 FROM pet WHERE pet_id = 2
			);
		`);

		console.log("Database initialization complete.");
	} catch (err) {
		console.error("Error initializing database:", err);
		throw err;
	}
}

module.exports = {
	query: (...args) => database.query(...args),
	initializeDatabase
};