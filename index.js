const through = require('through2');
const log = require('fancy-log');
const {magenta, green} = require('ansi-colors');


const defaultOptions = {
  title: 'Vinyl',
  showFiles: true,
  showCount: true
};

module.exports = (options = defaultOptions) => {

  if (options && typeof options == 'string') options = {title: options};
  options = Object.assign(defaultOptions, options);

  let count = 0;

  return through.obj((file, encoding, callback) => {
    if (options.showFiles) log.info(options.title, ':', green(file.relative));
    count++;
    callback(null, file);
  },

  callback => {
    if (options.showCount) log.info(options.title, ':', magenta(count + ' vinyl object(s)'));
    callback();
  });

};
