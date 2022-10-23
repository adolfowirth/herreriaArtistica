const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/usuarios.json");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const User = require('../models/User');

const userController = {
    register: (req, res) => {
		return res.render('register', {titulo: "AW-Registro"});
	},
   
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('register', {titulo: "AW-Registro",
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('register', {titulo: "AW-Registro",
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/user/login');
	},
	
	login: (req, res) => {
		return res.render('userLoginForm',{titulo: "AW-Login"});
	},
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/profile');
			} 
			return res.render('userLoginForm', {titulo: "AW-Login",
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('userLoginForm', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
	profile: (req, res) => {
		return res.render('userProfile', {titulo: "AW-Perfil",
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
}

module.exports = userController;
