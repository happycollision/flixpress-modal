(function ($) {
  module('jQuery#flixpressModal', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function () {
    expect(1);
    strictEqual(this.elems.flixpressModal(), this.elems, 'should be chainable');
  });

  test('is flixpressModal', function () {
    expect(1);
    strictEqual(this.elems.flixpressModal().text(), 'flixpressModal0flixpressModal1flixpressModal2', 'should be flixpressModal');
  });

}(jQuery));
