const config = require('../config/index');
const mysql = require('mysql2/promise');

//Models
async function syncTables() {
	try {
		const conection = await mysql.createConnection({
			host: config.dbHost,
			user: config.dbUser,
			password: config.dbPass,
		});
		await conection.query(`CREATE DATABASE IF NOT EXISTS \`${config.dbName}\`;`);
		const userModel = require('../database/user/models/userModel');
		const regionModel = require('../database/region/models/regionModel');
		const cityModel = require('../database/city/models/cityModel');
		const companyModel = require('../database/company/models/companyModel');
		const countryModel = require('../database/country/models/countryModel');
		const contactModel = require('../database/contacts/models/contactModel');
		await userModel.sync();
		await userModel.create(config.root_user);
		await regionModel.sync();
		await countryModel.sync();
		await cityModel.sync();
		await companyModel.sync();
		await contactModel.sync();
	} catch (error) {
		console.log(error);
		/* 	process.exit(1); */
	}
	process.exit(0);
}

syncTables();
