# module-generator

A node script for automatic generation angular files in a modular way.
By typing node generateModule.js moduleName the following structure will be created:

> scriptsFolder
----> moduleName
---------> moduleNameCtrl.js
---------> moduleNameDrtv.js
---------> moduleNameService.js
---------> moduleName.module.js
---------> styles
-------------->moduleName.less
---------> moduleName.html
> testsFolder
----> moduleName
---------> moduleNameCtrl.test.js
---------> moduleNameDrtv.test.js
---------> moduleNameService.test.js

with the content inside:
e.g.

app.moduleName.directive('moduleName', function(){
   'use strict';
   var template = 'scripts/moduleName/moduleName.html';
   return {
      restrict:'AE',
      controller:'moduleNameCtrl',
       templateUrl: template,
       compile: function(elem){ 
         elem.attr('templateurl', template);
      }
   };
});


After the creation of files scripts is automaticly running grunt-include-source task that is automaticly updating html file and adding all new cerated .js files.
