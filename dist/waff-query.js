/*! waff-query v2.0.0-beta3 (2016-11-27) | Released under the MIT license */
var extend=function(a,b){function c(){this.constructor=a}for(var d in b)hasProp.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},hasProp={}.hasOwnProperty;!function(a,b){var c,d,e;if("undefined"!=typeof module){e={};for(c in b)d=b[c],b.hasOwnProperty(c)&&("_"!==c[0]?e[c]=d:e[c.slice(1)]=d);return module.exports=e}if("function"==typeof define&&"object"==typeof define.amd)return define("waff-query",[],function(){e={};for(c in b)d=b[c],b.hasOwnProperty(c)&&("_"!==c[0]?e[c]=d:e[c.slice(1)]=d);return e});this.waff=b;for(c in b)d=b[c],b.hasOwnProperty(c)&&"_"===c[0]&&(this.waff[c.slice(1)]=d);return this.ps=this.waff.ps,this.qq=this.waff.qq,this.q=this.waff.q,this.e=this.waff.e,this.t=this.waff.t,this.selector=this.waff.selector,this.element=this.waff.element,this.text=this.waff.text,this.query=this.waff.query}(null,function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p;p={ps:function(){var a;return a=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,q,r,s;for(s=!1,j=!1,d=!1,r=a||"",q="",e="",o=function(b){var c,e,f,g,h,i,j;if(b=b.slice(1,-1),a=-1!==b.indexOf(" i",b.length-2),h=!1,a&&(b=b.slice(0,-2)),j={},f="",i="",""!==b){for(e=0,g=b.length;e<g;e++)c=b[e],null==j.op?-1!==p.__index(["=","|","*","^","$","~"],c)&&(j.op=c,j.na=i,i="",c=""):"="===c&&-1!==p.__index(["|","*","^","$","~"],j.op)&&(j.op+=c,c=""),i+=c,f=c;if(null!=j.op&&null!=j.na||(j.na=i,i=null),null!=j.na&&!(null!=j.op&&""===i||null!=j.op&&""===j.na))return d===!1&&(d={}),null!=i&&("'"===i[0]&&"'"===i[i.length-1]||'"'===i[0]&&'"'===i[i.length-1])&&(i=JSON.parse(i)),d[j.na]={operator:j.op||!1,value:i||!1,caseSensitive:a}}},k=0,m=r.length;k<m;k++)g=r[k],"["===g?e+=g:"]"===g?(e+=g,o(e),e=""):0===e.length?q+=g:e+=g;if(r=q,h=r.split("."),"."!==r[0]&&(s=h[0]),h.splice(0,1),""===s&&(s=!1),s!==!1&&-1!==p.__index(s,"#")&&(c=s.split("#"),s=c[0],j=c[1]),j===!1)for(i=l=0,n=h.length;l<n;i=++l)if(f=h[i],b=f.split("#"),b[1]){j=b[1],h[i]=b[0];break}return{tag:s,id:j,class:h,attr:d}}}(),qq:function(){var a,b,c;return c=function(a,b,c){return c===!0&&[b.querySelector(a)],b.querySelectorAll(a)},b=function(a,b,d){return p.__has(a,"[")?c(a,b,d):/^[A-z0-9*-]+$/.test(a)?b.getElementsByTagName(a):/^#[A-z0-9*-]+$/.test(a)?[document.getElementById(a.slice(1))]:/^\.[A-z0-9*-.]+$/.test(a)?b.getElementsByClassName(a.replace(/\./g," ").slice(1)):c(a,b,d)},a=function(a,c,d){var e,f,g,h,i,j,k,l,m,n,o,q,r,s,t,u,v,w,x,y,z,A;if(null==a&&(a="body"),null==c&&(c=document),null==d&&(d=!1),""===a&&(a="*"),p.__isarray(c)){for(y=this.ps(a),f=p.__toarray(c),x=[],e=[],k=0,m=f.length;k<m;k++)i=f[k],i instanceof Element&&e.push(i);if(f=e,"*"===y.tag)return d===!0?f[0]:f;for(l=0,n=f.length;l<n;l++){if(i=f[l],t=!0,t===!0&&y.tag!==!1&&i.tagName.toLowerCase()!==y.tag.toLowerCase()&&(t=!1),t===!0&&y.id!==!1&&i.id!==y.id&&(t=!1),t===!0)for(v=y.class,r=0,o=v.length;r<o;r++)h=v[r],i.class.has(h)||(t=!1);if(t===!0&&y.attr!==!1){w=y.attr;for(g in w)if(s=w[g],t===!0)switch(s.operator){case!1:t=i.hasAttribute(g);break;case"=":t=s.value===i.attr(g);break;case"^=":t=0===p.__index(i.attr(g),s.value);break;case"$=":A=i.attr(g),t=-1!==A.indexOf(s.value,A.length-s.value);break;case"~=":t=-1!==p.__index(i.attr(g).split(" "),s.value);break;case"|=":A=i.attr(g),t=s.value===A,t!==!0&&(t=0===p.__index(A,s.value+"-"));break;case"*=":t=-1!==p.__index(i.attr(g),s.value)}}if(t===!0){if(d===!0)return i;x.push(i)}}return x}if(a instanceof Element)return[a];if(p.__isarray(a)){for(f=p.__toarray(a),e=[],j=z=0,q=f.length;z<q;j=++z)if(a=f[j],a instanceof Element){if(d===!0)return a;e.push(a)}else{if(u=b(a,c,d),d===!0)return u[0];e.push.apply(e,u)}return e}return d===!0?b(a,c,d)[0]:p.__toarray(b(a,c,d))}}(),q:function(){var a;return a=function(a,b){return this.qq(a,b,!0)||null}}(),e:function(){var a;return a=function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o;for(o=this.ps(a),g=document.createElement(o.tag||"div"),o.id&&(g.id=o.id),m=o.class,h=0,j=m.length;h<j;h++)e=m[h],g.class.add(e);if(o.attr){n=o.attr;for(d in n)l=n[d],"="===l.operator&&g.attr(d,l.value)}if(p.__isarray(b)&&(c=b),null!=b&&p.__isobject(b)&&g.attr(b),null!=c)for(i=0,k=c.length;i<k;i++)f=c[i],(f instanceof Element||f instanceof Text)&&g.append(f);return g}}(),t:function(){var a;return a=function(a){return document.createTextNode(a)}}()},p.selector={parse:p.ps},p.query=p.q,p.q.all=p.qq,p.query.all=p.qq,p.element=p.e,p.text=p.t,p._version="2.0.0-beta3",p.__isobject=function(){var a;return a=function(a){return"[object Object]"===Object.prototype.toString.call(a)}}(),p.__isarray=function(){var a;return a=function(a){return a instanceof Array||a instanceof NodeList}}(),p.__toarray=function(){var a;return a=function(a){var b;return b=[],Array.prototype.push.apply(b,a),b}}(),p.__has=function(){var a;return a=function(a,b){var c,d,e,f;for(d=e=0,f=a.length;e<f;d=++e)if(c=a[d],c===b)return!0;return!1}}(),p.__index=function(){var a;return a=function(a,b){var c,d,e,f;for(c=d=0,e=a.length;d<e;c=++d)if(f=a[c],f===b)return c;return-1}}(),p.__prop=function(){var a;return a=function(a,b,c){var d;try{return Object.defineProperty(a,b,c)}catch(e){if(d=e,null!=c.get&&Object.prototype.__defineGetter__.call(a,b,c.get),null!=c.set&&Object.prototype.__defineSetter__.call(a,b,c.set),null!=c.value)return a[b]=c.value}}}(),function(){if(!window.console)return window.console={log:function(){},warn:function(){},error:function(){}}}(),function(){return window.XMLHttpRequest=window.XMLHttpRequest||function(){var a;try{return new XDomainRequest}catch(b){a=b}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(b){a=b}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(b){a=b}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(b){a=b}},XMLHttpRequest.UNSENT=0,XMLHttpRequest.OPENED=1,XMLHttpRequest.HEADERS_RECEIVED=2,XMLHttpRequest.LOADING=3,XMLHttpRequest.DONE=4,function(){var a,b;if(a=function(a){var b,c,d;if(this._data=[],a){for(c=0,d=[];c<a.elements.length;)b=a.elements[c],""!==b.name&&this.append(b.name,b.value),d.push(++c);return d}},!("FormData"in window))return a.prototype={append:function(a,b){if("Blob"in window&&b instanceof window.Blob)throw TypeError("Blob not supported");return a=String(a),this._data.push([a,b])},toString:function(){return this._data.map(function(a){return encodeURIComponent(a[0])+"="+encodeURIComponent(a[1])}).join("&")}},window.FormData=a,b=window.XMLHttpRequest.prototype.send,window.XMLHttpRequest.prototype.send=function(c){return c instanceof a&&(null!=this.setRequestHeader&&this.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),arguments[0]=c.toString()),b.apply(this,arguments)}}()}(),function(){var a;try{return new Event("waff :3")}catch(b){return a=b,window.Event=function(a,b){var c;return null==b&&(b={}),c=document.createEvent("Event"),c.initEvent(a,!!b.bubbles,!!b.cancelable),c}}}(),function(){var a,b;try{return window.MutationObserver=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver||function(){throw"-,-"}()}catch(c){return b=c,a=function(){function a(a){this.callback=a,this.elements=[]}return a.prototype.observe=function(a,b){if(this.elements.push(a),b.childList===!0&&(a.on("DOMNodeInserted",function(a){return function(c){if(c.relatedNode===c.currentTarget||b.subtree===!0)return a.callback([{target:c.relatedNode,type:"childList",addedNodes:[c.target],removedNodes:[]}])}}(this)),a.on("DOMNodeRemoved",function(a){return function(c){if(c.relatedNode===c.currentTarget||b.subtree===!0)return a.callback([{target:c.relatedNode,type:"childList",removedNodes:[c.target],addedNodes:[]}])}}(this))),b.attributes===!0&&a.on("DOMAttrModified",function(a){return function(c){var d;if(c.target===c.currentTarget||b.subtree===!0)return d={target:c.target,type:"attributes",attributeName:c.attrName},b.attributeOldValue===!0&&(d.oldValue=c.prevValue),a.callback([d])}}(this)),b.characterData===!0)return a.on("DOMCharacterDataModified",function(a){return function(c){var d;if(c.target===c.currentTarget||b.subtree===!0)return d={target:c.target,type:"characterData"},b.characterDataOldValue===!0&&(d.oldValue=c.prevValue),a.callback([d])}}(this))},a.prototype.disconnect=function(){var a,b,c,d,e;for(d=this.elements,e=[],b=0,c=d.length;b<c;b++)a=d[b],a.off("DOMNodeInserted"),a.off("DOMNodeRemoved"),a.off("DOMAttrModified"),e.push(a.off("DOMCharacterDataModified"));return e},a}(),window.MutationObserver=a}}(),p._EventTargets=function(){var a;try{if(EventTarget.prototype.waff=":3",EventTarget.prototype.waff!==Element.prototype.waff)throw"";return[EventTarget]}catch(b){return a=[Element,Document,Node,FormData,window.constructor],"XMLHttpRequest"in window&&a.push(window.XMLHttpRequest),"FileReader"in window&&a.push(window.FileReader),"Blob"in window&&a.push(window.Blob),a}}(),p._EventEmitter=function(){var a;return a=function(){function a(){this._emitter=p.e()}return a.prototype.on=function(a,b,c){return this._emitter.on.call({emitter:this._emitter,obj:this},a,b,c)},a.prototype.once=function(a,b,c){return this._emitter.once.call({emitter:this._emitter,obj:this},a,b,c)},a.prototype.off=function(a,b,c){return this._emitter.off.call({emitter:this._emitter,obj:this},a,b,c)},a.prototype.emit=function(a,b){return this._emitter.emit.call({emitter:this._emitter,obj:this},a,b)},a.prototype.dispatchEvent=function(a,b,c){return this._emitter.dispatchEvent.call(this._emitter,a,b,c)},a}(),a.extend=function(a){var b;return b=a._emitter=p.e(),null==a.on&&(a.on=b.on.bind({emitter:b,obj:a})),null==a.once&&(a.once=b.once.bind({emitter:b,obj:a})),null==a.off&&(a.off=b.off.bind({emitter:b,obj:a})),null==a.dispatchEvent&&(a.dispatchEvent=b.dispatchEvent.bind(b)),null==a.emit&&(a.emit=b.emit.bind({emitter:b,obj:a})),a},a}(),p._Promise=function(){var a;return a=function(a){function b(a){b.__super__.constructor.call(this),this._then=[],this._catch=[],a(this._resolve(this),this._reject(this))}return extend(b,a),b.prototype.then=function(a,b){return this._then.push(a),null!=b&&this._catch.push(b),this},b.prototype.catch=function(a){return this._catch.push(a),this},b.prototype._resolve=function(a){return function(){var b,c,d,e,f;for(a.emit("fulfill",arguments),e=a._then,f=[],c=0,d=e.length;c<d;c++)b=e[c],f.push(b.apply(this,arguments));return f}},b.prototype.resolve=function(){return this._resolve(this).apply(this,arguments),this},b.prototype._reject=function(a){return function(){var b,c,d,e,f;for(a.emit("reject",arguments),e=a._catch,f=[],c=0,d=e.length;c<d;c++)b=e[c],f.push(b.apply(this,arguments));return f}},b.prototype.reject=function(){return this._reject(this).apply(this,arguments)},b}(p._EventEmitter)}(),p._get=function(){var a;return a=function(a,b){return null==b&&(b={}),new p._Promise(function(c,d){var e,f;try{f=new XMLHttpRequest,f.open("get",a,!0),f.timeout=b.timeout||2e3,f.on("readystatechange",function(a){var d;if(4===f.readyState&&f.status>=200&&f.status<400)return d=f.responseText,b.json===!0&&(d=JSON.parse(d)),f.res=d,c.call(f,d)}),f.on("error",function(a){return f.res={status:f.status,error:f.statusText},d.call(f,f.res)}),f.on("timeout",function(a){return f.res={status:f.status,error:f.statusText},d.call(f,f.res)});try{f.overrideMimeType("text/plain")}catch(a){}return f.send()}catch(a){if(e=a,-1===e.message.indexOf("Access is denied."))throw e;return console.error("IE<11 does not handle xhr well")}})}}(),p._post=function(){var a;return a=function(a,b,c){var d;null==b&&(b={}),null==c&&(c={});try{return new p._Promise(function(d,e){var f,g,h,i;if(h=new XMLHttpRequest,h.open(c.method||"post",a,!0),h.timeout=c.timeout||2e3,h.on("readystatechange",function(a){var b;if(4===h.readyState&&h.status>=200&&h.status<400)return b=h.responseText,c.json===!0&&(b=JSON.parse(b)),h.res=b,d.call(h,b)}),h.on("error",function(a){return h.res={status:h.status,error:h.statusText},e.call(h,h.res)}),h.on("timeout",function(a){return h.res={status:h.status,error:h.statusText},e.call(h,h.res)}),null==c.form||c.form===!0){h.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),f=new FormData;for(g in b)i=b[g],b.hasOwnProperty(g)&&f.append(g,i);b=f}else b=JSON.stringify(b);return h.send(b)})}catch(a){if(d=a,-1===d.message.indexOf("Access is denied."))throw d;return console.error("IE<11 does not handle xhr well")}}}(),p._put=function(){var a;return a=function(a,b,c){return null==b&&(b={}),null==c&&(c={}),c.method="put",p._post(a,b,c)}}(),p._delete=function(){var a;return a=function(a,b,c){return null==b&&(b={}),null==c&&(c={}),c.method="delete",p._post(a,b,c)}}(),p._patch=function(){var a;return a=function(a,b,c){return null==b&&(b={}),null==c&&(c={}),c.method="patch",p._post(a,b,c)}}(),p._head=function(){var a;return a=function(a,b){var c;null==b&&(b={});try{return new p._Promise(function(c,d){var e;return e=new XMLHttpRequest,e.open("head",a,!0),e.timeout=b.timeout||2e3,e.setRequestHeader("Access-Control-Expose-Headers","Content-Type, Location"),e.on("readystatechange",function(a){if(4===e.readyState&&e.status>=200&&e.status<400)return e.res=e.getAllResponseHeaders(),c.call(e,e.getAllResponseHeaders())}),e.on("error",function(a){return e.res={status:e.status,error:e.statusText},d.call(e,e.res)}),e.on("timeout",function(a){return e.res={status:e.status,error:e.statusText},d.call(e,e.res)}),e.send()})}catch(a){if(c=a,-1===c.message.indexOf("Access is denied."))throw c;return console.error("IE<11 does not handle xhr well")}}}(),Element.prototype.q=function(a){return p.q(a,this)},Element.prototype.qq=function(a){return p.qq(a,this)},Element.prototype.query=Element.prototype.q,Element.prototype.query.all=Element.prototype.qq,Element.prototype.q.all=Element.prototype.qq,Array.prototype.q=function(a){return p.q(a,this)},Array.prototype.qq=function(a){return p.qq(a,this)},Array.prototype.query=Array.prototype.q,Array.prototype.query.all=Array.prototype.qq,Array.prototype.q.all=Array.prototype.qq,Element.prototype.append=function(){var a,b,c,d,e,f,g;for(c=0,e=arguments.length;c<e;c++)if(b=arguments[c],p.__isarray(b))for(g=p.__toarray(b),d=0,f=g.length;d<f;d++)a=g[d],this.appendChild(b);else this.appendChild(b);return this},Element.prototype.prepend=function(){var a,b,c,d,e;for(c=arguments.length-1;c>=0;c+=-1)if(b=arguments[c],p.__isarray(b))for(e=p.__toarray(b),d=e.length-1;d>=0;d+=-1)a=e[d],null!=this.firstChild?this.insertBefore(a,this.firstChild):this.append(a);else null!=this.firstChild?this.insertBefore(b,this.firstChild):this.append(b);return this},Element.prototype.before=function(a){return null!=a.parent&&a.parent.insertBefore(this,a),this},Element.prototype.after=function(a){return null!=a.parent&&(null!=a.nextSibling?a.parent.insertBefore(this,a.nextSibling):a.parent.append(this)),this},Element.prototype.text=function(a){var b,c,d,e,f,g,h;if(null==a)return this.textContent;if(c=!(1===this.childNodes.length&&this.childNodes[0]instanceof Text),c&&this.clear(),p.__isarray(a)){for(b="",g=p.__toarray(a),e=0,f=g.length;e<f;e++)h=g[e],b+=h instanceof Text?h.get():"string"==typeof h?h:h.toString();return c?(d=p.t(b),this.append(d),d):this.childNodes[0].set(b)}return a instanceof Text&&(a=a.get()),c?(d=p.t(a),this.append(d),d):this.childNodes[0].set(a)},Array.prototype.text=function(){var a,b,c;for(b=0,c=this.length;b<c;b++)a=this[b],a instanceof Element&&a.text.apply(a,arguments);return this},Element.prototype.html=function(a){var b,c,d,e;if(null==a)return this.innerHTML;if(this.clear(),a instanceof Element)return this.append(a),this;if(a instanceof NodeList||p.__isarray(a)){for(b=p.__toarray(a),d=0,e=b.length;d<e;d++)c=b[d],(c instanceof Element||c instanceof Text)&&this.append(c);return this}return a instanceof Text&&(a=a.get()),this.innerHTML=a,this},Array.prototype.html=function(){var a,b,c;for(b=0,c=this.length;b<c;b++)a=this[b],a instanceof Element&&a.html.apply(a,arguments);return this},p.__prop(Element.prototype,"path",{configurable:!0,get:function(){var a,b,c,d;for(d=this,c=[];d.parentNode;){if(""!==d.id){c.unshift("#"+d.id);break}if(d===p.q("html"))c.unshift(d.tagName.toLowerCase());else{for(b=1,a=d;a.previousElementSibling;)a=a.previousElementSibling,b++;c.unshift(d.tagName.toLowerCase()+":nth-child("+b+")")}d=d.parentNode}return c.join(" > ")},set:function(){return this}}),Element.prototype.css=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n;if(c=function(a){return a.replace(/(\-[a-z])/g,function(a){return a.toUpperCase().slice(1)})},e=function(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})},n=function(a,b){return null==b&&(b=""),a=c(a),[a+b,a+"Top"+b,a+"Bottom"+b,a+"Left"+b,a+"Right"+b]},f=["width","height","lineHeight","fontSize","textIndent","top","left","right","bottom","wordSpacing"],[].push.apply(f,n("margin")),[].push.apply(f,n("padding")),[].push.apply(f,n("border","Width")),"string"==typeof a){if(null==b)return this.css()[c(a)]||this.css()[e(a)];this.style[c(a)]=b}if("object"==typeof a){for(h in a)l=a[h],h=c(h),isNaN(+l)||-1===p.__index(f,h)||(l+="px"),this.style[h]=l;return this}if(null==a){a=getComputedStyle(this),j={};for(h in a)l=a[h],isNaN(+h)&&(j[h]=l);if(void 0===j.color)for(m=j.cssText,j={},i=m.split(";"),d=0,g=i.length;d<g;d++)h=i[d],k=h.split(":"),void 0!==k[1]&&(j[k[0].replace(/^\s+|\s+$/,"")]=k[1].replace(/^\s+|\s+$/,""))}return j},Array.prototype.css=function(){var a,b,c;for(b=0,c=this.length;b<c;b++)a=this[b],a instanceof Element&&a.css.apply(a,arguments);return this},Element.prototype.attr=function(a,b){var c,d,e,f,g,h;if("object"==typeof a){for(e in a)h=a[e],this.attr(e,h);return this}if(null==a){for(c=p.__toarray(this.attributes),g={},d=0,f=c.length;d<f;d++)a=c[d],g[a.nodeName]=a.value;return g}if(null!=b)this.setAttribute(a,b);else{if(null!==b)return this.attr()[a];this.removeAttribute(a)}return this},Array.prototype.attr=function(){var a,b,c;for(b=0,c=this.length;b<c;b++)a=this[b],a instanceof Element&&a.attr.apply(a,arguments);return this},Element.prototype.clear=function(){for(;this.childNodes.length>0;)this.removeChild(this.firstChild);return this},Array.prototype.clear=function(){var a,b,c;for(b=0,c=this.length;b<c;b++)a=this[b],a instanceof Element&&a.clear.apply(a,arguments);return this},j={configurable:!0,get:function(){var a;return a=this.className.split(" "),{target:this,has:function(b){var c,d,e,f,g,h,i;for(e=0,g=arguments.length;e<g;e++)if(c=arguments[e],"string"==typeof c){if(!p.__has(a,c))return!1}else for(i=p.__toarray(c),f=0,h=i.length;f<h;f++)if(d=i[f],!this.has(a,d))return!1;return!0},add:function(b){var c,d,e,f,g,h,i;for(e=0,g=arguments.length;e<g;e++)if(c=arguments[e],"string"==typeof c){if(""!==c&&!p.__has(a,c)){for(a.push(c),b=a.join(" ");" "===b[0];)b=b.slice(1);this.target.className=b}}else for(i=p.__toarray(c),f=0,h=i.length;f<h;f++)if(d=i[f],""!==d&&!p.__has(a,d)){for(a.push(d),b=a.join(" ");" "===b[0];)b=b.slice(1);this.target.className=b}return this},remove:function(b){var c,d,e,f,g,h,i,j;for(f=0,h=arguments.length;f<h;f++)if(c=arguments[f],"string"==typeof c){if(""!==c&&p.__has(a,c)){for(;-1!==(e=p.__index(a,c));)for(a.splice(e,1),b=a.join(" ");" "===b[0];)b=b.slice(1);this.target.className=b}}else for(j=p.__toarray(c),g=0,i=j.length;g<i;g++)if(d=j[g],""!==c&&p.__has(a,d)){for(;-1!==(e=p.__index(a,d));)for(a.splice(e,1),b=a.join(" ");" "===b[0];)b=b.slice(1);this.target.className=b}return this},toggle:function(b){var c,d,e,f,g;for(g=[],e=0,f=arguments.length;e<f;e++)c=arguments[e],"string"==typeof c?p.__has(a,c)?g.push(this.remove(c)):g.push(this.add(c)):g.push(function(){var b,e,f,g;for(f=p.__toarray(c),g=[],b=0,e=f.length;b<e;b++)d=f[b],p.__has(a,d)?g.push(this.remove(d)):g.push(this.add(d));return g}.call(this));return g}}},set:function(a){var b,c,d,e;for(e=[],c=0,d=arguments.length;c<d;c++)b=arguments[c],"string"==typeof b?e.push(this.className=b):p.__isarray(b)?e.push(this.className=p.__toarray(b).join(" ")):e.push(void 0);return e}},p.__prop(Element.prototype,"class",j),p.__prop(Element.prototype,"classes",j),b={configurable:!0,get:function(){return{add:function(){var a,b,c,d,e;for(e=[],c=0,d=this.length;c<d;c++)b=this[c],p.__isarray(b)?e.push(function(){var c,d,e;for(e=[],c=0,d=b.length;c<d;c++)a=b[c],e.push(a.class.add.apply(a,arguments));return e}.apply(this,arguments)):e.push(b.class.add.apply(b,arguments));return e},remove:function(){var a,b,c,d,e;for(e=[],c=0,d=this.length;c<d;c++)b=this[c],p.__isarray(b)?e.push(function(){var c,d,e;for(e=[],c=0,d=b.length;c<d;c++)a=b[c],e.push(a.class.remove.apply(a,arguments));return e}.apply(this,arguments)):e.push(b.class.remove.apply(b,arguments));return e},toggle:function(){var a,b,c,d,e;for(e=[],c=0,d=this.length;c<d;c++)b=this[c],p.__isarray(b)?e.push(function(){var c,d,e;for(e=[],c=0,d=b.length;c<d;c++)a=b[c],e.push(a.class.toggle.apply(a,arguments));return e}.apply(this,arguments)):e.push(b.class.toggle.apply(b,arguments));return e}}},set:function(){var a,b,c,d,e;for(e=[],c=0,d=this.length;c<d;c++)b=this[c],p.__isarray(b)?e.push(function(){var c,d,e;for(e=[],c=0,d=b.length;c<d;c++)a=b[c],e.push(a.class=arguments);return e}.apply(this,arguments)):e.push(b.class=arguments);return e}},p.__prop(Array.prototype,"class",b),p.__prop(Array.prototype,"classes",b),Node.prototype.watch=function(a){var b;return null==this._observer&&(this._observer=new MutationObserver(function(a){return function(b){var c,d,e,f,g;for(d=0,f=b.length;d<f;d++)g=b[d],"attributes"===g.type?(e=["class","id","style","href","src"],c={target:g.target,attr:g.attributeName,oldValue:g.oldValue,value:g.target.attr(g.attributeName)},-1!==p.__index(e,g.attributeName)&&a.emit(g.attributeName+" change",c),a.emit("attr change",c),a.emit("attr:*",c),a.emit("attr:"+g.attributeName,c)):"childList"===g.type?(g.addedNodes.length>0&&a.emit("child add",{target:g.target,nodes:p.__toarray(g.addedNodes)}),g.removedNodes.length>0&&a.emit("child remove",{target:g.target,nodes:p.__toarray(g.removedNodes)})):"characterData"===g.type&&a.emit("text change",{target:g.target,oldValue:g.oldValue,value:g.target.get()});return a}}(this)),b={attributes:!0,childList:!0,characterData:!0,attributeOldValue:!0,characterDataOldValue:!0,subtree:!1},this._observer.observe(this,b)),this},Array.prototype.watch=function(){var a,b,c;for(b=0,c=this.length;b<c;b++)a=this[b],a instanceof Element&&a.watch.apply(a,arguments);return this},Element.prototype.unwatch=function(){return null!=this._observer&&(this._observer.disconnect(),this._observer=null),this},Array.prototype.unwatch=function(){var a,b,c;for(b=0,c=this.length;b<c;b++)a=this[b],a instanceof Element&&a.unwatch.apply(a,arguments);return this},p.__prop(Element.prototype,"parent",{configurable:!0,get:function(){return this.parentNode instanceof Element?this.parentNode:this.parentElement},set:function(a){return a instanceof Element&&a.append(this),this}}),Element.prototype.clone=function(a){var b;return null==a&&(a=!1),b=this.cloneNode(a),b.original=this,b},p.__prop(Element.prototype,"selector",{configurable:!0,get:function(){var a,b,c,d,e,f,g,h,i;for(h=this.tagName.toLowerCase(),g="div"===h?"":h,null!=this.id&&(g+=this.id),e=this.className.split(" "),b=0,d=e.length;b<d;b++)a=e[b],""!==a&&(g+="."+a);f=this.attr();for(c in f)i=f[c],"id"!==c&&"class"!==c&&(g+=null!=i?"["+c+'="'+i+'"]':"["+c+"]");return g},set:function(){return this}}),p.__prop(Element.prototype,"next",{configurable:!0,get:function(){return this.nextElementSibling},set:function(a){return a.after(this),this}}),p.__prop(Element.prototype,"prev",{configurable:!0,get:function(){return this.previousElementSibling},set:function(a){return a.before(this),this}}),Element.prototype.inside=function(a){var b;if(this===a)return!0;for(b=this;null!=(b=b.parentNode);)if(b===a)return!0;return!1},Element.prototype.has=function(a){return a.inside(this)},k=p._EventTargets;for(c=0,e=k.length;c<e;c++)a=k[c],a.prototype.on=function(a,b,c){var d,e,f,g,h,i;for(h=function(){var a,b,c;return a=p.__toarray(arguments),b=a.shift(),c=a.shift(),null!=b.addEventListener?(a.unshift(c),b.addEventListener.apply(b,a)):(a.unshift("on"+c),b.attachEvent.apply(b,a))},p.__isarray(a)||(a=[a]),i=null!=this.emitter?this.emitter:this,d=null!=this.emitter?this.obj:this,null==i._events&&(i._events={}),null==i._eventsInited&&(i._eventsInited={}),f=0,g=a.length;f<g;f++)e=a[f],null==i._events[e]&&(i._events[e]=[]),i._events[e].push(b),i._eventsInited[e]!==!0&&h(i,e,function(a){var b,c,f,g,h;for(null!=a.waffData&&(a=a.waffData),g=i._events[e],h=[],f=0,c=g.length;f<c;f++)b=g[f],h.push(b.call(d,a));return h},c),i._eventsInited[e]=!0;return i};for(l=p._EventTargets,d=0,f=l.length;d<f;d++)a=l[d],a.prototype.off=function(a,b,c){var d,e,f,g,h;for(p.__isarray(a)||(a=[a]),h=null!=this.emitter?this.emitter:this,null==h._events&&(h._events={}),g=0,f=a.length;g<f;g++)e=a[g],null==h._events[e]&&(h._events[e]=[]),null==b&&(h._events[e]=[]),(d=function(a){return function(a){var b;if(b=p.__index(h._events[e],a),b!==-1)return h._events[e].splice(b,1),d(a)}}(this))(b);return h};for(m=p._EventTargets,i=0,g=m.length;i<g;i++)a=m[i],a.prototype.once=function(a,b,c){var d,e,f,g,h,i;for(p.__isarray(a)||(a=[a]),h=null!=this.emitter?this.emitter:this,d=null!=this.emitter?this.obj:this,f=function(a){var e;return e=function(f){return b.call(d,f),h.off(a,e,c)},h.on(a,e,c)},i=0,g=a.length;i<g;i++)e=a[i],f(e);return h};for(n=p._EventTargets,o=0,h=n.length;o<h;o++)a=n[o],a.prototype.emit=function(a,b){var c,d,e;return d=function(){var a,b,c;return a=p.__toarray(arguments),b=a.shift(),c=a.shift(),null!=b.dispatchEvent?(a.unshift(c),b.dispatchEvent.apply(b,a)):(a.unshift("on"+c),b.fireEvent.apply(b,a))},e=null!=this.emitter?this.emitter:this,c=null!=this.emitter?this.obj:this,"string"==typeof a&&(a=new Event(a)),"object"==typeof a&&b&&(a.waffData=b),a.waffThis=c,d(e,a)};return Text.prototype.set=function(a){return this.nodeValue=a,this},Text.prototype.get=function(){return this.nodeValue},p}());