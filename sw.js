if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const l=e=>s(e,o),d={module:{uri:o},exports:t,require:l};i[o]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-ec8ebcaa"],(function(e){"use strict";e.setCacheNameDetails({prefix:"taskmotion_v1.5.4"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/browser-BXhzPf0v.js",revision:null},{url:"assets/index-DbUezO39.css",revision:null},{url:"assets/index-dZ3di8DR.js",revision:null},{url:"index.html",revision:"7064d42eabdbd446bd5b982b004b1167"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon-128x128.png",revision:"0890d883241414a365c547278cb9b778"},{url:"favicon-512x512.png",revision:"5f2b084115454585e3f76fb342d03762"},{url:"favicon-64x64.png",revision:"f781be5d5a9aac5388b38551f5f01ded"},{url:"manifest.webmanifest",revision:"173612228a6ab3b061fc376b90243874"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
