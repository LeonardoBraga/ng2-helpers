describe('Module', function() {
  'use strict';

  beforeEach(function() {
    angular.module('ng2', []);

    spyOn(angular, 'module').and.callThrough();
  });

  it('should set the module name through Component\'s `module` property', function() {
    Component({
      module: 'ng2'
    })
    .Class(function test() {});

    expect(angular.module).toHaveBeenCalledWith('ng2', undefined);
  });

  it('should pass the module\'s dependencies through Component\'s `moduleImports` property', function() {
    Component({
      module: 'ng2',
      moduleImports: ['module1', 'module2']
    })
    .Class(function test() {});

    expect(angular.module).toHaveBeenCalledWith('ng2', ['module1', 'module2']);
  });

  it('should allow the module\'s creation through Component\'s `moduleImports` property', function() {
    Component({
      module: 'newModule',
      moduleImports: []
    })
    .Class(function test() {});

    expect(angular.module).toHaveBeenCalledWith('newModule', []);
  });
});