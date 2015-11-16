// micro optimization
var $id = function(id) {
  return $(document.getElementById(id));
};

var currentWord = 0;
var windowIsLoaded = false;
var canvas = null;
var nameOnCertificate = '';
var players = {};

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

function onYouTubeIframeAPIReady() {
  var currentSlide = $('div.slides > section.present');

  $('div.slides > section').each(function(index, slide) {
    if ($(slide).data('video-id')) {
      var videoId = $(slide).data('video-id');
      var div = $('<div id="video-' + videoId + '">');

      $('div.backgrounds > div:eq(' + index + ')').append(div);

      players[videoId] = {
        player: null,
        isReady: false,
        play: function() {
          if (this.isReady) {
            this.player.playVideo();
          } else {
            var _this = this;

            var timer = setInterval(function() {
              if (_this.isReady) {
                _this.player.playVideo();
                clearInterval(timer);
              }
            }, 500);
          }
        },
        pause: function() {
          if (this.isReady) {
            this.player.pauseVideo();
          }
        }
      };

      players[videoId].player = new YT.Player('video-' + videoId, {
        width: '100%',
        height: '100%',
        videoId: videoId,
        playerVars: {
          fs: 0,
          origin: window.location.protocol + '//' + window.location.hostname
        },
        events: {
          'onReady': function() {
            players[videoId].isReady = true;
            $id('video-' + videoId).addClass('video');
          },
          'onStateChange': function(event) {
            if (event.data == YT.PlayerState.PLAYING) {
              // don't use currentSlide
              ga('send', 'event', 'Video', 'play', $('div.slides > section.present').find('h1').text());
            }
          }
        }
      });
    }
  });

  if (currentSlide.data('video-id') && $.cookie('hide_intro_form') === '1') {
    players[currentSlide.data('video-id')].play();
  }
}

$('button.play-btn').on('click', function() {
  Reveal.next();
});

if ($('div.slides > section.present').data('video-id')) {
  $('.reveal > .backgrounds')
    .addClass('dark')
    .css('z-index', 2);
}

Reveal.addEventListener('slidechanged', function(event) {
  Reveal.configure({
    touch: true
  });

  var currentSlide = $(event.currentSlide);
  var previousSlide = $(event.previousSlide)

  if (currentSlide.find('div.interactive-3').length < 1) {
    $id('pledge-name-form').popup('hide');
  }

  if (previousSlide.data('video-id')) {
    $('.reveal > .backgrounds')
      .removeClass('dark')
      .css('z-index', 0);

    players[previousSlide.data('video-id')].pause();
  }

  if(currentSlide.data('video-id')) {
    $('.reveal > .backgrounds')
      .addClass('dark')
      .css('z-index', 2);

    if ($.cookie('hide_intro_form') === '1' || !$id('intro-form').is(':visible')) {
      players[currentSlide.data('video-id')].play();
    }
  }

  if (currentSlide.find('div.interactive-1').length > 0 && (currentWord === 0 && currentSlide.find('div.skinny:not(.preload)').length < 1)) {
    $('div.preload').remove();

    Reveal.configure({
      touch: false
    });

    showWord(currentWord);
  }

  if (currentSlide.find('div.interactive-4').length > 0 && nameOnCertificate !== '') {
    Reveal.configure({
      touch: false
    });

    initializeCanvas();
  } else {
    if (canvas !== null) {
      canvas.clear();
    }
  }

  ga('send', 'pageview', '/' + currentSlide.attr('id').replace(/#/, ''));
});

$id('show-second-block').on('click', function() {
  $id('first-block').hide();
  $id('second-block').show();
});

if ($.cookie('hide_intro_form') !== '1') {
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
          $.cookie('hide_intro_form', '1', {expires: 0.5});
          $id('intro-form').popup('hide');

          ga('send', 'event', 'Form', 'submit', 'Initial form');
        }); */
      $.cookie('hide_intro_form', '1', {expires: 0.5});
      $id('intro-form').popup('hide');

      ga('send', 'event', 'Form', 'submit', 'Initial form');
    }

    return false;
  });

