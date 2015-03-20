describe('Class', function() {
  'use strict';

  var ddo, mockedModule, mockedController;

  beforeEach(function() {
    ddo = null;

    mockedController = { directive: null };
    spyOn(mockedController, 'directive').and.callFake(function(directiveName, directiveFactory) {
      ddo = directiveFactory();
    });

    mockedModule = { controller: null };
    spyOn(mockedModule, 'controller').and.returnValue(mockedController);

    spyOn(angular, 'module').and.returnValue(mockedModule);
  });

  it('should create a controller with the function passed to the Class helper', function() {
    function customFunction() {};

    Component({
      module: 'ng2'
    })
    .Class(customFunction);

    expect(mockedModule.controller).toHaveBeenCalledWith('customFunction', customFunction);
  });

  it('should set the directive `controllerAs` with the name of the function passed to the Class helper', function() {
    Component({
      module: 'ng2'
    })
    .Class(function customFunction() {});

    expect(ddo.controllerAs).toBe('customFunction');
  });
});