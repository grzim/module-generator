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
&emsp;   'use strict'; <br>
&emsp;   var template = 'scripts/moduleName/moduleName.html'; <br>
&emsp;   return { <br>
&emsp;&emsp;      restrict:'AE', <br>
&emsp;&emsp;      controller:'moduleNameCtrl', <br>
&emsp;&emsp;       templateUrl: template, <br>
&emsp;&emsp;       compile: function(elem){  <br>
&emsp;&emsp;&emsp;         elem.attr('templateurl', template); <br>
&emsp;&emsp;  } <br>
&emsp;&emsp;   }; <br>
&emsp;}); <br>
 <br>

After the creation of files scripts is automaticly running grunt-include-source task that is automaticly updating html file and adding all new cerated .js files.
