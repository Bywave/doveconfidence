function escapeHtml(e){return String(e).replace(/[&<>"'\/]/g,function(e){return entityMap[e]})}function escapeRegExp(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function shuffleArray(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),a=e[t];e[t]=e[n],e[n]=a}return e}function showWord(e){if(e<window.timelineWordsArray.length){var t=window.timelineWordsArray[e],n=t.words.replace(/\n/g,"<br>"),a=$('<div class="skinny words" data-'+t.timeline+' data-x="'+t.pos[0]+'" data-y="'+t.pos[1]+'" style="top: 15px;"></div>').html(n);$("div.interactive-1").append(a),a.css("left",$("div.interactive-1").outerWidth()/2-a.outerWidth()/2).hide().fadeIn().draggable({cursor:"move"})}}function dragListener(e){var t=e;return function(e,n){n.draggable.is("[data-"+t+"]")&&$(this).addClass("drop-active")}}function dropListener(e){var t=e;return function(e,n){if(!n.draggable.is("[data-"+t+"]"))return void ga("send","event","Timeline","incorrect",n.draggable.html().replace(/<br>/g,""));ga("send","event","Timeline","correct",n.draggable.html().replace(/<br>/g,""));var a=parseInt(n.draggable.data("x"),10),i=parseInt(n.draggable.data("y"),10);n.draggable.addClass("minimize").css("left",a).css("top",i).draggable("disable"),showWord(++currentWord),$(this).removeClass("drop-active")}}function initializeCanvas(){var e=new fabric.Canvas("certificate",{isDrawingMode:!0}),t=e.getWidth()-5,n=e.getHeight()-5;return fabric.Image.fromURL("images/page36/certificate-bg.png",function(a){a.set({top:0,left:0,width:t,height:n,clipTo:function(e){var a=-(t/2-1),i=-(n/2-1),o=t,r=n,d=40;2*d>o&&(d=o/2),2*d>r&&(d=r/2),e.beginPath(),e.moveTo(a+d,i),e.arcTo(a+o,i,a+o,i+r,d),e.arcTo(a+o,i+r,a,i+r,d),e.arcTo(a,i+r,a,i,d),e.arcTo(a,i,a+o,i,d),e.closePath()}}),e.add(a),a.sendToBack()}),e.add(new fabric.Rect({top:0,left:0,width:t,height:n,fill:"",strokeWidth:5,stroke:"#7DB2DB",rx:40,ry:40})),e.add(new fabric.Rect({top:5,left:5,width:t-5,height:n-5,fill:"#FFF",opacity:.4,rx:38,ry:38})),fabric.Image.fromURL("images/dove-logo2.png",function(t){t.set({top:50,left:50,width:181,height:123}),e.add(t)}),windowIsLoaded?addDetailsToCanvas(e,t,n):$(window).load(function(){addDetailsToCanvas(e,t,n)}),$id("download-pledge").show(),$id("create-new-pledge").show(),e}function repeat(e,t){return t=t||1,Array(t).join(e)}function addDetailsToCanvas(e,t,n){var a="";a=$("div.interactive-3 li.checked").length<1?$("div.interactive-3 li:eq(0)").text():$("div.interactive-3 li.checked").text();for(var i=('"'+nameOnCertificate+'" '+a.toUpperCase()).split(" "),o=[],r=40,d="",s=0;s<i.length;s++)""!==d?(d+" "+i[s]).length>r?(o.push(d),d=i[s]):d+=" "+i[s]:d=i[s];o.push(d);for(var l=!1,s=0;s<o.length;s++){var c={0:{}};if(o[s].match(/"/))for(var h=o[s].split(""),p=0;p<h.length;p++)'"'===h[p]?l===!1?l=!0:l===!0&&(l=!1):l&&(c[0][p]={textDecoration:"underline"});var f=new fabric.IText(o[s],{fontFamily:"skinnycaps",fontSize:80,left:100,top:200+60*s,width:t-120});e.add(f),f.centerH()}e.add(new fabric.Text("Signed "+repeat(" ",11)+" Date "+$.format.date($.now(),"MMMM d, yyyy"),{fontFamily:"skinnycaps",fontSize:80,top:n-100,left:90})),e.add(new fabric.Line([10,n-28,270,n-28],{left:230,top:n-27,stroke:"#000",strokeWidth:2})),e.add(new fabric.Line([10,n-28,385,n-28],{left:628,top:n-27,stroke:"#000",strokeWidth:2}))}function downloadPledge(){null!==_canvas&&($("<a>").attr({href:_canvas.toDataURL(),download:"certificate.png"})[0].click(),ga("send","event","Button","click","Download this pledge"))}var $id=function(e){return $(document.getElementById(e))},currentWord=0,windowIsLoaded=!1,_canvas=null,nameOnCertificate="";Reveal.initialize({controls:!0,progress:!0,width:1200,height:853,transition:"fade",backgroundTransition:"fade",margin:0,minScale:.2,maxScale:2,controls:!0,progress:!0,history:!0,center:!0,transition:"convex"}),$("button.play-btn").on("click",function(){Reveal.next()}),Reveal.addEventListener("slidechanged",function(e){var t=$(e.previousSlide),n=$(e.currentSlide);t.find("iframe[data-autoplay]").length>0&&$("div.reveal").removeClass("dark"),t.find("div.interactive-3").length>0&&$id("pledge-name-form").popup("hide"),n.find("iframe[data-autoplay]").length>0&&($("div.reveal").addClass("dark"),ga("send","event","Video","play",n.find("h1").text())),n.find("div.interactive-1").length>0&&0===currentWord&&n.find("div.skinny:not(.preload)").length<1&&($("div.preload").remove(),showWord(currentWord)),n.find("div.interactive-4").length>0&&""!==nameOnCertificate&&(_canvas=initializeCanvas()),ga("send","pageview","/"+n.attr("id").replace(/#/,""))}),$id("show-second-block").on("click",function(){$id("first-block").hide(),$id("second-block").show()}),"1"!==$.cookie("show_intro_form")&&$id("intro-form").show().popup("show"),$("select").selectric(),$(":checkbox").iCheck({checkboxClass:"icheckbox_minimal-blue"}),$id("schoolrole").on("change",function(){var e=$(this).val();"other"===e.toLowerCase()?$id("schoolroleother").show():$id("schoolroleother").hide()});var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},schoolname=$id("schoolname"),schoolnames=$id("schoolnames");schoolnames.on("click","li",function(e){e.stopPropagation();var t=$(this).text();schoolname.val(t),schoolnames.removeClass("has-values").html("")}),$(document).on("click",function(e){(!schoolname.is(e.target)||!schoolnames.is(e.target)&&0===schoolnames.has(e.target).length)&&schoolnames.removeClass("has-values").html("")}),schoolname.on("input propertychange",$.debounce(function(){var e=$(this).val(),t=window.schoolnamesArray||[];if(schoolnames.removeClass("has-values").html(""),e){e=escapeRegExp(e);for(var n=[],a=0;a<t.length;a++){var i=t[a].replace(/(\(|\))/g,""),o=new RegExp("^"+e+"|\\s"+e+".*","ig");o.test(i)&&n.push(t[a])}if(n.length>0){schoolnames.addClass("has-values");for(var a=0;a<n.length;a++)schoolnames.append("<li>"+escapeHtml(n[a])+"</li>")}}},500)),$id("agree").on("ifChecked",function(){$id("submit-intro-form").prop("disabled",!1)}).on("ifUnchecked",function(){$id("submit-intro-form").prop("disabled",!0)}),$id("second-block").find("input[type=text], input[type=number], input[type=email]").on("input propertychange",function(){$(this).removeClass("error")}).end().find("select").on("change",function(){$(this).parents(".selectric-wrapper").removeClass("error")}),$id("second-block").on("submit",function(){$(this).find("input[type=text], input[type=number], input[type=email], .selectric-wrapper").removeClass("error");for(var e=$(this).serializeArray(),t=!1,n=0;n<e.length;n++){var a="",i="";-1===$.inArray(e[n].name,["agree","schoolroleother"])&&(""===e[n].value?i="Field is required.":"email"!==e[n].name||/\.edu\.au$/i.test(e[n].value)?"totalstudents"===e[n].name&&parseInt(e[n].value)===isNaN?i="Field expects a number.":"schoolrole"===e[n].name&&"other"===e[n].value.toLowerCase()&&""===$id("schoolroleother").val()&&(a="schoolroleother",i="Please specify your role."):i='Email address must contain ".edu.au".',i&&(a=a?a:e[n].name,$id(a).parents(".selectric-wrapper").length>0?$id(a).parents(".selectric-wrapper").addClass("error"):$id(a).addClass("error"),t=!0))}return t||($.cookie("show_intro_form","1",{expires:.5}),$id("intro-form").popup("hide"),ga("send","event","Form","submit","Initial form")),!1}),window.timelineWordsArray=shuffleArray(window.timelineWordsArray),$(".before.dropzone").droppable({accept:".words",over:dragListener("before"),out:function(e,t){$(this).removeClass("drop-active")},tolerance:"touch",drop:dropListener("before")}),$(".after.dropzone").droppable({accept:".words",over:dragListener("after"),out:function(e,t){$(this).removeClass("drop-active")},tolerance:"touch",drop:dropListener("after")}),$(window).load(function(){windowIsLoaded=!0,(window.location+"").match(/page-10/)&&($("div.preload").remove(),showWord(currentWord))}),$(".box button").on("click",function(){ga("send","event","Button","click",$(this).attr("name")),$(this).next().show().end().remove()}),$("div.interactive-3 li").on("click",function(){$("div.interactive-3 li").removeClass("checked"),$(this).addClass("checked"),ga("send","event","Pledge","select",$(this).text()),$id("pledge-name-form").popup("show")}),$id("enter-pledge-name").on("click",function(){var e=$id("student-name").val(),t=$id("class-name").val();return(e||t)&&(nameOnCertificate=e||t,ga("send","event","Form","enter-pledge-name",nameOnCertificate),Reveal.next()),!1}),$id("create-new-pledge").on("click",function(){ga("send","event","Button","click","Create another pledge"),nameOnCertificate="",Reveal.prev()}),fabric.IText.prototype._renderCharDecoration=function(e,t,n,a,i,o,r){var d=t?t.textDecoration||this.textDecoration:this.textDecoration;d&&(d.indexOf("underline")>-1&&e.fillRect(n,a+r/10,o,1),d.indexOf("line-through")>-1&&e.fillRect(n,a-r*(this._fontSizeFraction+this._fontSizeMult-1)+r/15,o,r/15),d.indexOf("overline")>-1&&e.fillRect(n,a-(this._fontSizeMult-this._fontSizeFraction)*r,o,r/15))},$id("download-pledge").on("click",function(){downloadPledge()});
//# sourceMappingURL=application.js.map
