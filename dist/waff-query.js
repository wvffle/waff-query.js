(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.waff=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){var checkEvents=function(self){if(self.__events==null){self.__events={};self.__event_handlers={};if(self.addEventListener!=null)self.__events_inited=[]}};var EventEmitter=function EventEmitter(){checkEvents(this)};EventEmitter.prototype.on=on=function(event,callback){checkEvents(this);if(this.__events[event]==null){this.__events[event]=[]}if(this.__event_handlers[event]==null){this.__event_handlers[event]=function(){return true}}if(this.addEventListener!=null&&!~this.__events_inited.indexOf(event)){this.__events_inited.push(event);this.addEventListener(event,function(evt){var callbacks=this.__events[event];for(var i=0;i<callbacks.length;++i){callbacks[i].call(this,evt.__data||evt)}})}var addEvent=this.__event_handlers[event].call(this,callback);if(addEvent!==false){this.__events[event].push(callback)}return this};EventEmitter.prototype.off=function(event,callback){if(this.__events[event]){if(callback==null){this.__events[event]=[]}else{var index=this.__events[event].indexOf(callback);if(index!==-1){this.__events[event].splice(index,1)}}}return this};EventEmitter.prototype.handler=function(event,callback){this.__event_handlers[event]=callback;return this};EventEmitter.prototype.emit=function(event,data){if(this.__events[event]!=null){if(this.addEventListener!=null){if(event instanceof Event===false)event=new Event(event);event.__data=data;event.__data.originalEvent=event;this.dispatchEvent(event)}else{var callbacks=this.__events[event];for(var i=0;i<callbacks.length;++i){callbacks[i].call(this,data)}}}return this};var targets=[];try{EventTarget.prototype.waff="<3";if(EventTarget.prototype.waff!==Element.prototype.waff)throw":(";targets.push(EventTarget)}catch(e){[].push.apply(targets,[window.constructor,Element,Document,Node]);if("XMLHttpRequestEventTarget"in window)targets.push(XMLHttpRequestEventTarget)}for(var i=0;i<targets.length;++i){var target=targets[i];target.prototype.on=EventEmitter.prototype.on;target.prototype.off=EventEmitter.prototype.off;target.prototype.emit=EventEmitter.prototype.emit;target.prototype.handler=EventEmitter.prototype.handler}module.exports=EventEmitter},{}],2:[function(require,module,exports){var array=require("../util/array");var tags=/^\*|[A-Za-z0-9*_-]+$/;var ids=/^#[A-Za-z0-9_-]+$/;var classes=/^\.[A-Za-z0-9_.-]+$/;var query=function(selector,options){options=options||{};options.root=options.root||document;options.single=options.single===false?false:true;options.array=options.array===false?false:true;selector=selector===""?options.root.children[0]:selector;selector=selector||options.root===document?document.body:"body";if(selector instanceof Element){return options.single?selector:[selector]}var querySelector=function(selector){if(options.single)return[options.root.querySelector(selector)];else return options.root.querySelectorAll(selector)};var queryElements=function(selector){if(tags.test(selector)){return options.root.getElementsByTagName(selector)}else if(ids.test(selector)){return[options.root.getElementById(selector)]}else if(classes.test(selector)){return options.root.getElementsByClassName(selector)}if(selector[0]===">"){options.root=options.root.children}return querySelector(selector)};if(array.arrayLike(selector)){var res=[];for(var i=0;i<selector.length;++i){if(selector[i]instanceof Element){res.push(selector[i])}else if(typeof selector[i]==="string"){var element=queryElements(selector[i]);if(element!=null)[].push.apply(res,element)}if(options.single&&!!res.length)return res[0]}return options.single?undefined:res}else{if(typeof selector!=="string"){throw"selector must be a String, Element or an Array"}var res=queryElements(selector);return options.single?res[0]:options.array?array.from(res):res}};query.all=function(selector,options){options=options||{};options.single=false;return query(selector,options)};Element.prototype.query=function(selector,options){options=options||{};options.root=this;return query(selector,options)};Element.prototype.query.all=function(selector,options){options=options||{};options.root=this;return query.all(selector,options)};Element.prototype.q=Element.prototype.query;Element.prototype.qq=Element.prototype.query.all;module.exports=query},{"../util/array":3}],3:[function(require,module,exports){var isArrayLike=function(array){return array instanceof Array||array instanceof NodeList||array instanceof HTMLCollection};var from=function(array){if(array instanceof Array)return array;var res=[];[].push.apply(res,array);return res};var array={arrayLike:isArrayLike,from:from};module.exports=array},{}],4:[function(require,module,exports){var extend=function(_extended,_super){_extended.prototype=Object.create(_super.prototype)};var _super=function(instance){var params=[].slice.call(arguments);params.shift();instance.constructor.apply(instance,params)};var classes={extend:extend,super:_super};module.exports=classes},{}],5:[function(require,module,exports){(function(global){var EventEmitter=require("./classes/EventEmitter");var classes=require("./util/classes");var waff=function waff(){classes.super(this);var self=this;var state=function(){return document.readyState==="complete"||document.readyState==="interactive"};this.handler("ready",function(callback){if(state()){callback();return false}});if(state()){this.emit("ready")}else{var handler=function(){if(state()){document.removeListener("readystatechange",handler);self.emit("ready")}};document.addEventListener("readystatechange",handler)}this.EventEmitter=EventEmitter;var query=require("./element/query");this.query=this.q=global.query=global.q=query;this.qq=global.qq=query.all};classes.extend(waff,EventEmitter);module.exports=new waff}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./classes/EventEmitter":1,"./element/query":2,"./util/classes":4}]},{},[5])(5)});
