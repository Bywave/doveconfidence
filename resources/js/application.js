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

schoolname
  .on('input propertychange', $.debounce(function() {
    var keyword = $(this).val();

    schoolnames
      .removeClass('has-values')
      .html('');

    if (keyword) {
      $
        .get('schools.php', {s: keyword})
        .done(function(response) {
          if (response.length > 0) {
            schoolnames.addClass('has-values');

            for (var i = 0; i < response.length; i++) {
              schoolnames.append('<li>' + escapeHtml(response[i]) + '</li>');
            };
          }
        });
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
