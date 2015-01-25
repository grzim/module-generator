var projectModules ={
   externalModules : [
      'i18nModule'],
   internalModules : [ ],
   get: function(){
      'use strict';
      return this.externalModules.concat(this.internalModules);
   }
};

var app = {};
app.mainModule = angular.module('app', projectModules.get());