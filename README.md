ng2-helpers
===========
This library provides helpers that allow the creation of directives in Angular 1.3+ using a syntax
that's similar to how you create components in Angular 2.0.

By using `Module`, `Component`, `Template` and `Class` to create your directives, you would
get more familiar with the syntax used in Angular 2.0 and have code that will be easier to port
down the road.


Usage
-----

To create a directive using this library, you need to call at least `Component` and `Class`.
You can call the helpers in any order, as long as either `Component` or `Class` is the last one.

The directives created by this library follow the conventions below:
- They always have an isolated scope.
- They always have `controllerAs` defined, either by directly setting the property in the
`Component` helper or by using the name of the function passed to the `Class` helper.
- They always have their `scope` bound to the controller by using `bindToController`.


### Module

In order to create a directive in Angular 1.X, you need to specify the module it will belong to
and provide a [Directive Definition Object](https://docs.angularjs.org/api/ng/service/$compile#directive-definition-object).
Since Angular 2.0 leverages ES6 to deal with modules, it was necessary to create a way to specify
the module name that owns the directive being created.

To define the module you can use:

##### 1. Module's `name`

```javascript
Module({
  name: 'moduleName'
})
.Component({
  ...
})
.Class(
  ...
);
```

##### 2. Component's `module`

```javascript
Component({
  module: 'moduleName',
  ...
})
.Class(
  ...
);
```

To specify the module's dependencies you can use:

##### 1. Module's `imports`

```javascript
Module({
  name: 'moduleName',
  imports: ['module1', 'module2']
})
.Component({
  ...
})
.Class(
  ...
);
```

##### 2. Component's `moduleImports`

```javascript
Component({
  module: 'moduleName',
  moduleImports: ['module1', 'module2']
  ...
})
.Class(
  ...
);
```

Once you've selected which helper you prefer to deal with modules, it's recommended that you stick
to it to be consistent.


### Template

This helper defines the template of your directive. It supports the following properties:

- `inline`: maps to the `template` property of the DDO

   ```javascript
   Template({
      inline: '<span>This is the template {{ vm.value }}</span>'
   })
   .Component({
      controllerAs: 'vm'
   })
   .Class(
      ...
   );
   ```


- `url`: maps to the `templateUrl` property of the DDO

   ```javascript
   Module({
      name: 'moduleName'
   })
   .Template({
      url: 'custom-directive.tpl.html'
   })
   .Component({
      ...
   })
   .Class(
      ...
   );
   ```


### Component

This helper defines the main aspects of the directive. It supports the following properties:

- `selector`: sets the directive name, in camel case, which will match an element tag, attribute
or class

   ```javascript
   Component({
      selector: 'userInfo',
      ...
   })
   .Class(
      ...
   );
   ```


- `bind`: maps to `bindToController` in Angular 1.4+ and to `scope` in Angular 1.3

   ```javascript
   Component({
      bind: {
        label: '@',
        data: '='
      },
      ...
   })
   .Class(
      ...
   );
   ```


- `controllerAs`: maps to `controllerAs` property of the DDO. It will use the name of the function
passed to the helper `Class` if not specified

   ```javascript
   Component({
      controllerAs: 'ctrl'
   })
   .Template({
      inline: 'User name: {{ ctrl.userName }}'
   })
   .Class(function userInfo() {
      this.userName = 'John Doe';
   });
   ```


- `directives`: maps to `requires` property of the DDO.

   ```javascript
   Component({
      directives: ['ngModel'],
     ...
   })
   .Class(
      ...
   );
   ```


- `services`: maps to `$inject` property of the function passed to the helper `Class`

   ```javascript
   Component({
      services: ['$rootScope', '$timeout', 'CustomService'],
      ...
   })
   .Class(function customDirective($rootScope, $timeout, CustomService) {
      ...
   });
   ```


- `link`, `pre` and `post` link and `compile`

   `Component` helper comes a plus: you can define `compile` *and* `link` (or `pre` and `post`)
   separately, and the helper will combine them so they're executed as expected.

   ```javascript
   Component({
      compile: function(elem, attrs, transclude) { },
      link: function(scope, elem, attrs) { },
      ...
   })
   .Class(
      ...
   );
   ```

   ```javascript
   Component({
      compile: function(elem, attrs, transclude) { },
      pre: function(scope, elem, attrs) { },
      post: function(scope, elem, attrs) { },
      ...
   })
   .Class(
      ...
   );
   ```


- `priority` and `terminal`
   You can also set the DDO's properties `priority` and `terminal` through the `Component` helper:

   ```javascript
   Component({
      terminal: true,
      priority: 1000,
      compile: function(elem, attrs, transclude) { },
      ...
   })
   .Class(
      ...
   );
   ```


### Class

This helper defines the controller *class* function that will be used by the directive. The
function must have a name, and its name will be used to register the controller.

```javascript
Component(
  ...
)
.Class(function customDirective() {
});
```


Keep in mind
--------------------------------------

Although this library supports some properties of the Angular 2.0 syntax into the directive
definition object of 1.3+, it's not its goal to support *all* of them, mainly because they may -
and most likely will - rely on functionality that cannot be mimicked with ES5.

Angular 2.0 itself is still under heavy development and the syntax or the properties names can
change, so the helpers here *can* become out-of-sync with Angular's 2.0 official syntax.

Borrowing from [PhoneGap's goal](http://phonegap.com/2012/05/09/phonegap-beliefs-goals-and-philosophy/),
the ultimate purpose of this project is to cease to exist - eventually we'll be able to write
pure Angular 2.0 applications in ES6, leaving 1.X to its deserved rest.