$(function() {
  $('#intro-form, #pledge-name-form').css('zoom', parseFloat($('div.slides').css('zoom')));

  $(window).on('resize', function() {
    $('#intro-form, #pledge-name-form').css('zoom', parseFloat($('div.slides').css('zoom')));
  });
});

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
      .draggable();
  }
}

function dragListener(time) {
  var _time = time;

  return function(event, ui) {
    if (ui.item.is('[data-' + _time + ']')) {
      $(this).addClass('drop-active');
    }
  };
}

function dropListener(time) {
  var _time = time;

  return function(event, ui) {
    if (!ui.item.is('[data-' + _time + ']')) {
      ga('send', 'event', 'Timeline', 'incorrect', ui.item.html().replace(/<br>/g, ''));
      return;
    }

    ga('send', 'event', 'Timeline', 'correct', ui.item.html().replace(/<br>/g, ''));

    var diffX = $('div.' + _time + '.dropzone').offset().left - $('div.interactive-1').offset().left;
    var diffY = $('div.' + _time + '.dropzone').offset().top - $('div.interactive-1').offset().top;

    var x = parseInt(ui.item.data('x'), 10) - (diffX + 6);
    var y = parseInt(ui.item.data('y'), 10) - (diffY + 9);

    ui.item
      .addClass('minimize')
      .css('left', x)
      .css('top', y)
      .draggable('disable');

    showWord(++currentWord);

    $(this).removeClass('drop-active');
  };
}

$('div.before.dropzone')
  .droppable({
    accept: '.words'
  })
  .on('droppable:drop', dropListener('before'))
  .on('droppable:over', dragListener('before'))
  .on('droppable:out', function(event, ui) {
    $(this).removeClass('drop-active');
  });

$('div.after.dropzone')
  .droppable({
    accept: '.words'
  })
  .on('droppable:drop', dropListener('after'))
  .on('droppable:over', dragListener('after'))
  .on('droppable:out', function(event, ui) {
    $(this).removeClass('drop-active');
  });

$(window).load(function() {
  windowIsLoaded = true;

  if (!!(window.location + '').match(/page-10/)) {
    $('div.preload').remove();

    Reveal.configure({
      touch: false
    });

    showWord(currentWord); // have to wait for the custom font to load
  }
});

$('.box button').on('click', function() {
  ga('send', 'event', 'Button', 'click', $(this).attr('name'));

  $(this)
    .next()
      .show()
    .end()
    .remove();
});

$('div.interactive-3 li').on('click', function() {
  $('div.interactive-3 li').removeClass('checked');
  $(this).addClass('checked');

  ga('send', 'event', 'Pledge', 'select', $(this).text());

  $id('pledge-name-form').popup('show');
});

$id('enter-pledge-name').on('click', function() {
  nameOnCertificate = $id('name-on-certificate').val();

  if (nameOnCertificate) {
    ga('send', 'event', 'Form', 'enter-pledge-name', nameOnCertificate);

    Reveal.next();
  }

  return false;
});

$id('create-new-pledge').on('click', function() {
  ga('send', 'event', 'Button', 'click', 'Create another pledge');

  nameOnCertificate = '';

  Reveal.prev();
});

