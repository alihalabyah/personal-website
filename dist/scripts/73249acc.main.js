var about=function(){console.log("about route")},contact=function(){console.log("contact route")},routes={"/about":about,"/contact":contact},router=Router(routes);router.configure({html5history:!0}),router.init();var $projects=$(".project"),$topborder=$(".top-border"),color=Math.floor(255*Math.random()),first,last,css;$(function(){$(document).ready(function(){$("body").addClass("ready"),$(".project").each(function(a){css="animation-delay: "+(a+3)/4+"s;",$(this).attr("style",css)}),$(".projects h2").each(function(a){var b=color+13*a;(0===a||a===$projects.length-1)&&(0===a?first=b:last=b),css="background: hsl("+b+",75%,65%); color:hsl("+b+",65%,55%);",$(this).attr("style",css)}),css="background: linear-gradient(90deg, hsl("+first+",65%,65%), hsl("+last+",65%,65%)) hsl("+first+",65%,65%) repeat;",$topborder.attr("style",css)})});