(function(n){function e(e){for(var r,a,u=e[0],i=e[1],l=e[2],d=0,p=[];d<u.length;d++)a=u[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n[r]=i[r]);f&&f(e);while(p.length)p.shift()();return c.push.apply(c,l||[]),t()}function t(){for(var n,e=0;e<c.length;e++){for(var t=c[e],r=!0,a=1;a<t.length;a++){var i=t[a];0!==o[i]&&(r=!1)}r&&(c.splice(e--,1),n=u(u.s=t[0]))}return n}var r={},o={app:0},c=[];function a(n){return u.p+"js/"+({}[n]||n)+"."+{"chunk-0e1534c4":"92bdee40","chunk-1f9e91d6":"e832952b","chunk-30b71466":"ccbe41b6","chunk-337faa1c":"9ff12ced","chunk-60047078":"a26a27ac","chunk-653d2734":"50b6a832","chunk-712f2df5":"3bf7799e","chunk-a8a7b178":"608b2719","chunk-ace657c0":"185f64ca"}[n]+".js"}function u(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.e=function(n){var e=[],t=o[n];if(0!==t)if(t)e.push(t[2]);else{var r=new Promise((function(e,r){t=o[n]=[e,r]}));e.push(t[2]=r);var c,i=document.createElement("script");i.charset="utf-8",i.timeout=120,u.nc&&i.setAttribute("nonce",u.nc),i.src=a(n);var l=new Error;c=function(e){i.onerror=i.onload=null,clearTimeout(d);var t=o[n];if(0!==t){if(t){var r=e&&("load"===e.type?"missing":e.type),c=e&&e.target&&e.target.src;l.message="Loading chunk "+n+" failed.\n("+r+": "+c+")",l.name="ChunkLoadError",l.type=r,l.request=c,t[1](l)}o[n]=void 0}};var d=setTimeout((function(){c({type:"timeout",target:i})}),12e4);i.onerror=i.onload=c,document.head.appendChild(i)}return Promise.all(e)},u.m=n,u.c=r,u.d=function(n,e,t){u.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},u.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},u.t=function(n,e){if(1&e&&(n=u(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)u.d(t,r,function(e){return n[e]}.bind(null,r));return t},u.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return u.d(e,"a",e),e},u.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},u.p="",u.oe=function(n){throw console.error(n),n};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var d=0;d<i.length;d++)e(i[d]);var f=l;c.push([0,"chunk-vendors"]),t()})({0:function(n,e,t){n.exports=t("56d7")},"56d7":function(n,e,t){"use strict";t.r(e);t("4160"),t("b64b"),t("159b"),t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),o=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},c=[],a=(t("5c0b"),t("2877")),u={},i=Object(a["a"])(u,o,c,!1,null,null,null),l=i.exports,d=(t("d3b7"),t("8c4f"));r["a"].use(d["a"]);var f=[{path:"/",name:"Home",component:function(){return t.e("chunk-712f2df5").then(t.bind(null,"bb51"))}},{path:"/login",name:"Login",component:function(){return t.e("chunk-ace657c0").then(t.bind(null,"a55b"))}},{path:"/admin",name:"Admin",component:function(){return t.e("chunk-60047078").then(t.bind(null,"e313"))},children:[{path:"products",name:"產品頁面",component:function(){return t.e("chunk-1f9e91d6").then(t.bind(null,"61bc"))}},{path:"coupons",name:"優惠卷列表",component:function(){return t.e("chunk-0e1534c4").then(t.bind(null,"8c58"))}},{path:"orders",name:"訂單列表",component:function(){return t.e("chunk-337faa1c").then(t.bind(null,"efd9"))}},{path:"customer_orders",name:"模擬下單系統",component:function(){return t.e("chunk-a8a7b178").then(t.bind(null,"d2e2"))}},{path:"customer_checkout",name:"用戶訂單列表",component:function(){return t.e("chunk-653d2734").then(t.bind(null,"9a03"))}},{path:"customer_payorder/:id",name:"用戶訂單結帳",component:function(){return t.e("chunk-30b71466").then(t.bind(null,"c511"))}}]}],p=new d["a"]({routes:f}),s=p,h=t("9062"),b=t.n(h),m=(t("e40d"),t("bc3a")),v=t.n(m),k=t("a7fe"),y=t.n(k),g=(t("4989"),t("ab8b"),t("7bb1")),w=t("4c93"),O=t("60d4"),j=t("ecee"),_=t("b702"),P=t("ad3d");r["a"].config.productionTip=!1,r["a"].component("Loading",b.a),r["a"].use(y.a,v.a),r["a"].component("ValidationProvider",g["b"]),r["a"].component("ValidationObserver",g["a"]),j["c"].add(_["a"]),r["a"].component("font-awesome-icon",P["a"]),Object.keys(w).forEach((function(n){Object(g["d"])(n,w[n])})),Object(g["c"])({classes:{valid:"is-valid",invalid:"is-invalid"}}),Object(g["e"])("tw",O),new r["a"]({router:s,render:function(n){return n(l)}}).$mount("#app")},"5c0b":function(n,e,t){"use strict";var r=t("9c0c"),o=t.n(r);o.a},"9c0c":function(n,e,t){}});
//# sourceMappingURL=app.e69baaed.js.map