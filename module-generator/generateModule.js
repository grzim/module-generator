var touch = require("touch");
var fs = require('fs');
var configs = require('./generationConfigs');



function init() {
  var moduleName = process.argv[2];
  var path = configs.jsFilesPath;
  if (typeof moduleName === 'undefined') {
     // if no name defined just update html
     return indexUpdate();
  }
   //create folder for module and files
  var fullPath = path + "/" + moduleName;
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
  fs.mkdirSync(fullPath);

   //create files in a folder
  createFiles();

   //after craeation add module name to the main module
   (function updateMainModule() {
     var file = configs.coreModule;
     fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
           return console.log(err);
        }
        var result = data.replace("internalModules : [", "internalModules : [\n      '" + moduleName + "Module',");
        result = result.replace(",]", "]").replace(", ]", "]");
        fs.writeFile(file, result, 'utf8', function (err) {
           if (err) return console.log(err);
           indexUpdate();
        });
     });
  })();
}

//update index.html from index.tpl.html
function indexUpdate(){
  var exec = require('child_process').exec;
  exec('grunt includeSource -v', function(error, stdout, stderr) {
     if (error !== null) {
        console.log('exec error: ' + error);
     }
  });
}

function createFiles(){
  var name = process.argv[2];
  var path = configs.jsFilesPath + "/" + process.argv[2];
  var modulePath = path + "/" + name;
  console.log("\nin " + path);

  var generateFiles = function(){
     var suffixes = arguments;

     var generate = function(suffix){
        switch(suffix){
           case "Ctrl":
              return name + ".controller('" + name + suffix + "', function($scope){\n   'use strict';\n});";
           case "Drtv":
              return name + ".directive('" + name + "', function(){\n   'use strict';\n" +
              "   var template = '" + path + "/" + name + ".html';\n   return {\n      restrict:'AE',\n      controller:'"+name+"Ctrl',\n       templateUrl: template,\n       compile: function(elem){ \n         elem.attr('templateurl', template);\n      }\n   };\n});" ;
           case "Service":
              return name + ".service('" + name +  suffix + "', function(){\n   'use strict';\n});";
           case ".module":
              return name + " = angular.module('" + name +  "Module', []);";
        }
     };

     var generateNgDocs = function(suffix){
        var ngDocs =  ((suffix === ".module") || (suffix === "Ctrl") || (suffix === "Service"))  ? "service" : (suffix === "Drtv" ? "directive" : "");
        var ngName = (suffix === ".module") ? name+"Module" : ((suffix === "Service")  ? name+"Module"+"."+name+"Service" : (suffix === "Drtv" ? name + "Drtv" : (suffix==="Ctrl" ? name+"Module"+".controllers:"+name+"Ctrl":"")));
        return docs = "/**" +
        "\n*"+
        "\n* @ngdoc " + ngDocs +
        "\n* @name "  + ngName +
        "\n* @description " +
        "\n*" +
        "\n* @Author: " + configs.author +
        "\n*/\n"
     };
     for (var i in suffixes) {
        (function create(i) {
           var suffix = suffixes[i];
           var ngDocs = generateNgDocs(suffix);
           var fileName = modulePath + suffix + ".js";
           touch(fileName);
           console.log("---------> " + name + suffix + ".js");
           ngDocs = ngDocs.replace("@name:", "@name: " + name + (suffix !== "Drtv" ? (suffix !== ".module" ? suffix : "Module") : "")) + "\n" + configs.appName + "." + generate(suffix);

           fs.writeFile(fileName, ngDocs, 'utf8', function (err) {
              if (err) return console.log(err);
           });
        })(i);
     }
  };

  var generateLess = function(){
     fs.mkdirSync(path + "/" + "styles");
     console.log("---------> styles");
     touch(path + "/styles/"+ name + ".less");
     var base = '@import "../../../../../../styles/base";\n';
     fs.writeFile(path + "/styles/"+ name + ".less", base+"\n#"+name+"Component{\n}", 'utf8', function (err) {
        if (err) return console.log(err);
     });
     console.log("-------------->"+ name + ".less");
  };

  var generateView = function(){
     console.log("---------> " + name + ".html");
     touch(path + "/" + name + ".html");
     var text = "<div id=\""+name+"Component\">\n</div>";
     fs.writeFile(path + "/" + name + ".html", text, 'utf8', function (err) {
        if (err) return console.log(err);
     });
  };

  var generateTests = function(){
     var testPath = configs.testsPath;
     var suffixes = arguments;
     var name = process.argv[2];

     if (!fs.existsSync(testPath)){
        fs.mkdirSync(testPath);
     }
     fs.mkdirSync(testPath + "/" + name);
     for (var i in suffixes) {
        var suffix = suffixes[i];
        if(suffix === '.module'){
            continue;
        }
        var fileName = testPath +"/"+ name +"/"+ name + suffix + ".test.js";
        (function createTest(i) {
           touch(fileName);
           var data = "describe('"+ name + suffix +"', function(){\n\"use strict\";\n};"
           fs.writeFile(fileName, data, 'utf8', function (err) {
              if (err) return console.log(err);
           });
        })(i);
     }
  };

   generateFiles('Ctrl','Drtv','Service','.module');
   generateLess();
   generateView();
   generateTests('Ctrl','Drtv','Service','.module');
}

init();