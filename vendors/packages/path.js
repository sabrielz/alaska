let path = require('path');

path.xbase = path.join(__dirname, '..', '..');
path.xroutes = path.join(path.xbase, 'routes');
path.xmodels = path.join(path.xbase, 'models');
path.xcontrollers = path.join(path.xbase, 'controllers');
path.xvendors = path.join(path.xbase, 'vendors');
path.xpackages = path.join(path.xvendors, 'packages');
path.xstorage = path.join(path.xbase, 'storage');
path.xseeds = path.join(path.xbase, 'seeds');

module.exports = path;