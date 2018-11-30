'use strict';

const Generator = require('yeoman-generator');
var clone = require('git-clone');
var exec = require('child_process').exec;
const DOT_GIT = '.git';
const DIST = '../dist/*';


const GIT_TEMPLATE = 'git@github.com:bizzabo/web-registration.git';
const PREFIX = 'dist/';
//const GIT_TEMPLATE = 'https://github.com/bizzabo/hackathon-2018';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log('Initializing...');
  }

  configuring() {
    var done = this.async();
    exec(`rm -rf  ${DIST}`, function (err, stdout, stderr) {
      if (!err) {
        done();
      } else {
        console.log(err);
      }
    });
  }

  async start() {
    var done = this.async();
    this.answers = await this.prompt([
        {
          type    : 'input',
          name    : 'name',
          required: true,
          message : 'Enter a name for the new service (i.e.: web-<>): '
        }
      ]);
      this.destinationRoot(`${PREFIX}${this.answers.name}`);
      clone(`${GIT_TEMPLATE}`, `.`,{}, function (err) {
        console.log(err)
        exec(`rm -r  ${DOT_GIT}`, function (err, stdout, stderr) {
          if (!err) {
            done();
          } else {
            console.log(err);
          }
        });
        
      });
  }

  writingDocker() {
    var done = this.async();
    this.fs.copyTpl(
      this.templatePath(`Dockerfile`),
      this.destinationPath(`./Dockerfile`),
      { serviceName: this.answers.name }
    );
    done();
  }

  writingPackageJSON() {
    var done = this.async();
    this.fs.delete('.git/**/*')
    this.fs.copyTpl(
      this.templatePath(`package.json`),
      this.destinationPath(`./package.json`),
      { serviceName: this.answers.name }
    );
    this.fs.delete('.git/**/*');
    done();
  }
};