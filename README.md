ng2-helpers
===========
This library provides helpers that allow the creation of directives in Angular 1.3+ using a syntax
that's similar to how you create components in Angular 2.0.


Goal
----

By using the helpers `Component`, `Template` and `Class` to create your directives, you would
get more familiar with the component syntax in Angular 2.0 and, it's expected that your code
will be easier to port to Angular 2.0

Usage
-----

###Module

In order to create a regular directive, you need to specify in which module it will belong and
provide a [Directive Defition Object](https://docs.angularjs.org/api/ng/service/$compile#directive-definition-object).
Since Angular 2.0 leverages ES6 to deal with modules, it was necessary to create a way to specify
the module that owns the directive being created.

In order to do so, currently, you can use two different approaches:

#####1. Module's `name`

```js
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

#####2. Component's `module`

```js
Component({
  module: 'moduleName',
  ...
})
.Class(
  ...
);
```

Once you've selected the style you prefer, stick to it to be consistent.

###Template

You can define the template of your directive by using the `Template` helper and its properties
`inline` and `url`, which translate to `template` and `templateUrl` of the directive
definition object respectively:

#####1. Template's `inline`

```js
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

#####2. Template's `url`

```js
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

Keep in mind
--------------------------------------

Although this library translates some properties of the Angular 2.0 syntax into the directive
definition object of 1.3+, it's not its goal to translate *all* of them, mainly because they
may - and probably will - rely on functionality that cannot be mimicked with ES5.

Angular 2.0 itself is still under heavy development and the syntax or the properties can change,
so the helpers here *can* become out-of-sync with Angular's official syntax.