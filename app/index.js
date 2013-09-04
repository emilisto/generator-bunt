'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore');


var KomponentGenerator = module.exports = function KomponentGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(KomponentGenerator, yeoman.generators.Base);

KomponentGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'name',
    message: "What's the name of your bunt module?",
    default: path.basename(process.cwd()),
  }];

  this.prompt(prompts, function (props) {
    this.name = props.name;
    cb();
  }.bind(this));
};

KomponentGenerator.prototype.app = function app() {

  this.mkdir('app');
  this.mkdir('app/templates');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.mkdir('public');

  this.template('styles/main.styl', 'app/styles/main.styl');
  this.template('public/index.html', 'public/index.html');
  this.copy('_index.js', 'app/index.js');
  this.copy('_templates.js', 'app/templates.js');

  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.template('_package.json', 'package.json');
};

KomponentGenerator.prototype.projectfiles = function projectfiles() {
};

