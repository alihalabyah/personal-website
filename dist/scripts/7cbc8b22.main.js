var about=function(){console.log("about route")},contact=function(){console.log("contact route")},routes={"/about":about,"/contact":contact},router=Router(routes);router.configure({html5history:!0}),router.init(),$(function(){$(document).ready(function(){$("body").addClass("ready");var a,b,c,d=$(".project"),e=$(".top-border"),f=Math.floor(210*Math.random());$(".project").each(function(a){c="animation-delay: "+(a+6)/8+"s;",$(this).attr("style",c)}),$(".projects h2").each(function(e){var g=f+10*e;(0===e||e===d.length-1)&&(0===e?a=g:b=g),c="background: hsl("+g+",65%,65%); color:hsl("+g+",45%,55%);",$(this).attr("style",c)}),c="background: linear-gradient(90deg, hsl("+a+",65%,65%), hsl("+b+",65%,65%)) hsl("+a+",65%,65%) repeat;",e.attr("style",c)})});