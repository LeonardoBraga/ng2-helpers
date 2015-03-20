describe('Module', function() {
  'use strict';

  beforeEach(function() {
    angular.module('ng2', []);

    spyOn(angular, 'module').and.callThrough();
  });

  it('should set the module name through the Module\'s `name` property', function() {
    Module({
      name: 'ng2'
    })
    .Component()
    .Class(function test() {});

    expect(angular.module).toHaveBeenCalledWith('ng2');
  });

  it('should set the module name through the Component\'s `module` property', function() {
    Component({
      module: 'ng2'
    })
    .Class(function test() {});

    expect(angular.module).toHaveBeenCalledWith('ng2');
  });
});