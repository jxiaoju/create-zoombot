let inquirer = require('inquirer');
let utils = require('./utils');
let nodepath=require('path');
const fs = require('fs-extra');
let cwd = process.cwd();
const spawn = require('cross-spawn');
const jsonFormat = require('json-format');


let resource = {
  init( props) {
    let { dist = '' } = props;
    let distUrl = nodepath.join(cwd,dist);
    let src = nodepath.join(__dirname, '../resource', 'commonjs');
    fs.copySync(nodepath.join(src, 'serverless.yml'), nodepath.join(distUrl, 'serverless.yml'));
    fs.copySync(nodepath.join(src, 'serverless.dev.json'), nodepath.join(distUrl, 'serverless.dev.json'));
    fs.copySync(nodepath.join(src, 'serverless.local.json'), nodepath.join(distUrl, 'serverless.local.json'));
    fs.copySync(nodepath.join(src, 'serverless.prod.json'), nodepath.join(distUrl, 'serverless.prod.json'));
    utils.print(
      `you have create serverless config files in current dir`,
      'green'
    );
  },
  _readAndWriteNewJson(distUrl,files,newObj){
    if(!Array.isArray(files)||!distUrl||(typeof newObj!=='object')){return;}
    files.forEach((fi)=>{
      try{
        let ph=nodepath.join(distUrl,fi);
        let packageObject = fs.readJsonSync(ph);
        let newPackageObject=Object.assign(packageObject,newObj);
        fs.writeFileSync(
          ph,
          jsonFormat(newPackageObject),
          'utf8'
        );
      }
      catch(e){
        //
      }
    });

  },
  createStatic(distUrl,name){
    let originDistUrl=distUrl;
    distUrl=distUrl?nodepath.join(distUrl,'static'):nodepath.join(cwd,'static');
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'usePage',
          message: 'whether create react code or not',
          choices: [
            {
              name: 'use react',
              value: 'yes'
            },
            {
              name: 'no use',
              value: 'no'
            }
          ]
        }
      ])
      .then(answers => {
          // let style=answers.style;
          let {  usePage} = answers;
          if(usePage==='no'){return;}
          let src = nodepath.join(__dirname, '../resource', 'static');
          try {
          fs.copySync(src, distUrl);
          } catch (e) {
          utils.print(e, 'red');
          process.exit(1);
          }

          if(name){
            this._readAndWriteNewJson(distUrl,['package.json'],{name});
          }
         
          this._readAndWriteNewJson(originDistUrl,['serverless.local.json','serverless.dev.json','serverless.prod.json'],{stages:{static:true}});

          utils.print(`begin to install react deps in static directory`, 'green');
          spawn.sync('znpm', ['i'], {
            stdio: 'inherit',
            cwd: distUrl
          });

          utils.print(
          `Created react env in static`,
          'green'
          );

          // originDistUrl
     });
  },
  create(appName, props) {
    // let nowrap = props.nowrap;
    let { nowrap = false, dist = '' } = props;
    if (!appName && !nowrap) {
      //nowrap false is wrap,need appName
      // utils.printCol(['error message',`don't point appName`,'[required]'],'red');
      utils.print(
        `appName is not point,you need point just like 'zoom-create-bot create lti'`
      );
      process.exit(1);
    }

    let distUrl = nowrap
      ? nodepath.join(cwd, dist)
      : nodepath.join(cwd, dist, appName);

    if (appName && !nowrap) {
      try {
        fs.statSync(distUrl);
        utils.print(
          `${appName} is exit , you can't create same project name which is exited`,
          'red'
        );
        process.exit(1);
      } catch (e) {
        //you can go on
      }
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'style',
          message: 'select code style',
          choices: [
            {
              name: 'develop lambda application',
              value: 'lambda'
            }
          ]
        }
      ])
      .then(answers => {
        // let style=answers.style;
        let { style } = answers;
        let aimDir;
        switch (style) {
          case 'lambda':
            aimDir = 'lambda';
            break;
          default:
            aimDir = 'lambda';
        }

        let src = nodepath.join(__dirname, '../resource', aimDir);
        let packageObject = fs.readJsonSync(nodepath.join(src, 'package.json'));
        packageObject.name = appName;

        let localObject = fs.readJsonSync(
          nodepath.join(src, 'serverless.local.json')
        );
        let devObject = fs.readJsonSync(
          nodepath.join(src, 'serverless.dev.json')
        );
        let prodObject = fs.readJsonSync(
          nodepath.join(src, 'serverless.prod.json')
        );

        [localObject, devObject, prodObject].forEach(obj => {
          obj.app = appName;
          obj.environment.app = appName;
        });

        try {
          fs.copySync(src, distUrl);
        } catch (e) {
          utils.print(e, 'red');
          process.exit(1);
        }

        // fs.writeJsonSync(nodepath.join(distUrl, 'package.json'), packageObject);
        fs.writeFileSync(nodepath.join(distUrl, 'package.json'), jsonFormat(packageObject),'utf8');
   
        fs.writeFileSync(
          nodepath.join(distUrl, 'serverless.local.json'),
          jsonFormat(localObject),
          'utf8'
        );
        
        // fs.writeJsonSync(
        //   nodepath.join(distUrl, 'serverless.dev.json'),
        //   devObject
        // );
        fs.writeFileSync(
          nodepath.join(distUrl, 'serverless.dev.json'),
          jsonFormat(devObject),
          'utf8'
        );
        // fs.writeJsonSync(
        //   nodepath.join(distUrl, 'serverless.prod.json'),
        //   prodObject
        // );
        fs.writeFileSync(
          nodepath.join(distUrl, 'serverless.prod.json'),
          jsonFormat(prodObject),
          'utf8'
        );

        utils.print(`begin to install deps in ${appName}`, 'green');
        spawn.sync('znpm', ['i'], {
          stdio: 'inherit',
          cwd: distUrl
        });
        utils.print(
          `Created the serverless structure for Zoom bot app "${appName}"`,
          'green'
        );
        this.createStatic(distUrl,appName);
      });
  }
};

module.exports = resource;
