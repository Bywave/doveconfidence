<?php

$debug = !!preg_match('/\.local$/i', gethostname());

?>
<!doctype html>
<html class="no-js" lang="en">
<head>
  <meta charset="utf-8">
  <title>Dove Confidence Interactive Experience</title>
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui">
  <link href="css/application.css" media="screen, projection" rel="stylesheet" type="text/css">
</head>
<body>
  <div id="intro-form" style="display: none;">
    <div id="first-block">
      <p>Welcome to the interactive version of the <br>Confident Me workshop.</p>
      <p>If you are here as part of your class preparation, we recommend that in the first instance you download and review the teacher's guide and the pdf copy of the Confident Me workshop.<br>
         You do not need to proceed further at this stage.</p>
      <p>When you are ready to teach the Confident Me workshop in your classroom, please proceed to the next page and complete the simple registration process.</p>
      <button id="show-second-block">NEXT ></button>
    </div>
    <form id="second-block" style="display: none;">
      <fieldset>
        <div class="field-group">
          <div class="field">
            <label for="name">Your name</label>
            <input id="name" type="text" name="name" placeholder="First and last name" value="">
          </div>
          <div class="field">
            <label for="schoolyear">Which year is the resource being used to teach?</label>
            <select id="schoolyear" name="schoolyear">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
        </div>
        <div class="field-group">
          <div class="field schoolname">
            <label for="schoolname">Name of your school</label>
            <input id="schoolname" type="text" name="schoolname" value="" autocomplete="off">
            <ul id="schoolnames"></ul>
          </div>
          <div class="field">
            <label for="totalstudents">Total number of students you teach</label>
            <input id="totalstudents" type="number" name="totalstudents" value="">
          </div>
        </div>
        <div class="field-group">
          <div class="field">
            <label for="schoolrole">What is your role at the school?</label>
            <select id="schoolrole" name="schoolrole">
              <option value="Primary School Teacher">Primary School Teacher</option>
              <option value="PDHPE Teacher (Secondary School)">PDHPE Teacher (Secondary School)</option>
              <option value="Other">Other (Please Specify)</option>
            </select>
            <input id="schoolroleother" type="text" name="schoolroleother" value="" style="display: none;">
          </div>
          <div class="field">
            <label for="email">Your email address</label>
            <input id="email" type="email" name="email" placeholder="name@domain.edu.au" value="">
          </div>
        </div>
        <div class="field-group">
          <div class="field">
            <label for="classname">Name of your class</label>
            <input id="classname" type="text" name="classname" value="">
          </div>
        </div>
        <div class="field-group">
          <label><input type="checkbox" id="agree" name="agree" value="agree"> I agree to the <a href="http://www.unilever.com.au/resource/legalnotice/" target="_blank">terms and conditions</a>.</label>
          <button id="submit-intro-form" disabled>START</button>
        </div>
      </fieldset>
    </form>
  </div>
  <div class="reveal">
    <div class="slides">
      <section id="page-1" class="slide">
        <div class="container">
          <div class="dove-logo"></div>
          <div class="artwork-1"></div>
          <div class="artwork-2"></div>
          <div class="bottom-content"></div>
        </div>
      </section>
      <section id="page-2" class="slide bricks-bg">
        <div class="container">
          <div class="top-content">
            <div class="top-content-inner">
              <h1>What are we talking about today</h1>
            </div>
          </div>
          <div class="body-confidence"></div>
          <div class="filler-top"></div>
          <div class="filler-bottom"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">2</div>
          </div>
        </div>
      </section>
      <section id="page-3" class="slide bricks-bg">
        <div class="container">
          <div class="top-content">
            <div class="top-content-inner">
              <h1>Lets discuss appearance pressures</h1>
            </div>
          </div>
          <div class="image-1">
            <div class="arrow-left"></div>
            <div class="banner"></div>
          </div>
          <div class="image-2">
            <div class="arrow-down"></div>
            <div class="banner"></div>
          </div>
          <div class="image-3">
            <div class="arrow-right"></div>
            <div class="banner"></div>
          </div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">3</div>
          </div>
        </div>
      </section>
      <section id="page-4" class="slide bricks-bg">
        <div class="container">
          <div class="top-content">
            <div class="top-content-inner">
              <h1>What have we learned about appearnce</h1>
            </div>
          </div>
          <div class="text-1"></div>
          <div class="text-2"></div>
          <div class="text-3"></div>
          <div class="filler-top"></div>
          <div class="filler-bottom"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">4</div>
          </div>
        </div>
      </section>
      <section id="page-5" class="slide bricks-bg">
        <div class="container">
          <div class="top-content header-2">
            <div class="top-content-inner">
              <h1>Where does this pressure come from</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <div class="image-2"></div>
          <div class="image-3"></div>
          <div class="image-4"></div>
          <div class="filler-top"></div>
          <div class="filler-bottom"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">5</div>
          </div>
        </div>
      </section>
      <section id="page-6" class="slide line-bg">
        <div class="container">
          <div class="top-content header-3">
            <div class="top-content-inner">
              <h1>Where does this pressure come from</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <div class="image-2"></div>
          <div class="image-3"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">6</div>
          </div>
        </div>
      </section>
      <section id="page-7" class="slide line-bg-right">
        <div class="container">
          <div class="top-content header-4">
            <div class="top-content-inner">
              <h1>Where does this pressure come from</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <button class="play-btn"></button>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">7</div>
          </div>
        </div>
      </section>
      <section id="page-8" class="slide line-bg-right">
        <h1 style="display: none;">The Dove Self-Esteem Project: Photoshop Isn't Real Beauty</h1>
        <iframe data-autoplay src="https://www.youtube.com/embed/RX4N1WTLqjo?controls=0" frameborder="0" allowfullscreen></iframe>
      </section>
      <section id="page-9" class="slide line-bg">
        <div class="container">
          <div class="top-content header-4">
            <div class="top-content-inner">
              <h1>What's real what's not</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <div class="image-2"></div>
          <div class="filler-top"></div>
          <div class="filler-bottom"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">9</div>
          </div>
        </div>
      </section>
      <section id="page-10" class="slide bricks-bg">
        <div class="container">
          <div class="top-content header-4">
            <div class="top-content-inner">
              <h1>What's real what's not</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <div class="image-2"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">10</div>
          </div>
        </div>
      </section>
      <section id="page-11" class="slide line-bg-right">
        <div class="container">
          <div class="top-content header-4">
            <div class="top-content-inner">
              <h1>What's real what's not</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">11</div>
          </div>
        </div>
      </section>
      <section id="page-12" class="slide line-bg">
        <div class="container">
          <div class="top-content header-4">
            <div class="top-content-inner">
              <h1>Why are media images often created this way?</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <div class="filler-top"></div>
          <div class="filler-bottom"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">12</div>
          </div>
        </div>
      </section>
      <section id="page-13" class="slide line-bg">
        <div class="container">
          <div class="top-content header-4">
            <div class="top-content-inner">
              <h1>Why are media images often created this way?</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <div class="filler-top"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">13</div>
          </div>
        </div>
      </section>
      <section id="page-14" class="slide bricks-bg">
        <div class="container">
          <div class="top-content header-5">
            <div class="top-content-inner">
              <h1>How do these images make you feel?</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <div class="filler-bottom"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">14</div>
          </div>
        </div>
      </section>
      <section id="page-15" class="slide border-bg">
        <div class="container">
          <div class="image-1"></div>
          <button class="play-btn"></button>
          <div class="bottom-right">
            <div class="get-real"></div>
            <div class="page-num">15</div>
          </div>
        </div>
      </section>
      <section id="page-16" class="slide line-bg-right">
        <h1 style="display: none;">Being Real About Beauty: Part 1</h1>
        <iframe data-autoplay src="https://www.youtube.com/embed/KbWytwYTZJM?controls=0" frameborder="0" allowfullscreen></iframe>
      </section>
      <section id="page-17" class="slide border-bg">
        <div class="container">
          <div class="image-1"></div>
          <div class="bottom-right">
            <div class="get-real"></div>
            <div class="page-num">17</div>
          </div>
        </div>
      </section>
      <section id="page-18" class="slide bricks-bg">
        <div class="container">
          <div class="top-content header-5">
            <div class="top-content-inner">
              <h1>How do these images make you feel?</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">18</div>
          </div>
        </div>
      </section>
      <section id="page-19" class="slide green-bg">
        <div class="container">
          <div class="image-1"></div>
          <div class="bottom-right">
            <div class="page-num">19</div>
          </div>
        </div>
      </section>
      <section id="page-20" class="slide border-bg">
        <div class="container">
          <div class="image-1"></div>
          <div class="image-2"></div>
          <button class="play-btn"></button>
          <div class="bottom-right">
            <div class="get-real"></div>
            <div class="page-num">20</div>
          </div>
        </div>
      </section>
      <section id="page-21" class="slide line-bg-right">
        <h1 style="display: none;">Mock-up Media #1</h1>
        <iframe data-autoplay src="https://www.youtube.com/embed/YE7VzlLtp-4?controls=0" frameborder="0" allowfullscreen></iframe>
      </section>
      <section id="page-22" class="slide border-bg">
        <div class="container">
          <div class="image-1"></div>
          <div class="bottom-right">
            <div class="get-real"></div>
            <div class="page-num">22</div>
          </div>
        </div>
      </section>
      <section id="page-23" class="slide border-bg">
        <div class="container">
          <div class="image-1"></div>
          <div class="image-2"></div>
          <div class="bottom-right">
            <div class="get-real"></div>
            <div class="page-num">23</div>
          </div>
        </div>
      </section>
      <section id="page-24" class="slide border-bg">
        <div class="container">
          <div class="image-1"></div>
          <div class="image-2"></div>
          <div class="image-3"></div>
          <div class="image-4"></div>
          <div class="bottom-right">
            <div class="get-real-green"></div>
            <div class="page-num">24</div>
          </div>
        </div>
      </section>
      <section id="page-25" class="slide line-bg-right">
        <div class="container">
          <div class="top-content header-4"></div>
          <div class="image-1"></div>
          <div class="image-2"></div>
          <div class="image-3"></div>
          <div class="image-4"></div>
          <div class="image-5"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">25</div>
          </div>
        </div>
      </section>
      <section id="page-26" class="slide line-bg-right">
        <div class="container">
          <div class="top-content header-4"></div>
          <div class="image-1"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">26</div>
          </div>
        </div>
      </section>
      <section id="page-27" class="slide border-bg">
        <div class="container">
          <div class="image-1"></div>
          <button class="play-btn"></button>
          <div class="bottom-right">
            <div class="get-real"></div>
            <div class="page-num">27</div>
          </div>
        </div>
      </section>
      <section id="page-28" class="slide line-bg-right">
        <h1 style="display: none;">The Dove Self-Esteem Project: Change One Thing</h1>
        <iframe data-autoplay src="https://www.youtube.com/embed/8PMzuo1KtRk?controls=0" frameborder="0" allowfullscreen></iframe>
      </section>
      <section id="page-29" class="slide line-bg-right">
        <div class="container">
          <div class="top-content header-4">
            <div class="top-content-inner">
              <h1>Why do we compare?</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <div class="image-2"></div>
          <div class="image-3"></div>
          <div class="image-4"></div>
          <div class="bottom-right">
            <div class="get-real-green"></div>
            <div class="page-num">29</div>
          </div>
        </div>
      </section>
      <section id="page-30" class="slide">
        <div class="container">
          <div class="top-content header-4">
            <div class="top-content-inner">
              <h1>Why do we compare?</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <div class="filler-top"></div>
          <div class="filler-bottom"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">30</div>
          </div>
        </div>
      </section>
      <section id="page-31" class="slide border-bg">
        <div class="container">
          <div class="image-1"></div>
          <div class="image-2"></div>
          <div class="image-3"></div>
          <div class="image-4"></div>
          <div class="bottom-right">
            <div class="get-real"></div>
            <div class="page-num">31</div>
          </div>
        </div>
      </section>
      <section id="page-32" class="slide">
        <div class="container">
          <div class="top-content header-4"></div>
          <div class="image-1"></div>
          <div class="filler-top"></div>
          <div class="filler-bottom"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">32</div>
          </div>
        </div>
      </section>
      <section id="page-33" class="slide border-bg">
        <div class="container">
          <div class="image-1"></div>
          <button class="play-btn"></button>
          <div class="bottom-right">
            <div class="get-real-yellow"></div>
            <div class="page-num">33</div>
          </div>
        </div>
      </section>
      <section id="page-34" class="slide line-bg-right">
        <h1 style="display: none;">Being Real About Beauty: Part 2</h1>
        <iframe data-autoplay src="https://www.youtube.com/embed/tKm3Nv2c3Wo?controls=0" frameborder="0" allowfullscreen></iframe>
      </section>
      <section id="page-35" class="slide green-bg">
        <div class="container">
          <div class="image-1"></div>
          <div class="bottom-right">
            <div class="page-num">35</div>
          </div>
        </div>
      </section>
      <section id="page-36" class="slide border-bg">
        <div class="container">
          <div class="image-1"></div>
          <div class="image-2"></div>
          <div class="image-3"></div>
          <div class="bottom-right">
            <div class="get-real-yellow"></div>
            <div class="page-num">36</div>
          </div>
        </div>
      </section>
      <section id="page-37" class="slide line-bg">
        <div class="container">
          <div class="top-content header-4"></div>
          <div class="image-1"></div>
          <div class="filler-top"></div>
          <div class="filler-bottom"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">37</div>
          </div>
        </div>
      </section>
      <section id="page-38" class="slide bricks-bg">
        <div class="container">
          <div class="top-content header-6">
            <div class="top-content-inner">
              <h1>What have we learned?</h1>
            </div>
          </div>
          <div class="image-1"></div>
          <div class="image-2"></div>
          <div class="image-3"></div>
          <div class="image-4"></div>
          <div class="image-5"></div>
          <div class="image-6"></div>
          <div class="image-7"></div>
          <div class="filler-top"></div>
          <div class="filler-bottom"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">38</div>
          </div>
        </div>
      </section>
      <section id="page-39" class="slide green-bg">
        <div class="container">
          <div class="image-1"></div>
          <div class="bottom-right">
            <div class="page-num">39</div>
          </div>
        </div>
      </section>
      <section id="page-40" class="slide line-bg2">
        <div class="container">
          <div class="top-content header-7">
            <div class="top-content-inner">
              <h1>What have we learned?</h1>
            </div>
          </div>
          <div class="image-2"></div>
          <div class="popup-1"></div>
          <div class="popup-2"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
            <div class="page-num">40</div>
          </div>
        </div>
      </section>
      <section id="page-41" class="slide">
        <div class="container">
          <div class="dove-logo"></div>
          <div class="badge"></div>
          <div class="image-1"></div>
          <div class="image-2"></div>
          <div class="image-3"></div>
        </div>
      </section>
      <section id="page-42" class="slide">
        <div class="container">
          <div class="dove-logo"></div>
          <div class="image-1"></div>
          <div class="bottom-content">
            <div class="get-real"></div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics<?php echo $debug ? '_debug' : '' ?>.js','ga');

    ga('create', 'UA-69839782-1', 'auto');
    ga('send', 'pageview');

  </script>
  <script src="js/vendors.js"></script>
  <script src="js/application.js"></script>
</body>
</html>
