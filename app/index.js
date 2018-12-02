'use strict';

const Generator = require('yeoman-generator');
var clone = require('git-clone');
var exec = require('child_process').exec;
const DOT_GIT = '.git';
const DIST = 'dist/*';


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
    this.destinationRoot(`${PREFIX}`);
    exec(`cd .. && rm -Rf  ${DIST}`, function (err, stdout, stderr) {
      console.log('done', err);
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
          name    : 'projName',
          required: true,
          message : 'Enter a name for the new project (i.e.: web-registration): '
        },
        {
          type    : 'input',
          name    : 'serviceName',
          required: true,
          message : 'Enter a name for the new service (i.e.: webregistration): '
        }
      ]);
      this.destinationRoot(`${PREFIX}${this.answers.projName}`);
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
      { serviceName: this.answers.serviceName, projName: this.answers.projName }
    );
    done();
  }

  writingPackageJSON() {
    var done = this.async();
    this.fs.copyTpl(
      this.templatePath(`package.json`),
      this.destinationPath(`./package.json`),
      { serviceName: this.answers.serviceName, projName: this.answers.projName }
    );
    this.fs.delete('.git/**/*');
    done();
  }

  writingCircleYaml() {
    var done = this.async();
    this.fs.delete('.git/**/*')
    this.fs.copyTpl(
      this.templatePath(`config.yml`),
      this.destinationPath(`.circleci/config.yml`),
      { serviceName: this.answers.serviceName, projName: this.answers.projName }
    );
    this.fs.delete('.git/**/*');
    done();
  }

  createChartFolder() {
    var done = this.async();
    this.destinationRoot(`../charts`);
    const fileNames = [
      'Chart.yaml', 
      'Values.yaml', 
      'templates/_helpers.tpl', 
      'templates/deployment.yaml', 
      'templates/hpa.yaml',
      'templates/ingress.yaml',
      'templates/nginx-configmap.yaml',
      'templates/NOTES.txt',
      'templates/pdb.yaml',
      'templates/server-configmap.yaml',
      'templates/service.yaml'
    ];
    fileNames.forEach(fileName => {
      this.fs.copyTpl(
        this.templatePath(`helm-assembly/${fileName}`),
        this.destinationPath(fileName),
        { serviceName: this.answers.serviceName, projName: this.answers.projName }
      );
    })
    done();
  }
  conflicts(){console.log(arguments);}
};