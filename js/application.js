function escapeHtml(e){return String(e).replace(/[&<>"'\/]/g,function(e){return entityMap[e]})}function escapeRegExp(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function shuffleArray(e){for(var r=e.length-1;r>0;r--){var o=Math.floor(Math.random()*(r+1)),t=e[r];e[r]=e[o],e[o]=t}return e}function showWord(e){if(e<window.timelineWordsArray.length){var r=window.timelineWordsArray[e],o=r.words.replace(/\n/g,"<br>"),t=$('<div class="skinny words" data-'+r.timeline+' data-x="'+r.pos[0]+'" data-y="'+r.pos[1]+'" style="top: 15px;"></div>').html(o);$("div.interactive-1").append(t),t.css("left",$("div.interactive-1").outerWidth()/2-t.outerWidth()/2).hide().fadeIn().draggable({cursor:"move"})}}function dragListener(e){var r=e;return function(e,o){o.draggable.is("[data-"+r+"]")&&$(this).addClass("drop-active")}}function dropListener(e){var r=e;return function(e,o){if(!o.draggable.is("[data-"+r+"]"))return void ga("send","event","Timeline","incorrect",o.draggable.html().replace(/<br>/g,""));ga("send","event","Timeline","correct",o.draggable.html().replace(/<br>/g,""));var t=parseInt(o.draggable.data("x"),10),a=parseInt(o.draggable.data("y"),10);o.draggable.addClass("minimize").css("left",t).css("top",a).draggable("disable"),showWord(++currentWord),$(this).removeClass("drop-active")}}var $id=function(e){return $(document.getElementById(e))},currentWord=0;Reveal.initialize({controls:!0,progress:!0,width:1200,height:853,transition:"fade",backgroundTransition:"fade",margin:0,minScale:.2,maxScale:2,controls:!0,progress:!0,history:!0,center:!0,transition:"convex"}),$("button.play-btn").on("click",function(){Reveal.next()}),Reveal.addEventListener("slidechanged",function(e){var r=$(e.previousSlide),o=$(e.currentSlide);r.find("iframe[data-autoplay]").length>0&&$("div.reveal").removeClass("dark"),o.find("iframe[data-autoplay]").length>0&&($("div.reveal").addClass("dark"),ga("send","event","Video","play",o.find("h1").text())),o.find("div.interactive-1").length>0&&0===currentWord&&o.find("div.skinny:not(.preload)").length<1&&($("div.preload").remove(),showWord(currentWord)),ga("send","pageview","/"+o.attr("id").replace(/#/,""))}),$id("show-second-block").on("click",function(){$id("first-block").hide(),$id("second-block").show()}),"1"!==$.cookie("show_intro_form")&&$id("intro-form").show().popup("show"),$("select").selectric(),$(":checkbox").iCheck({checkboxClass:"icheckbox_minimal-blue"}),$id("schoolrole").on("change",function(){var e=$(this).val();"other"===e.toLowerCase()?$id("schoolroleother").show():$id("schoolroleother").hide()});var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},schoolname=$id("schoolname"),schoolnames=$id("schoolnames");schoolnames.on("click","li",function(e){e.stopPropagation();var r=$(this).text();schoolname.val(r),schoolnames.removeClass("has-values").html("")}),$(document).on("click",function(e){(!schoolname.is(e.target)||!schoolnames.is(e.target)&&0===schoolnames.has(e.target).length)&&schoolnames.removeClass("has-values").html("")}),schoolname.on("input propertychange",$.debounce(function(){var e=$(this).val(),r=window.schoolnamesArray||[];if(schoolnames.removeClass("has-values").html(""),e){e=escapeRegExp(e);for(var o=[],t=0;t<r.length;t++){var a=r[t].replace(/(\(|\))/g,""),n=new RegExp("^"+e+"|\\s"+e+".*","ig");n.test(a)&&o.push(r[t])}if(o.length>0){schoolnames.addClass("has-values");for(var t=0;t<o.length;t++)schoolnames.append("<li>"+escapeHtml(o[t])+"</li>")}}},500)),$id("agree").on("ifChecked",function(){$id("submit-intro-form").prop("disabled",!1)}).on("ifUnchecked",function(){$id("submit-intro-form").prop("disabled",!0)}),$id("second-block").find("input[type=text], input[type=number], input[type=email]").on("input propertychange",function(){$(this).removeClass("error")}).end().find("select").on("change",function(){$(this).parents(".selectric-wrapper").removeClass("error")}),$id("second-block").on("submit",function(){$(this).find("input[type=text], input[type=number], input[type=email], .selectric-wrapper").removeClass("error");for(var e=$(this).serializeArray(),r=!1,o=0;o<e.length;o++){var t="",a="";-1===$.inArray(e[o].name,["agree","schoolroleother"])&&(""===e[o].value?a="Field is required.":"email"!==e[o].name||/\.edu\.au$/i.test(e[o].value)?"totalstudents"===e[o].name&&parseInt(e[o].value)===isNaN?a="Field expects a number.":"schoolrole"===e[o].name&&"other"===e[o].value.toLowerCase()&&""===$id("schoolroleother").val()&&(t="schoolroleother",a="Please specify your role."):a='Email address must contain ".edu.au".',a&&(t=t?t:e[o].name,$id(t).parents(".selectric-wrapper").length>0?$id(t).parents(".selectric-wrapper").addClass("error"):$id(t).addClass("error"),r=!0))}return r||($.cookie("show_intro_form","1",{expires:.5}),$id("intro-form").popup("hide"),ga("send","event","Form","submit","Initial form")),!1}),window.timelineWordsArray=shuffleArray(window.timelineWordsArray),$(".before.dropzone").droppable({accept:".words",over:dragListener("before"),out:function(e,r){$(this).removeClass("drop-active")},tolerance:"touch",drop:dropListener("before")}),$(".after.dropzone").droppable({accept:".words",over:dragListener("after"),out:function(e,r){$(this).removeClass("drop-active")},tolerance:"touch",drop:dropListener("after")}),$(window).load(function(){(window.location+"").match(/page-10/)&&($("div.preload").remove(),showWord(currentWord))}),$(".box button").on("click",function(){ga("send","event","Button","click",$(this).attr("name")),$(this).next().show().end().remove()});
//# sourceMappingURL=application.js.map
