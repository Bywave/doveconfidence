function escapeHtml(e){return String(e).replace(/[&<>"'\/]/g,function(e){return entityMap[e]})}function escapeRegExp(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function shuffleArray(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),i=e[t];e[t]=e[n],e[n]=i}return e}function showWord(e){if(e<window.timelineWordsArray.length){var t=window.timelineWordsArray[e],n=t.words.replace(/\n/g,"<br>"),i=$('<div class="skinny words" data-'+t.timeline+' data-x="'+t.pos[0]+'" data-y="'+t.pos[1]+'" style="top: 15px;"></div>').html(n);$("div.interactive-1").append(i),i.css("left",$("div.interactive-1").outerWidth()/2-i.outerWidth()/2).hide().fadeIn().draggable({cursor:"move"})}}function dragListener(e){var t=e;return function(e,n){n.draggable.is("[data-"+t+"]")&&$(this).addClass("drop-active")}}function dropListener(e){var t=e;return function(e,n){if(!n.draggable.is("[data-"+t+"]"))return void ga("send","event","Timeline","incorrect",n.draggable.html().replace(/<br>/g,""));ga("send","event","Timeline","correct",n.draggable.html().replace(/<br>/g,""));var i=parseInt(n.draggable.data("x"),10),a=parseInt(n.draggable.data("y"),10);n.draggable.addClass("minimize").css("left",i).css("top",a).draggable("disable"),showWord(++currentWord),$(this).removeClass("drop-active")}}function initializeCanvas(){null===canvas&&(canvas=new fabric.Canvas("certificate",{isDrawingMode:!0}));var e=canvas.getWidth()-5,t=canvas.getHeight()-5;fabric.Image.fromURL("images/page36/certificate-bg.png",function(n){n.set({top:0,left:0,width:e,height:t,clipTo:function(n){var i=-(e/2-1),a=-(t/2-1),o=e,r=t,s=40;2*s>o&&(s=o/2),2*s>r&&(s=r/2),n.beginPath(),n.moveTo(i+s,a),n.arcTo(i+o,a,i+o,a+r,s),n.arcTo(i+o,a+r,i,a+r,s),n.arcTo(i,a+r,i,a,s),n.arcTo(i,a,i+o,a,s),n.closePath()}}),canvas.add(n),n.sendToBack()}),canvas.add(new fabric.Rect({top:0,left:0,width:e,height:t,fill:"",strokeWidth:5,stroke:"#7DB2DB",rx:40,ry:40})),canvas.add(new fabric.Rect({top:5,left:5,width:e-5,height:t-5,fill:"#FFF",opacity:.4,rx:38,ry:38})),fabric.Image.fromURL("images/dove-logo2.png",function(e){e.set({top:50,left:50,width:181,height:123}),canvas.add(e)}),windowIsLoaded?addDetailsToCanvas(canvas,e,t):$(window).load(function(){addDetailsToCanvas(canvas,e,t)}),$id("download-pledge").show(),$id("create-new-pledge").show()}function repeat(e,t){return t=t||1,Array(t).join(e)}function addDetailsToCanvas(e,t,n){var i="";i=$("div.interactive-3 li.checked").length<1?$("div.interactive-3 li:eq(0)").text():$("div.interactive-3 li.checked").text();for(var a=('"'+nameOnCertificate+'" '+i.toUpperCase()).split(" "),o=[],r=40,s="",c=0;c<a.length;c++)""!==s?(s+" "+a[c]).length>r?(o.push(s),s=a[c]):s+=" "+a[c]:s=a[c];o.push(s);for(var l=!1,c=0;c<o.length;c++){var d={0:{}};if(o[c].match(/"/))for(var h=o[c].split(""),f=0;f<h.length;f++)'"'===h[f]?l===!1?l=!0:l===!0&&(l=!1):l&&(d[0][f]={textDecoration:"underline"});var p=new fabric.IText(o[c],{fontFamily:"skinnycaps",fontSize:80,left:100,top:200+60*c,width:t-120,styles:d});e.add(p),p.centerH()}e.add(new fabric.Text("Signed "+repeat(" ",11)+" Date "+$.format.date($.now(),"MMMM d, yyyy"),{fontFamily:"skinnycaps",fontSize:80,top:n-100,left:90})),e.add(new fabric.Line([10,n-28,270,n-28],{left:230,top:n-27,stroke:"#000",strokeWidth:2})),e.add(new fabric.Line([10,n-28,385,n-28],{left:628,top:n-27,stroke:"#000",strokeWidth:2}))}function downloadPledge(){null!==canvas&&($("<a>").attr({href:canvas.toDataURL(),download:"certificate.png"})[0].click(),ga("send","event","Button","click","Download this pledge"))}var $id=function(e){return $(document.getElementById(e))},currentWord=0,windowIsLoaded=!1,canvas=null,nameOnCertificate="";Reveal.initialize({controls:!0,progress:!0,width:1200,height:853,transition:"fade",backgroundTransition:"fade",margin:0,minScale:.2,maxScale:2,controls:!0,progress:!0,history:!0,center:!0,transition:"convex"}),$("button.play-btn").on("click",function(){Reveal.next()}),Reveal.addEventListener("slidechanged",function(e){var t=$(e.previousSlide),n=$(e.currentSlide);t.find("iframe[data-autoplay]").length>0&&$("div.reveal").removeClass("dark"),t.find("div.interactive-3").length>0&&$id("pledge-name-form").popup("hide"),t.find("div.interactive-4").length>0&&null!==canvas&&canvas.clear(),n.find("iframe[data-autoplay]").length>0&&($("div.reveal").addClass("dark"),ga("send","event","Video","play",n.find("h1").text())),n.find("div.interactive-1").length>0&&0===currentWord&&n.find("div.skinny:not(.preload)").length<1&&($("div.preload").remove(),showWord(currentWord)),n.find("div.interactive-4").length>0&&""!==nameOnCertificate&&initializeCanvas(),ga("send","pageview","/"+n.attr("id").replace(/#/,""))}),$id("show-second-block").on("click",function(){$id("first-block").hide(),$id("second-block").show()}),"1"!==$.cookie("show_intro_form")&&$id("intro-form").show().popup("show"),$("select").selectric(),$(":checkbox").iCheck({checkboxClass:"icheckbox_minimal-blue"}),$id("schoolrole").on("change",function(){var e=$(this).val();"other"===e.toLowerCase()?$id("schoolroleother").show():$id("schoolroleother").hide()});var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},schoolname=$id("schoolname"),schoolnames=$id("schoolnames");schoolnames.on("click","li",function(e){e.stopPropagation();var t=$(this).text();schoolname.val(t),schoolnames.removeClass("has-values").html("")}),$(document).on("click",function(e){(!schoolname.is(e.target)||!schoolnames.is(e.target)&&0===schoolnames.has(e.target).length)&&schoolnames.removeClass("has-values").html("")}),schoolname.on("input propertychange",$.debounce(function(){var e=$(this).val(),t=window.schoolnamesArray||[];if(schoolnames.removeClass("has-values").html(""),e){e=escapeRegExp(e);for(var n=[],i=0;i<t.length;i++){var a=t[i].replace(/(\(|\))/g,""),o=new RegExp("^"+e+"|\\s"+e+".*","ig");o.test(a)&&n.push(t[i])}if(n.length>0){schoolnames.addClass("has-values");for(var i=0;i<n.length;i++)schoolnames.append("<li>"+escapeHtml(n[i])+"</li>")}}},500)),$id("agree").on("ifChecked",function(){$id("submit-intro-form").prop("disabled",!1)}).on("ifUnchecked",function(){$id("submit-intro-form").prop("disabled",!0)}),$id("second-block").find("input[type=text], input[type=number], input[type=email]").on("input propertychange",function(){$(this).removeClass("error")}).end().find("select").on("change",function(){$(this).parents(".selectric-wrapper").removeClass("error")}),$id("second-block").on("submit",function(){$(this).find("input[type=text], input[type=number], input[type=email], .selectric-wrapper").removeClass("error");for(var e=$(this).serializeArray(),t=!1,n=0;n<e.length;n++){var i="",a="";-1===$.inArray(e[n].name,["agree","schoolroleother"])&&(""===e[n].value?a="Field is required.":"email"!==e[n].name||/\.edu\.au$/i.test(e[n].value)?"totalstudents"===e[n].name&&parseInt(e[n].value)===isNaN?a="Field expects a number.":"schoolrole"===e[n].name&&"other"===e[n].value.toLowerCase()&&""===$id("schoolroleother").val()&&(i="schoolroleother",a="Please specify your role."):a='Email address must contain ".edu.au".',a&&(i=i?i:e[n].name,$id(i).parents(".selectric-wrapper").length>0?$id(i).parents(".selectric-wrapper").addClass("error"):$id(i).addClass("error"),t=!0))}return t||($.cookie("show_intro_form","1",{expires:.5}),$id("intro-form").popup("hide"),ga("send","event","Form","submit","Initial form")),!1}),window.timelineWordsArray=shuffleArray(window.timelineWordsArray),$(".before.dropzone").droppable({accept:".words",over:dragListener("before"),out:function(e,t){$(this).removeClass("drop-active")},tolerance:"touch",drop:dropListener("before")}),$(".after.dropzone").droppable({accept:".words",over:dragListener("after"),out:function(e,t){$(this).removeClass("drop-active")},tolerance:"touch",drop:dropListener("after")}),$(window).load(function(){windowIsLoaded=!0,(window.location+"").match(/page-10/)&&($("div.preload").remove(),showWord(currentWord))}),$(".box button").on("click",function(){ga("send","event","Button","click",$(this).attr("name")),$(this).next().show().end().remove()}),$("div.interactive-3 li").on("click",function(){$("div.interactive-3 li").removeClass("checked"),$(this).addClass("checked"),ga("send","event","Pledge","select",$(this).text()),$id("pledge-name-form").popup("show")}),$id("enter-pledge-name").on("click",function(){var e=$id("student-name").val(),t=$id("class-name").val();return(e||t)&&(nameOnCertificate=e||t,ga("send","event","Form","enter-pledge-name",nameOnCertificate),Reveal.next()),!1}),$id("create-new-pledge").on("click",function(){ga("send","event","Button","click","Create another pledge"),nameOnCertificate="",Reveal.prev()}),function(){function e(e,t){e||(e=fabric.window.event);var o=e.target||(typeof e.srcElement!==n?e.srcElement:null),r=fabric.util.getScrollLeftTop(o,t),s=parseFloat($("div.slides").css("zoom")),c=i(e)+r.left,l=a(e)+r.top;return c/=s,l/=s,{x:c,y:l}}function t(e,t,n){var i="touchend"===e.type?"changedTouches":"touches";return e[i]&&e[i][0]?e[i][0][t]-(e[i][0][t]-e[i][0][n])||e[n]:e[n]}var n="unknown",i=function(e){return typeof e.clientX!==n?e.clientX:0},a=function(e){return typeof e.clientY!==n?e.clientY:0};fabric.isTouchSupported&&(i=function(e){return t(e,"pageX","clientX")},a=function(e){return t(e,"pageY","clientY")}),fabric.Canvas.prototype.getPointer=function(t,n,i){i||(i=this.upperCanvasEl);var a,o=e(t,i),r=i.getBoundingClientRect(),s=r.width||0,c=r.height||0;return s&&c||("top"in r&&"bottom"in r&&(c=Math.abs(r.top-r.bottom)),"right"in r&&"left"in r&&(s=Math.abs(r.right-r.left))),this.calcOffset(),o.x=o.x-this._offset.left,o.y=o.y-this._offset.top,n||(o=fabric.util.transformPoint(o,fabric.util.invertTransform(this.viewportTransform))),a=0===s||0===c?{width:1,height:1}:{width:i.width/s,height:i.height/c},{x:o.x*a.width,y:o.y*a.height}},fabric.IText.prototype._renderCharDecoration=function(e,t,n,i,a,o,r){var s=t?t.textDecoration||this.textDecoration:this.textDecoration;s&&(s.indexOf("underline")>-1&&e.fillRect(n,i+r/10,o,1),s.indexOf("line-through")>-1&&e.fillRect(n,i-r*(this._fontSizeFraction+this._fontSizeMult-1)+r/15,o,r/15),s.indexOf("overline")>-1&&e.fillRect(n,i-(this._fontSizeMult-this._fontSizeFraction)*r,o,r/15))}}(),$id("download-pledge").on("click",function(){downloadPledge()});
//# sourceMappingURL=application.js.map
