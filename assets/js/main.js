(()=>{"use strict";const e=document.querySelectorAll(".toggle-box__btn"),t=document.getElementById("channelSearchBtn"),n=document.getElementById("videoLiveBtn"),s=e=>{e.preventDefault();let t=e.target.parentElement;t.classList.contains("toggle-box")||(t=t.parentElement);const n=t.querySelector(".toggle-box__elems");n.classList.contains("hidden")?n.classList.remove("hidden"):n.classList.add("hidden")};e&&e.forEach((e=>{e.addEventListener("click",s)})),t&&t.addEventListener("click",(e=>{e.preventDefault();const t=e.target.parentElement;let n=t.querySelector("form");n||(n=t.parentElement.querySelector("form")),n.classList.contains("hidden")?n.classList.remove("hidden"):n.classList.add("hidden")})),n&&n.addEventListener("click",(e=>{e.preventDefault();const t=document.getElementById("videoLive"),n=t.querySelector("video"),s=t.querySelector("button");n.classList.contains("hidden")?(n.classList.remove("hidden"),s.classList.remove("hidden")):(n.classList.add("hidden"),s.classList.add("hidden"))}))})();