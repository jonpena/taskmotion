if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>i(e,o),c={module:{uri:o},exports:t,require:l};s[o]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-ec8ebcaa"],(function(e){"use strict";e.setCacheNameDetails({prefix:"taskmotion_v1.6.7"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/browser-DHhtM5dG.js",revision:null},{url:"assets/index-Bwsst3wu.css",revision:null},{url:"assets/index-szTGyQOQ.js",revision:null},{url:"index.html",revision:"fa20e5f261a1b69c517056ecd6b22dae"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon-128x128.png",revision:"0890d883241414a365c547278cb9b778"},{url:"favicon-512x512.png",revision:"5f2b084115454585e3f76fb342d03762"},{url:"favicon-64x64.png",revision:"f781be5d5a9aac5388b38551f5f01ded"},{url:"manifest.webmanifest",revision:"173612228a6ab3b061fc376b90243874"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
