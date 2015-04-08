describe('Module', function() {
  'use strict';

  beforeEach(function() {
    angular.module('ng2', []);

    spyOn(angular, 'module').and.callThrough();
  });

  it('should set the module name through Module\'s `name` property', function() {
    Module({
      name: 'ng2'
    })
    .Component()
    .Class(function test() {});

    expect(angular.module).toHaveBeenCalledWith('ng2', undefined);
  });

  it('should pass the module\'s dependencies through Module\'s `imports` property', function() {
    Module({
      name: 'ng2',
      imports: ['module1', 'module2']
    })
    .Component()
    .Class(function test() {});

    expect(angular.module).toHaveBeenCalledWith('ng2', ['module1', 'module2']);
  });

  it('should allow the module\'s creation through Module\'s `imports` property', function() {
    Module({
      name: 'ng2',
      imports: []
    })
    .Component()
    .Class(function test() {});

    expect(angular.module).toHaveBeenCalledWith('ng2', []);
  });
});