if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const l=e=>n(e,o),c={module:{uri:o},exports:t,require:l};i[o]=Promise.all(s.map((e=>c[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-ec8ebcaa"],(function(e){"use strict";e.setCacheNameDetails({prefix:"taskmotion_v1.5.7"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/browser-5g3M5Bx3.js",revision:null},{url:"assets/index-CaT4endd.js",revision:null},{url:"assets/index-CZVcOZj_.css",revision:null},{url:"index.html",revision:"54dcbb0ac7543a7a3bf93983d52f9308"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon-128x128.png",revision:"0890d883241414a365c547278cb9b778"},{url:"favicon-512x512.png",revision:"5f2b084115454585e3f76fb342d03762"},{url:"favicon-64x64.png",revision:"f781be5d5a9aac5388b38551f5f01ded"},{url:"manifest.webmanifest",revision:"173612228a6ab3b061fc376b90243874"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
