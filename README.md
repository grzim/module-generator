# module-generator

A node script for automatic generation angular files in a modular way. <br>
By typing node generateModule.js moduleName the following structure will be created: <br>
 <br>
> scriptsFolder <br>
----> moduleName <br>
---------> moduleNameCtrl.js <br>
---------> moduleNameDrtv.js <br>
---------> moduleNameService.js <br>
---------> moduleName.module.js <br>
---------> styles <br>
-------------->moduleName.less <br>
---------> moduleName.html <br>
> testsFolder <br>
----> moduleName <br>
---------> moduleNameCtrl.test.js <br>
---------> moduleNameDrtv.test.js <br>
---------> moduleNameService.test.js <br>
 <br>
with the content inside: <br>
e.g. <br>
 <br>
app.moduleName.directive('moduleName', function(){ <br>
   'use strict'; <br>
   var template = 'scripts/moduleName/moduleName.html'; <br>
   return { <br>
      restrict:'AE', <br>
      controller:'moduleNameCtrl', <br>
       templateUrl: template, <br>
       compile: function(elem){  <br>
         elem.attr('templateurl', template); <br>
      } <br>
   }; <br>
}); <br>
 <br>

After the creation of files scripts is automaticly running grunt-include-source task that is automaticly updating html file and adding all new cerated .js files.
