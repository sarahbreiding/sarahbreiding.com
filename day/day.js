(function () {

  var slicebox = $('#sb-slider').slicebox({
    orientation : 'v',
    disperseFactor : 30
  });

  $('.slider-prev').click(function () {
    slicebox.previous()
  });

  $('.slider-next').click(function () {
    slicebox.next()
  });

}());
