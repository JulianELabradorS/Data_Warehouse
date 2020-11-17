const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
//ENV
const config = require('./config/index');
//Routes
const userRoutes = require('./components/users/network');
const locationRoutes = require('./components/location/network');
const companyRoutes = require('./components/company/network');
const contactRoutes = require('./components/contacts/network');

//Database
const db = require('./database/index');

//Express
const app = express();
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'by-content-type' }));
app.use(cors());
app.options('*', cors());
app.use(express.json());

//Routes Implementation
app.use('/user', userRoutes);
app.use('/location', locationRoutes);
app.use('/company', companyRoutes);
app.use('/contact', contactRoutes);

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

//SERVER PORT
app.listen(config.port, () => {
	console.log(`Api escuchando en http://localhost:${config.port}`);
});