(function() {
  var unknown = 'unknown';

  function getPointer(event, upperCanvasEl) {
    event || (event = fabric.window.event);

    var element = event.target ||
                  (typeof event.srcElement !== unknown ? event.srcElement : null),

        scroll = fabric.util.getScrollLeftTop(element, upperCanvasEl);

    var scale = parseFloat($('div.slides').css('zoom'));

    var x = pointerX(event) + scroll.left;
    var y = pointerY(event) + scroll.top;

    x = x / scale;
    y = y / scale;

    return {
      x: x,
      y: y
    };
  }

  var pointerX = function(event) {
    // looks like in IE (<9) clientX at certain point (apparently when mouseup fires on VML element)
    // is represented as COM object, with all the consequences, like "unknown" type and error on [[Get]]
    // need to investigate later
    return (typeof event.clientX !== unknown ? event.clientX : 0);
  },

  pointerY = function(event) {
    return (typeof event.clientY !== unknown ? event.clientY : 0);
  };

  function _getPointer(event, pageProp, clientProp) {
    var touchProp = event.type === 'touchend' ? 'changedTouches' : 'touches';

    return (event[touchProp] && event[touchProp][0]
      ? (event[touchProp][0][pageProp] - (event[touchProp][0][pageProp] - event[touchProp][0][clientProp]))
        || event[clientProp]
      : event[clientProp]);
  }

  if (fabric.isTouchSupported) {
    pointerX = function(event) {
      return _getPointer(event, 'pageX', 'clientX');
    };
    pointerY = function(event) {
      return _getPointer(event, 'pageY', 'clientY');
    };
  }

  fabric.Canvas.prototype.getPointer = function (e, ignoreZoom, upperCanvasEl) {
    if (!upperCanvasEl) {
      upperCanvasEl = this.upperCanvasEl;
    }
    var pointer = getPointer(e, upperCanvasEl),
        bounds = upperCanvasEl.getBoundingClientRect(),
        boundsWidth = bounds.width || 0,
        boundsHeight = bounds.height || 0,
        cssScale;

    if (!boundsWidth || !boundsHeight ) {
      if ('top' in bounds && 'bottom' in bounds) {
        boundsHeight = Math.abs( bounds.top - bounds.bottom );
      }
      if ('right' in bounds && 'left' in bounds) {
        boundsWidth = Math.abs( bounds.right - bounds.left );
      }
    }

    this.calcOffset();

    pointer.x = pointer.x - this._offset.left;
    pointer.y = pointer.y - this._offset.top;
    if (!ignoreZoom) {
      pointer = fabric.util.transformPoint(
        pointer,
        fabric.util.invertTransform(this.viewportTransform)
      );
    }

    if (boundsWidth === 0 || boundsHeight === 0) {
      // If bounds are not available (i.e. not visible), do not apply scale.
      cssScale = { width: 1, height: 1 };
    }
    else {
      cssScale = {
        width: upperCanvasEl.width / boundsWidth,
        height: upperCanvasEl.height / boundsHeight
      };
    }

    return {
      x: pointer.x * cssScale.width,
      y: pointer.y * cssScale.height
    };
  };

  fabric.IText.prototype._renderCharDecoration = function(ctx, styleDeclaration, left, top, offset, charWidth, charHeight) {
    var textDecoration = styleDeclaration
          ? (styleDeclaration.textDecoration || this.textDecoration)
          : this.textDecoration;

    if (!textDecoration) {
      return;
    }

    if (textDecoration.indexOf('underline') > -1) {
      ctx.fillRect(
        left,
        top + charHeight / 10,
        charWidth,
        1
      );
    }
    if (textDecoration.indexOf('line-through') > -1) {
      ctx.fillRect(
        left,
        top - charHeight * (this._fontSizeFraction + this._fontSizeMult - 1) + charHeight / 15,
        charWidth,
        charHeight / 15
      );
    }
    if (textDecoration.indexOf('overline') > -1) {
      ctx.fillRect(
        left,
        top - (this._fontSizeMult - this._fontSizeFraction) * charHeight,
        charWidth,
        charHeight / 15
      );
    }
  };
})();

