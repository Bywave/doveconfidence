// micro optimization
var $id = function(id) {
  return $(document.getElementById(id));
};

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

$('button.play-btn').on('click', function() {
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

    ga('send', 'event', 'Video', 'play', currentSlide.find('h1').text());
  }

  ga('send', 'pageview', '/' + currentSlide.attr('id').replace(/#/, ''));
});

$id('show-second-block').on('click', function() {
  $id('first-block').hide();
  $id('second-block').show();
});

if ($.cookie('show_intro_form') !== '1') {
  $id('intro-form')
    .show()
    .popup('show');
}

$('select').selectric();
$(':checkbox').iCheck({
  checkboxClass: 'icheckbox_minimal-blue'
});

$id('schoolrole').on('change', function() {
  var value = $(this).val();

  if (value.toLowerCase() === 'other') {
    $id('schoolroleother').show();
  } else {
    $id('schoolroleother').hide();
  }
});

var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

var schoolname = $id('schoolname');
var schoolnames = $id('schoolnames');

schoolnames
  .on('click', 'li', function(event) {
    event.stopPropagation();

    var name = $(this).text();

    schoolname.val(name);

    schoolnames
      .removeClass('has-values')
      .html('');
  });

$(document).on('click', function(event) {
  if (!schoolname.is(event.target) || (!schoolnames.is(event.target) && schoolnames.has(event.target).length === 0)) {
    schoolnames
      .removeClass('has-values')
      .html('');
  }
});

function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

schoolname
  .on('input propertychange', $.debounce(function() {
    var keyword = $(this).val();

    var schoolnamesArray = window.schoolnamesArray || [];

    schoolnames
      .removeClass('has-values')
      .html('');

    if (keyword) {
      keyword = escapeRegExp(keyword);

      var foundValues = [];

      for (var i = 0; i < schoolnamesArray.length; i++) {
        var name = schoolnamesArray[i].replace(/(\(|\))/g, '');
        var pattern = new RegExp('^' + keyword + '|\\s' + keyword + '.*', 'ig');

        if (pattern.test(name)) {
          foundValues.push(schoolnamesArray[i]);
        }
      }

      if (foundValues.length > 0) {
        schoolnames.addClass('has-values');

        for (var i = 0; i < foundValues.length; i++) {
          schoolnames.append('<li>' + escapeHtml(foundValues[i]) + '</li>');
        };
      }
    }
  }, 500));

$id('agree')
  .on('ifChecked', function() {
    $id('submit-intro-form').prop('disabled', false);
  })
  .on('ifUnchecked', function() {
    $id('submit-intro-form').prop('disabled', true);
  });

$id('second-block')
  .find('input[type=text], input[type=number], input[type=email]')
    .on('input propertychange', function() {
      $(this).removeClass('error');
    })
  .end()
  .find('select')
    .on('change', function() {
      $(this).parents('.selectric-wrapper').removeClass('error');
    });

$id('second-block')
  .on('submit', function() {
    $(this).find('input[type=text], input[type=number], input[type=email], .selectric-wrapper').removeClass('error');

    var fields = $(this).serializeArray();
    var isOnError = false;

    for (var i = 0; i < fields.length; i++) {
      var id = '';
      var error = '';

      if ($.inArray(fields[i].name, ['agree', 'schoolroleother']) !== -1) {
        continue;
      }

      if (fields[i].value === '') {
        error = 'Field is required.';
      } else if (fields[i].name === 'email' && !/\.edu\.au$/i.test(fields[i].value)) {
        error = 'Email address must contain ".edu.au".';
      } else if (fields[i].name === 'totalstudents' && parseInt(fields[i].value) === isNaN) {
        error = 'Field expects a number.';
      } else if (fields[i].name === 'schoolrole' && fields[i].value.toLowerCase() === 'other' && $id('schoolroleother').val() === '') {
        id = 'schoolroleother';
        error = 'Please specify your role.';
      }

      if (error) {
        id = (id) ? id : fields[i].name;

        if ($id(id).parents('.selectric-wrapper').length > 0) {
          $id(id).parents('.selectric-wrapper').addClass('error');
        } else {
          $id(id).addClass('error');
        }

        isOnError = true;
      }
    };

    if (!isOnError) {
      /* $
        .ajax({
          type: 'POST',
          url: '',
          crossDomain: true,
          data: $(this).serialize()
        })
        .done(function() {
          $.cookie('show_intro_form', '1', {expires: 0.5});
          $id('intro-form').popup('hide');

          ga('send', 'event', 'Form', 'submit', 'Initial form');
        }); */
      $.cookie('show_intro_form', '1', {expires: 0.5});
      $id('intro-form').popup('hide');

      ga('send', 'event', 'Form', 'submit', 'Initial form');
    }

    return false;
  });

var currentWord = 0;

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

window.timelineWordsArray = shuffleArray(window.timelineWordsArray);

function showWord(index) {
  if (index < window.timelineWordsArray.length) {
    var data = window.timelineWordsArray[index];
    var words = data.words.replace(/\n/g, '<br>');

    var word = $('<div class="skinny words" data-' + data.timeline + ' data-x="' + data.pos[0] + '" data-y="' + data.pos[1] + '" style="top: 15px;"></div>')
      .html(words);

    $('div.interactive-1').append(word);

    word
      .css('left', ($('div.interactive-1').outerWidth() / 2) - (word.outerWidth() / 2))
      .hide()
      .fadeIn()
      .draggable({
        cursor: 'move'
      });
  }
}

function dragListener(time) {
  var _time = time;

  return function(event, ui) {
    if (ui.draggable.is('[data-' + _time + ']')) {
      $(this).addClass('drop-active');
    }
  };
}

function dropListener(time) {
  var _time = time;

  return function(event, ui) {
    if (!ui.draggable.is('[data-' + _time + ']')) {
      ga('send', 'event', 'Timeline', 'incorrect', ui.draggable.html().replace(/<br>/g, ''));
      return;
    }

    ga('send', 'event', 'Timeline', 'correct', ui.draggable.html().replace(/<br>/g, ''));

    var x = parseInt(ui.draggable.data('x'), 10);
    var y = parseInt(ui.draggable.data('y'), 10);

    ui.draggable
      .addClass('minimize')
      .css('left', x)
      .css('top', y)
      .draggable('disable');

    showWord(++currentWord);

    $(this).removeClass('drop-active');
  };
}

$('.before.dropzone').droppable({
  accept: '.words',
  over: dragListener('before'),
  out: function(event, ui) {
    $(this).removeClass('drop-active');
  },
  tolerance: 'touch',
  drop: dropListener('before')
});

$('.after.dropzone').droppable({
  accept: '.words',
  over: dragListener('after'),
  out: function(event, ui) {
    $(this).removeClass('drop-active');
  },
  tolerance: 'touch',
  drop: dropListener('after')
});

$(window).load(function() {
  $('div.preload').remove();

  showWord(currentWord); // have to wait for the custom font to load
});
