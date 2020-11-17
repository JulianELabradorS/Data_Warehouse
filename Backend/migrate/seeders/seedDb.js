const userModel = require('../../database/user/models/userModel');
const regionModel = require('../../database/region/models/regionModel');
const countryModel = require('../../database/country/models/countryModel');
const cityModel = require('../../database/city/models/cityModel');
const companyModel = require('../../database/company/models/companyModel');
const contactModel = require('../../database/contacts/models/contactModel');
const bCrypt = require('bcrypt');
const config = require('../../config/index');

let users = [
	{ isAdmin: false, name: 'Collie', last_name: 'Mabey', email: 'cmabey0@sciencedaily.com', password: 'jyYf9Us768' },
	{ isAdmin: false, name: 'Lissie', last_name: 'Gladden', email: 'lgladden1@amazon.co.uk', password: '3KYQRadJBt' },
	{ isAdmin: false, name: 'Sonnie', last_name: 'Humpherson', email: 'shumpherson2@amazonaws.com', password: 'RPpeyQ' },
	{ isAdmin: false, name: 'Antonie', last_name: 'Coleman', email: 'acoleman3@so-net.ne.jp', password: 'rVdQ2E' },
	{ isAdmin: false, name: 'Georgi', last_name: 'MacTavish', email: 'gmactavish4@imdb.com', password: '6PkYCf2fj' },
	{
		isAdmin: false,
		name: 'Roxanna',
		last_name: 'Puddefoot',
		email: 'rpuddefoot5@printfriendly.com',
		password: 'ZXRjVI6',
	},
	{ isAdmin: false, name: 'Whitaker', last_name: 'Porrett', email: 'wporrett6@mozilla.com', password: 'B4L66MhOm' },
	{ isAdmin: true, name: 'Prescott', last_name: 'Buttriss', email: 'pbuttriss7@prlog.org', password: 'Zv2l7fOhhqB' },
	{
		isAdmin: false,
		name: 'Agathe',
		last_name: 'McFarlan',
		email: 'amcfarlan8@instagram.com',
		password: '9EKwx3ZcfYGj',
	},
	{ isAdmin: true, name: 'Ellie', last_name: 'Showering', email: 'eshowering9@soundcloud.com', password: 'eOtOuqbau9' },
];

