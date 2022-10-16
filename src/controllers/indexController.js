const fs = require('fs');
const path = require('path');

const indexController =
{
	index: (req, res) => {
        res.render('index', { titulo: 'AW Diseños'}); 
    }
}

module.exports = indexController;