function initializeCanvas() {
  if (canvas === null) {
    canvas = new fabric.Canvas('certificate', {
      isDrawingMode: true
    });
  }

  var width = canvas.getWidth() - 5;
  var height = canvas.getHeight() - 5;

  fabric.Image.fromURL('images/page36/certificate-bg.png', function(img) {
    img.set({
      top: 0,
      left: 0,
      width: width,
      height: height,
      clipTo: function(ctx) {
        var x = -((width / 2) - 1);
        var y = -((height / 2) - 1);
        var w = width;
        var h = height;
        var r = 40;

        if (w < 2 * r) {
          r = w / 2;
        }

        if (h < 2 * r) {
          r = h / 2;
        }

        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
      }
    });

    canvas.add(img);

    img.sendToBack();
  });

  canvas.add(new fabric.Rect({
      top: 0,
      left: 0,
      width: width,
      height: height,
      fill: '',
      strokeWidth: 5,
      stroke: '#7DB2DB',
      rx: 40,
      ry: 40
    }));

    canvas.add(new fabric.Rect({
      top: 5,
      left: 5,
      width: width - 5,
      height: height - 5,
      fill: '#FFF',
      opacity: 0.4,
      rx: 38,
      ry: 38
    }));

  fabric.Image.fromURL('images/dove-logo2.png', function(img) {
    img.set({
      top: 50,
      left: 50,
      width: 181,
      height: 123
    });

    canvas.add(img);
  });

  if (!windowIsLoaded) {
    $(window).load(function() {
      addDetailsToCanvas(canvas, width, height);
    });
  } else {
    addDetailsToCanvas(canvas, width, height);
  }

  $id('download-pledge').show();
  $id('create-new-pledge').show();
}

function repeat(str, chr){
  chr = chr || 1;
  return Array(chr).join(str);
}

function addDetailsToCanvas(canvas, width, height) {
  var text = '';

  if ($('div.interactive-3 li.checked').length < 1) {
    text = $('div.interactive-3 li:eq(0)').text();
  } else {
    text = $('div.interactive-3 li.checked').text();
  }

  var tokens = ('"' + nameOnCertificate + '" ' + text.toUpperCase()).split(' ');
  var lines = [];
  var lineLimit = 40;
  var lineText = '';

  for (var i = 0; i < tokens.length; i++) {
    if (lineText !== '') {
      if ((lineText + ' ' + tokens[i]).length > lineLimit) {
        lines.push(lineText);
        lineText = tokens[i];
      } else {
        lineText += ' ' + tokens[i];
      }
    } else {
      lineText = tokens[i];
    }
  }

  lines.push(lineText);

  var addUnderline = false;

  for (var i = 0; i < lines.length; i++) {
    var styles = {0: {}};

    if (lines[i].match(/"/)) {
      var _tokens = lines[i].split('');

      for (var _i = 0; _i < _tokens.length; _i++) {
        if (_tokens[_i] === '"') {
          if (addUnderline === false) {
            addUnderline = true;
          } else if (addUnderline === true) {
            addUnderline = false;
          }
        } else if (addUnderline) {
          styles[0][_i] = {
            textDecoration: 'underline'
          };
        }
      }
    }

    var _text = new fabric.IText(lines[i], {
      fontFamily: 'skinnycaps',
      fontSize: 80,
      left: 100,
      top: 200 + (60 * i),
      width: width - 120,
      styles: styles
    });

    canvas.add(_text);

    _text.centerH();
  }

  canvas.add(new fabric.Text('Signed ' + repeat(' ', 11) + ' Date ' + $.format.date($.now(), 'MMMM d, yyyy'), {
    fontFamily: 'skinnycaps',
    fontSize: 80,
    top: height - 100,
    left: 90
  }));

  canvas.add(new fabric.Line([10, height - 28, 270, height - 28], {
    left: 230,
    top: height - 27,
    stroke: '#000',
    strokeWidth: 2
  }));

  canvas.add(new fabric.Line([10, height - 28, 385, height - 28], {
    left: 628,
    top: height - 27,
    stroke: '#000',
    strokeWidth: 2
  }));
}

function downloadPledge(){
  if (canvas !== null) {
    $('<a>').attr({
      href: canvas.toDataURL(),
      download: 'certificate.png'
    })[0].click();

    ga('send', 'event', 'Button', 'click', 'Download this pledge');
  }
}

$id('download-pledge').on('click', function() {
  downloadPledge();
});