let regions = [{ name: 'LATAM' }, { name: 'CEE' }, { name: 'EMEA' }, { name: 'EUA' }];
let countries = [
	{ regionId: 4, name: 'Finland' },
	{ regionId: 4, name: 'Bosnia and Herzegovina' },
	{ regionId: 2, name: 'Philippines' },
	{ regionId: 2, name: 'Russia' },
	{ regionId: 1, name: 'Madagascar' },
	{ regionId: 3, name: 'United States' },
	{ regionId: 2, name: 'Pakistan' },
	{ regionId: 3, name: 'Indonesia' },
	{ regionId: 1, name: 'China' },
	{ regionId: 2, name: 'Russia' },
];
let cities = [
	{ countryId: 9, name: 'Independencia' },
	{ countryId: 1, name: 'Bitam' },
	{ countryId: 6, name: 'Aya' },
	{ countryId: 8, name: 'Fartura' },
	{ countryId: 8, name: 'Prestea' },
	{ countryId: 8, name: 'Zhongzi' },
	{ countryId: 10, name: 'Aghsu' },
	{ countryId: 5, name: 'Kanashevo' },
	{ countryId: 4, name: 'San José de Miranda' },
	{ countryId: 2, name: 'Itápolis' },
	{ countryId: 7, name: 'Nyaungdon' },
	{ countryId: 10, name: 'Guadalupe Victoria' },
	{ countryId: 6, name: 'Fengcheng' },
	{ countryId: 6, name: 'Primorka' },
	{ countryId: 6, name: 'Koga' },
	{ countryId: 2, name: 'Pueblo Nuevo Viñas' },
	{ countryId: 6, name: 'Novokuz’minki' },
	{ countryId: 1, name: 'Zadawa' },
	{ countryId: 7, name: 'Yangtan' },
	{ countryId: 6, name: 'Tyazhinskiy' },
	{ countryId: 8, name: 'Marseille' },
	{ countryId: 9, name: 'Ðà Lạt' },
	{ countryId: 9, name: 'Zhukeng' },
	{ countryId: 3, name: 'Hongguang' },
	{ countryId: 7, name: 'Helin' },
	{ countryId: 1, name: 'Mascouche' },
	{ countryId: 10, name: 'Banjar Pekandelan' },
	{ countryId: 3, name: 'Kortkeros' },
	{ countryId: 2, name: 'Sơn Tây' },
	{ countryId: 9, name: 'Mandala' },
	{ countryId: 3, name: 'Bom Jesus da Lapa' },
	{ countryId: 2, name: 'Liujia' },
	{ countryId: 3, name: 'Cikujang' },
	{ countryId: 9, name: 'Bogolyubovo' },
	{ countryId: 3, name: 'Lianran' },
	{ countryId: 7, name: 'Tibati' },
	{ countryId: 6, name: 'Jagiełła' },
	{ countryId: 1, name: 'Oslo' },
	{ countryId: 6, name: 'El Paso' },
	{ countryId: 3, name: 'Ernestinovo' },
	{ countryId: 2, name: 'Verkhnevilyuysk' },
	{ countryId: 7, name: 'Noyal-sur-Vilaine' },
	{ countryId: 5, name: 'Yuyao' },
	{ countryId: 4, name: 'Corredoura' },
	{ countryId: 4, name: 'Xianqiao' },
	{ countryId: 3, name: 'Bader' },
	{ countryId: 8, name: 'Chengcun' },
	{ countryId: 6, name: 'Ciheras' },
	{ countryId: 6, name: 'Krajan Gading' },
	{ countryId: 8, name: 'Lensk' },
];
let companies = [
	{ name: 'Leexo', address: '475 Melvin Road', phone: '618-309-2101', email: 'avials0@state.gov', cityId: 41 },
	{ name: 'Zoonder', address: '352 Cordelia Circle', phone: '523-613-9089', email: 'tmcelvine1@fda.gov', cityId: 1 },
	{
		name: 'Rhybox',
		address: '34 Lindbergh Terrace',
		phone: '912-207-4782',
		email: 'dhardern2@berkeley.edu',
		cityId: 29,
	},
	{ name: 'Janyx', address: '2 Pond Plaza', phone: '757-556-3981', email: 'rsimms3@squarespace.com', cityId: 33 },
	{ name: 'Skajo', address: '66 Kings Street', phone: '372-754-7562', email: 'plembrick4@lulu.com', cityId: 29 },
	{
		name: 'Camido',
		address: '6801 Packers Trail',
		phone: '875-428-7330',
		email: 'mjankovsky5@indiegogo.com',
		cityId: 19,
	},
	{
		name: 'Divavu',
		address: '6847 Montana Trail',
		phone: '769-992-0384',
		email: 'rcartledge6@tinypic.com',
		cityId: 25,
	},
	{
		name: 'Dazzlesphere',
		address: '12 Lien Point',
		phone: '454-886-2052',
		email: 'fprestige7@webeden.co.uk',
		cityId: 47,
	},
	{
		name: 'Camimbo',
		address: '4705 Mayfield Crossing',
		phone: '860-241-4633',
		email: 'mlabastida8@upenn.edu',
		cityId: 16,
	},
	{ name: 'Mydeo', address: '59710 Blaine Hill', phone: '930-637-2166', email: 'jramsey9@ibm.com', cityId: 42 },
	{ name: 'Feedspan', address: '8 Summit Center', phone: '528-126-1600', email: 'tpenninoa@examiner.com', cityId: 10 },
	{
		name: 'Flashpoint',
		address: '92 Londonderry Circle',
		phone: '589-417-0339',
		email: 'tskirvinb@sfgate.com',
		cityId: 21,
	},
	{ name: 'Quire', address: '79972 Hintze Plaza', phone: '816-532-3856', email: 'pscurfieldc@ed.gov', cityId: 27 },
	{ name: 'Kwilith', address: '830 Mifflin Trail', phone: '496-302-3262', email: 'akernard@ocn.ne.jp', cityId: 6 },
	{
		name: 'Dynabox',
		address: '8777 Butterfield Center',
		phone: '946-878-6083',
		email: 'cspohre@dion.ne.jp',
		cityId: 37,
	},
	{ name: 'Ainyx', address: '28887 Fisk Avenue', phone: '975-651-2067', email: 'cibanezf@live.com', cityId: 32 },
	{ name: 'Pixoboo', address: '4680 Arrowood Point', phone: '680-885-7145', email: 'lbeninig@tmall.com', cityId: 4 },
	{
		name: 'Realblab',
		address: '5 Oriole Center',
		phone: '215-793-2501',
		email: 'eescalanteh@woothemes.com',
		cityId: 5,
	},
	{
		name: 'Innotype',
		address: '0258 Service Drive',
		phone: '788-398-0680',
		email: 'nrydzynskii@mayoclinic.com',
		cityId: 42,
	},
	{
		name: 'Brightdog',
		address: '9181 Summerview Trail',
		phone: '958-805-1530',
		email: 'klogesdalej@psu.edu',
		cityId: 33,
	},
];
let contacts = [
	{
		name: 'Madeline',
		last_name: 'Sloan',
		phone: '943-940-1030',
		email: 'msloan0@mac.com',
		occupation: 'Office Assistant IV',
		companyId: 7,
		cityId: 7,
		address: '9904 Starling Alley',
	},
	{
		name: 'Patricio',
		last_name: 'Wythill',
		phone: '611-701-3839',
		email: 'pwythill1@amazon.com',
		occupation: 'Staff Scientist',
		companyId: 9,
		cityId: 7,
		address: '8776 Rieder Point',
	},
	{
		name: 'Nils',
		last_name: 'Salsberg',
		phone: '963-634-7036',
		email: 'nsalsberg2@thetimes.co.uk',
		occupation: 'Assistant Manager',
		companyId: 4,
		cityId: 40,
		address: '5 Talmadge Park',
	},
	{
		name: 'Adda',
		last_name: 'Kenninghan',
		phone: '993-528-9339',
		email: 'akenninghan3@google.fr',
		occupation: 'Account Coordinator',
		companyId: 10,
		cityId: 8,
		address: '734 Chive Lane',
	},
	{
		name: 'Pamella',
		last_name: 'Surcomb',
		phone: '292-856-4566',
		email: 'psurcomb4@patch.com',
		occupation: 'Senior Editor',
		companyId: 19,
		cityId: 29,
		address: '5 Sauthoff Avenue',
	},
	{
		name: 'Priscilla',
		last_name: 'Clappson',
		phone: '843-476-5798',
		email: 'pclappson5@macromedia.com',
		occupation: 'Design Engineer',
		companyId: 5,
		cityId: 28,
		address: '756 Mockingbird Hill',
	},
	{
		name: 'Guy',
		last_name: 'Bartalot',
		phone: '583-491-1376',
		email: 'gbartalot6@biblegateway.com',
		occupation: 'Engineer III',
		companyId: 6,
		cityId: 34,
		address: '1 Dunning Point',
	},
	{
		name: 'Myrna',
		last_name: 'Shovell',
		phone: '891-953-9955',
		email: 'mshovell7@admin.ch',
		occupation: 'Analyst Programmer',
		companyId: 11,
		cityId: 41,
		address: '95235 Ridgeview Terrace',
	},
	{
		name: 'Billye',
		last_name: 'Suddick',
		phone: '238-531-1750',
		email: 'bsuddick8@independent.co.uk',
		occupation: 'Staff Scientist',
		companyId: 14,
		cityId: 10,
		address: '66249 Weeping Birch Point',
	},
	{
		name: 'Concettina',
		last_name: 'Jakubczyk',
		phone: '976-524-4429',
		email: 'cjakubczyk9@php.net',
		occupation: 'GIS Technical Architect',
		companyId: 4,
		cityId: 39,
		address: '2 Hanson Drive',
	},
	{
		name: 'Moise',
		last_name: 'Grundle',
		phone: '641-121-0185',
		email: 'mgrundlea@buzzfeed.com',
		occupation: 'Recruiting Manager',
		companyId: 10,
		cityId: 41,
		address: '211 Pleasure Hill',
	},
	{
		name: 'Kirk',
		last_name: 'Foresight',
		phone: '655-119-1296',
		email: 'kforesightb@ezinearticles.com',
		occupation: 'Programmer Analyst IV',
		companyId: 1,
		cityId: 27,
		address: '9 Mariners Cove Alley',
	},
	{
		name: 'Muhammad',
		last_name: 'Millington',
		phone: '409-600-8833',
		email: 'mmillingtonc@typepad.com',
		occupation: 'Budget/Accounting Analyst IV',
		companyId: 12,
		cityId: 3,
		address: '43713 Ridgeview Terrace',
	},
	{
		name: 'Abie',
		last_name: 'Molloy',
		phone: '527-240-6495',
		email: 'amolloyd@unc.edu',
		occupation: 'Quality Engineer',
		companyId: 7,
		cityId: 31,
		address: '2955 Hallows Lane',
	},
	{
		name: 'Waldon',
		last_name: 'Coleiro',
		phone: '594-438-3869',
		email: 'wcoleiroe@csmonitor.com',
		occupation: 'Financial Advisor',
		companyId: 8,
		cityId: 20,
		address: '0162 Meadow Ridge Avenue',
	},
	{
		name: 'Aloysius',
		last_name: 'Millard',
		phone: '998-184-8579',
		email: 'amillardf@soup.io',
		occupation: 'Recruiting Manager',
		companyId: 12,
		cityId: 45,
		address: '8 Hauk Place',
	},
	{
		name: 'Farley',
		last_name: 'Cowser',
		phone: '748-748-8531',
		email: 'fcowserg@reference.com',
		occupation: 'Associate Professor',
		companyId: 13,
		cityId: 28,
		address: '8254 Maywood Road',
	},
	{
		name: 'Alexandra',
		last_name: 'Ector',
		phone: '963-253-1424',
		email: 'aectorh@blogs.com',
		occupation: 'VP Accounting',
		companyId: 4,
		cityId: 18,
		address: '3422 American Ash Plaza',
	},
	{
		name: 'Lyon',
		last_name: 'Micklem',
		phone: '935-762-0114',
		email: 'lmicklemi@hibu.com',
		occupation: 'Physical Therapy Assistant',
		companyId: 15,
		cityId: 27,
		address: '6 Arkansas Way',
	},
	{
		name: 'Blake',
		last_name: 'Klimowski',
		phone: '957-609-8454',
		email: 'bklimowskij@weather.com',
		occupation: 'Design Engineer',
		companyId: 19,
		cityId: 50,
		address: '671 Hudson Terrace',
	},
];
users.forEach(async (user) => {
	await bCrypt.hash(user.password, parseInt(config.rounds_bcr), function (error, encrypted) {
		if (error) {
			console.log(error);
		} else {
			user.password = encrypted;
			userModel
				.create(user)
				.then((user) => {
					console.log('usuarios creados');
				})
				.catch((error) => {
					console.log(error);
				});
		}
	});
});
regions.forEach(async (region) => {
	try {
		await regionModel.create(region);
	} catch (error) {
		console.log(error);
	}
});
countries.forEach(async (country) => {
	try {
		countryModel.create(country);
	} catch (error) {
		console.log(error);
	}
});
cities.forEach(async (city) => {
	try {
		cityModel.create(city);
	} catch (error) {
		console.log(error);
	}
});
companies.forEach(async (company) => {
	try {
		companyModel.create(company);
	} catch (error) {
		console.log(error);
	}
});
contacts.forEach(async (contact) => {
	try {
		contactModel.create(contact);
	} catch (error) {
		console.log(error);
	}
});
