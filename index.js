const express = require('express');
global.base_dir = __dirname;

global.abs_path = function(path) {
	return base_dir + path;
};

global.include = function(file) {
	return require(abs_path('/' + file));
};
const database = include('databaseConnection');
const router = include('routes/router');
const petModel = include('models/pet');
const petTypeModel = include('models/pet_type');

const port = process.env.PORT || 3000;

async function printMySQLVersion() {
	let sqlQuery = `
		SHOW VARIABLES LIKE 'version';
	`;

	try {
		const results = await database.query(sqlQuery);
		console.log("Successfully connected to MySQL");
		console.log(results[0]);
		return true;
	}
	catch(err) {
		console.log("Error getting version from MySQL");
		console.log(err);
		return false;
	}
}


const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.use('/', router);
app.use(express.static(__dirname + "/public"));

async function startApp() {
    const success = await printMySQLVersion();

    if (!success) {
        console.log("Server not started because MySQL connection failed.");
        return;
    }

    try {
        app.listen(port, () => {
            console.log("Node application listening on port " + port);
        });
    } catch (err) {
        console.error("DB init failed:", err);
    }
}

startApp();