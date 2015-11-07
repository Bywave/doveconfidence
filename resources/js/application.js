Reveal.initialize({
  controls: true,
  progress: true,
  width: 1200,
  height: 853,
  transition: 'fade',
  backgroundTransition: 'fade',
  margin: 0.0,
  minScale: 0.2,
  maxScale: 2,
  controls: true,
  progress: true,
  history: true,
  center: true,
  transition: 'convex'
});

$('div.play-btn').on('click', function() {
  Reveal.next();
});

Reveal.addEventListener('slidechanged', function(event) {
  var previousSlide = $(event.previousSlide);
  var currentSlide = $(event.currentSlide);

  if (previousSlide.find('iframe[data-autoplay]').length > 0) {
    $('div.reveal').removeClass('dark');
  }

  if (currentSlide.find('iframe[data-autoplay]').length > 0) {
    $('div.reveal').addClass('dark');
  }
});
