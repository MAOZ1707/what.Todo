const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = require('./app');
const chalk = require('chalk');

dotenv.config({ path: './config.env' });

app.use(cors());
app.use(cors({ origin: true, credentials: true }));

let dbUrl = `mongodb+srv://maoz-cohen:${process.env.DB_PASSWORD}@what-todo.867si.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

if (process.env.DB_URL) {
	dbUrl = process.env.DB_URL;
}

mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log(chalk.green.bold('DB connection successful!!'));
	})
	.catch((err) => console.log(err, chalk.red.bold('DB connection failed!!')));

// server
let port = 8000;