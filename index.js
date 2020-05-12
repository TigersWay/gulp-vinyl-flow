const through = require('through2');
const log = require('fancy-log');
const {magenta, green} = require('ansi-colors');
const replaceHomedir = require('replace-homedir');


const defaultOptions = {
  title: 'Vinyl',
  minimal: true,
  showFiles: true,
  showCount: true
};

const tildify = path => replaceHomedir(path, '~');


module.exports = (options = defaultOptions) => {

  if (options && typeof options == 'string') options = {title: options};
  options = Object.assign(defaultOptions, options);

  let count = 0;

  return through.obj((file, encoding, callback) => {
    if (options.showFiles) {
      if (options.minimal) {
        log.info(`${options.title}:`, green(file.relative));
      } else {
        log.info(`${options.title}:`,
          '\n      cwd:', green(tildify(file.cwd)),
          '\n     base:', green(tildify(file.base)),
          '\n     path:', green(tildify(file.path)),
          '\n relative:', green(file.relative));
      }
    }
    count++;
    callback(null, file);
  },

  callback => {
    if (options.showCount) log.info(`${options.title}:`, magenta(count + ' vinyl object(s)'));
    callback();
  });

};
