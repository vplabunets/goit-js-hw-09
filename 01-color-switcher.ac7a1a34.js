!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");console.log(t);var o=document.querySelector("body");console.log(o),t.addEventListener("click",(function(){timerId=setInterval((function(){o.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16)),t.setAttribute("disabled",!0)}),1e3),console.log(t)})),e.addEventListener("click",(function(){clearInterval(timerId),t.removeAttribute("disabled"),console.log(t)}))}();
//# sourceMappingURL=01-color-switcher.ac7a1a34.js.map
