let path = require('path');

path.xbase = path.join(__dirname, '..', '..');
path.xroutes = path.join(path.xbase, 'routes');
path.xmodels = path.join(path.xbase, 'models');
path.xcontrollers = path.join(path.xbase, 'controllers');
path.xseeds = path.join(path.xbase, 'seeds');

path.xvendors = path.join(path.xbase, 'vendors');
path.xhelpers = path.join(path.xvendors, 'helpers');
path.xloaders = path.join(path.xvendors, 'loaders');
path.xpackages = path.join(path.xvendors, 'packages');
path.xqueries = path.join(path.xvendors, 'queries');

path.xstorage = path.join(path.xbase, 'storage');
path.xavatar = path.join(path.xstorage, 'avatar');
path.xliterasi = path.join(path.xstorage, 'literasi');
path.xmodul = path.join(path.xstorage, 'modul');
path.xothers = path.join(path.xstorage, 'others');
path.xthumbnail = path.join(path.xstorage, 'thumbnail');

module.exports = path;