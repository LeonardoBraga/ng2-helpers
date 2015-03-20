describe('Template', function() {
  'use strict';

  var ddo;

  beforeEach(function() {
    ddo = null;

    spyOn(angular, 'module').and.returnValue({
      controller: function() {
        return {
          directive: function(directiveName, directiveFactory) {
            ddo = directiveFactory();
          }
        };
      }
    });
  });

  it('should set the directive `template` through the Template\'s `inline` property', function() {
    var template = 'template string';

    Template({
      inline: template
    })
    .Component({
      module: 'ng2'
    })
    .Class(function test() {});

    expect(ddo.template).toBe(template);
  });

  it('should set the directive `templateUrl` through the Template\'s `url` property', function() {
    var templateUrl = 'directive.tpl.html';

    Template({
      url: templateUrl
    })
    .Component({
      module: 'ng2'
    })
    .Class(function test() {});

    expect(ddo.templateUrl).toBe(templateUrl);
  });

});