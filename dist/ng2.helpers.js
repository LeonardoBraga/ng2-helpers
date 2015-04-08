(function(undefined) {
  /* global angular */
  'use strict';

  var  helpers = ['Module', 'Component', 'Template', 'Class'],
    angularVersion = angular.version;

  if (angularVersion.major !== 1 || angularVersion.minor < 3) {
    throw new Error('This library requires Angular 1.3 and above.');
  }

  function composeMetaDO(definitionObject, helper, chainedMetaDO) {
    var field = helper[0].toLowerCase() + helper.slice(1) + 'DO',
      helperReplacement = function() {
        throw new Error('You cannot call ' + helper + ' twice in the same composition.');
      };

    helperReplacement.processed = true;

    if (!chainedMetaDO) {
      chainedMetaDO = {};

      helpers.forEach(function(helper) {
        chainedMetaDO[helper] = window[helper];
      });
    }

    chainedMetaDO[field] = definitionObject;
    chainedMetaDO[helper] = helperReplacement;

    process(chainedMetaDO);

    return chainedMetaDO;
  }

  function functionName(fn) {
    try {
      return angular.isFunction(fn) && fn.name || fn.toString().match(/^function\s*([^\s(]+)/)[1];
    } catch(e) { }
  }

  function process(self) {
    var componentDO = self.componentDO,
      templateDO = self.templateDO,
      classDO = self.classDO,
      moduleDO = self.moduleDO,
      className, moduleName, moduleImports, bind, ddo, compile, pre, post, link;

    if (self.Component.processed && self.Class.processed) {
      className = functionName(classDO);

      if (!className) {
        throw new Error('The Class function cannot be anonymous.');
      }

      if (moduleDO) {
        moduleName = moduleDO.name;
        moduleImports = moduleDO.imports;
      } else {
        moduleName = componentDO.module;
        moduleImports = componentDO.moduleImports;
      }

      if (!moduleName) {
        throw new Error('The module name needs to be provided.');
      }

      componentDO = componentDO || {};

      bind = componentDO.bind;

      ddo = {
        priority: componentDO.priority,
        terminal: componentDO.terminal,
        controller: className,
        controllerAs: componentDO.controllerAs || className,

        // supporting both on-steroids bindToController in Angular 1.4
        bindToController: (angularVersion.minor > 3 && bind) || true,

        // ... or passing it in the scope for 1.3
        scope: (angularVersion.minor < 4 && bind) || {},

        // translating a few more of the new properties
        require: componentDO.directives,
        template: templateDO && templateDO.inline,
        templateUrl: templateDO && templateDO.url
      };

      compile = componentDO.compile;
      pre = componentDO.pre;
      post = componentDO.post;
      link = componentDO.link || (pre || post) && { pre: pre, post: post };

      if (compile && link) {
        ddo.compile = function(tElement, tAttrs, transclude) {
          compile.apply(undefined, [tElement, tAttrs, transclude]);
          return link;
        };
      } else {
        ddo.compile = compile;
        ddo.link = link;
      }

      // translating "services"
      classDO.$inject = componentDO.services || classDO.$inject;

      angular.module(moduleName, moduleImports)
        .controller(className, classDO)
        .directive(componentDO.selector, function() {
          return ddo;
        });
    }
  }

  helpers.forEach(function(helper) {
    window[helper] = function(definitionObject) {
      return composeMetaDO(definitionObject, helper, this);
    };
  });
})();