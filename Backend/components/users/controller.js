const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt');
const userModel = require('../../database/user/models/userModel');
const config = require('../../config/index');

const getAllUsers = () => {
	return new Promise((res, rejc) => {
		userModel
			.findAll({ attributes: { exclude: ['password'] } })
			.then((users) => {
				res(users);
			})
			.catch((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};
const getUser = (id) => {
	return new Promise((res, rejc) => {
		userModel
			.findByPk(id, { attributes: { exclude: ['password'] } })
			.then((user) => {
				if (user) {
					res({ user: user });
				} else {
					rejc({ status: 404, message: `El usuario  no xiste` });
				}
			})
			.catch((error) => {
				console.log(error);
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};

const createUser = (data) => {
	return new Promise((res, rejc) => {
		if (!data.name || !data.password || !data.last_name || !data.email) {
			rejc({ status: 400, message: 'Faltan campos, por favor envielos' });
		} else {
			bCrypt.hash(data.password, parseInt(config.rounds_bcr), function (error, encrypted) {
				if (error) {
					rejc({ status: 400, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
				} else {
					data.password = encrypted;
					userModel
						.create(data)
						.then((user) => {
							delete user.dataValues.password;
							res({ message: 'usuario creado con exito' });
						})
						.catch((error) => {
							if (error.fields.email) {
								rejc({ status: 400, message: 'Este email ya esta registrado' });
							} else {
								rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
							}
						});
				}
			});
		}
	});
};
const loginUser = (recibed_password, recibed_email) => {
	return new Promise(async (res, rejc) => {
		if (!recibed_email || !recibed_password) {
			rejc({ status: 400, message: 'Faltan campos, por favor envielos' });
		} else {
			let user = await userModel.findOne({
				where: { email: recibed_email },
				raw: true,
			});
			if (user) {
				bCrypt.compare(recibed_password, user.password, (error, result) => {
					if (error) {
						rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
					}
					if (result) {
						delete user.password;
						res({
							token: jwt.sign(user, config.jwtsecret, {
								expiresIn: '1h',
							}),
						});
					} else {
						rejc({ status: 401, message: `Usuario ó Contraseña incorrectos` });
					}
				});
			} else {
				rejc({ status: 401, message: `Usuario ó Contraseña incorrectos` });
			}
		}
	});
};
const updateUserById = (id, data) => {
	if (data.password) {
		return new Promise((res, rejc) => {
			bCrypt.hash(data.password, parseInt(config.rounds_bcr), function (error, encrypted) {
				data.password = encrypted;
				userModel
					.update(data, { where: { id: id } })
					.then((response) => {
						if (response[0] === 1) {
							res({ message: 'El usuario fue actualizado' });
						} else {
							rejc({ status: 400, message: 'No se Pudo actualizar el usuario.' });
						}
					})
					.catch((error) => {
						rejc({ status: 500, message: 'Intente de nuevo mas tarde.' });
					});
			});
		});
	} else {
		return new Promise((res, rejc) => {
			userModel
				.update(data, { where: { id: id } })
				.then((response) => {
					if (response[0] === 1) {
						res({ message: 'El usuario fue actualizado' });
					} else {
						rejc({ status: 400, message: 'No se Pudo actualizar el usuario.' });
					}
				})
				.catch((error) => {
					rejc({ status: 500, message: 'Intente de nuevo mas tarde.' });
				});
		});
	}
};
const deleteUserById = (id) => {
	return new Promise((res, rejc) => {
		userModel
			.destroy({ where: { id: id } })
			.then((response) => {
				if (response === 1) {
					res({ message: 'Usuario eliminado' });
				} else {
					rejc({ status: 400, message: 'el Usuario no existe o no puede ser eliminado' });
				}
			})
			.then((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};

module.exports = {
	createUser,
	loginUser,
	updateUserById,
	deleteUserById,
	getAllUsers,
	getUser,
};
