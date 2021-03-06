(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.waff = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var checkEvents = function(self) {
  if (self.__events == null) {
    self.__events = {};
    self.__event_handlers = {};
    if (self.addEventListener != null) self.__events_inited = [];
  }
};

/**
 * EventEmitter class.
 *
 * @class
 * @alias module:waff.EventEmitter
 */
var EventEmitter = function EventEmitter() {
  checkEvents(this);
};

/**
 * Add listener for event
 *
 * @param {string} event - event name
 * @param {function} callback - listener
 * @example
 * waff.on('ready', function() {
 *   // waff is loaded
 * });
 */
EventEmitter.prototype.on = on = function(event, callback) {
  checkEvents(this);

  if (this.__events[event] == null) {
    this.__events[event] = [];
  }

  if (this.__event_handlers[event] == null) {
    this.__event_handlers[event] = function() {
      return true;
    };
  }

  if (this.addEventListener != null && !~this.__events_inited.indexOf(event)) {
    this.__events_inited.push(event);
    this.addEventListener(event, function(evt) {
      var callbacks = this.__events[event];
      for (var i = 0; i < callbacks.length; ++i) {
        callbacks[i].call(this, evt.__data || evt);
      }
    });
  }

  var addEvent = this.__event_handlers[event].call(this, callback);
  if (addEvent !== false) {
    this.__events[event].push(callback);
  }

  return this;
};

/**
 * Remove listener for event
 *
 * @param {string} event - event name
 * @param {function} [ callback ] - listener
 * @example
 * waff.off('ready', handler); // remove specific listener
 * waff.off('ready'); // remove all listeners
 */
EventEmitter.prototype.off = function(event, callback) {
  if (this.__events[event]) {
    if (callback == null) {
      this.__events[event] = [];
    } else {
      var index = this.__events[event].indexOf(callback);
      if (index !== -1) {
        this.__events[event].splice(index, 1);
      }
    }
  }

  return this;
};

/**
 * Handle adding specific event with {@link on}
 *
 * @param {string} event - event name
 * @param {function} callback - handler
 */
EventEmitter.prototype.handler = function(event, callback) {
  this.__event_handlers[event] = callback;
  return this;
};

/**
 * Emit event
 *
 * @param {string} event - event name
 * @param {object} data - event data
 * @example
 * document.body.emit('click');
 */
EventEmitter.prototype.emit = function(event, data) {
  if (this.__events[event] != null) {
    if (this.addEventListener != null) {
      if (event instanceof Event === false) event = new Event(event);
      event.__data = data;
      event.__data.originalEvent = event;
      this.dispatchEvent(event);
    } else {
      var callbacks = this.__events[event];
      for (var i = 0; i < callbacks.length; ++i) {
        callbacks[i].call(this, data);
      }
    }
  }

  return this;
};

var targets = [];
try {
  EventTarget.prototype.waff = '<3';
  if (EventTarget.prototype.waff !== Element.prototype.waff) throw ':(';
  targets.push(EventTarget);
} catch (e) {
  [].push.apply(targets, [
    window.constructor,
    Element,
    Document,
    Node
  ]);

  if ('XMLHttpRequestEventTarget' in window)
    targets.push(XMLHttpRequestEventTarget);
}

for (var i = 0; i < targets.length; ++i) {
  var target = targets[i];
  target.prototype.on = EventEmitter.prototype.on;
  target.prototype.off = EventEmitter.prototype.off;
  target.prototype.emit = EventEmitter.prototype.emit;
  target.prototype.handler = EventEmitter.prototype.handler;
}

module.exports = EventEmitter;

},{}],2:[function(require,module,exports){
var selectors = require('../util/selector');
var arrays = require('../util/array');

/**
 * Create new Element with selector
 *
 * @func
 * @alias module:waff.element
 * @param {string} selector - query selector
 * @param {object} [attr] - element's attributes
 * @param {Element[]} children - element's children
 */
var create = function(selector, attr, children) {
  var parsedSelector = selectors.parse(selector);
  var element = document.createElement(parsedSelector.tag || 'div');

  if (children == null && arrays.arrayLike(attr)) {
    children = attr;
    attr = {};
  }
  if (children != null && arrays.array(attr)) {
    var tmp_attr = {};
    for (var i = 0; i < attr.length; ++i) {
      tmp_attr[attr[i]] = '';
    }
    attr = tmp_attr;
  }
  attr = attr || {};
  children = children || [];

  if (parsedSelector.id !== false) {
    element.id = parsedSelector.id;
  }

  element.classes = parsedSelector.classes;
  element.append(children);

  element.attr(parsedSelector.attr);
  element.attr(attr);

  return element;
};

module.exports = create;

},{"../util/array":26,"../util/selector":29}],3:[function(require,module,exports){
/**
 * @class Element
 */
(function() {

  // require prototypes
  require('./prototype/after');
  require('./prototype/append');
  require('./prototype/before');
  require('./prototype/clone');
  require('./prototype/prepend');
  require('./prototype/has');
  require('./prototype/inside');

  require('./prototype/html');
  require('./prototype/text');
  require('./prototype/attr');
  require('./prototype/clear');
  require('./prototype/css');

  // require properties
  require('./properties/classes');
  require('./properties/next');
  require('./properties/prev');
  require('./properties/parent');
  require('./properties/selector');
})();

},{"./properties/classes":4,"./properties/next":5,"./properties/parent":6,"./properties/prev":7,"./properties/selector":8,"./prototype/after":9,"./prototype/append":10,"./prototype/attr":11,"./prototype/before":12,"./prototype/clear":13,"./prototype/clone":14,"./prototype/css":15,"./prototype/has":16,"./prototype/html":17,"./prototype/inside":18,"./prototype/prepend":19,"./prototype/text":20}],4:[function(require,module,exports){
var objects = require('../../util/object');
var arrays = require('../../util/array');
var strings = require('../../util/string');

/**
 * Array of element's classes
 *
 * @type {Array}
 * @alias Element#classes
 *
 * @returns {Array} element's classes
 *
 * @example
 * var element = waff.element('#header.red.text-white');
 * element.classes // => [ 'red', 'text-white' ]
 *
 */
var classes = {
  get: function() {
    var res = {};
    var self = this;
    var classList = this.className.split(' ');

    res.array = function(cL) {
      var str = [];
      var map = {};
      var classList = cL || self.className.split(' ');
      for (var i = 0; i < classList.length; ++i) {
        if (classList[i] != '' && !map[classList[i]]) {
          str.push(classList[i]);
          map[classList[i]] = true;
        }
      }
      return str;
    };

    res.add = function(name) {
      var classList = self.className.split(' ');
      classList.push(name);
      self.className = res.array(classList).join(' ');
      return self;
    };

    res.remove = function(name) {
      var str = [];
      var map = {};
      var classList = self.className.split(' ');
      for (var i = 0; i < classList.length; ++i) {
        if (classList[i] != '' && !map[classList[i]] && classList[i] != name) {
          str.push(classList[i]);
          map[classList[i]] = true;
        }
      }
      self.className = str.join(' ');
      return self;
    };

    res.toggle = function(name) {
      if (name != '' && res.has(name)) {
        res.remove(name);
      } else {
        res.add(name);
      }
    };

    res.has = function(name) {
      return strings.has(self.className, name);
    };

    return res;
  },
  set: function(classList) {
    if (classList.length === 0) return;
    var res = [];
    var map = {};
    for (var j = 0; j < classList.length; ++j) {
      if (classList[j] !== '' && !map[classList[j]]) {
        res.push(classList[j]);
        map[classList[j]] = true;
      }
    }
    if (res.length === 0) return;
    this.className = res.join(' ');
  }
};

objects.prop(Element.prototype, 'classes', classes);

// as coffee supports things like element.class.add()
objects.prop(Element.prototype, 'class', classes);

},{"../../util/array":26,"../../util/object":28,"../../util/string":30}],5:[function(require,module,exports){
var objects = require('../../util/object');

/**
 * Next sibling of element
 *
 * @type {Element}
 * @alias Element#next
 *
 * @returns {Element} Next element
 *
 */
var next = {
  get: function() {
    return this.nextElementSibling;
  },
  set: function(element) {
    if (element instanceof Element) {
      element.after(this);
      return this;
    } else {
      throw 'argument 1 has to be an Element';
    }
  }
};

objects.prop(Element.prototype, 'next', next);

},{"../../util/object":28}],6:[function(require,module,exports){
var objects = require('../../util/object');

/**
 * Parent of element
 *
 * @type {Element}
 * @alias Element#parent
 *
 * @returns {Element} Parent of element
 *
 * @example
 * var element = waff.q('.inside-header');
 * element.parent === header
 *
 */
var parent = {
  get: function() {
    return this.parentElement;
  },
  set: function(element) {
    if (element instanceof Element) {
      element.appendChild(this);
      return this;
    } else {
      throw 'argument 1 has to be an Element';
    }
  }
};

objects.prop(Element.prototype, 'parent', parent);

},{"../../util/object":28}],7:[function(require,module,exports){
var objects = require('../../util/object');

/**
 * Previous sibling of element
 *
 * @type {Element}
 * @alias Element#prev
 *
 * @returns {Element} Previous element
 *
 */
var prev = {
  get: function() {
    return this.previousElementSibling;
  },
  set: function(element) {
    if (element instanceof Element) {
      element.before(this);
      return this;
    } else {
      throw 'argument 1 has to be an Element';
    }
  }
};

objects.prop(Element.prototype, 'prev', prev);

},{"../../util/object":28}],8:[function(require,module,exports){
var objects = require('../../util/object');
var selectors = require('../../util/selector');

/**
 * Selector of element
 *
 * @type {Element}
 * @alias Element#selector
 *
 * @returns {Element} Element selector
 *
 * @example
 * q().selector // => 'body.yay[ng-app='my-app']'
 */
var selector = {
  get: function() {
    var tag = this.tagName.toLowerCase();
    var sel = tag === 'div' ? '' : tag;

    if (this.id) {
      return '#' + this.id;
    }

    var classes = this.className.split(' ');
    for (var i = 0; i < classes.length; ++i) {
      if (classes[i] != '') {
        sel += '.' + classes[i];
      }
    }

    var attributes = this.attributes;
    for (var i = 0; i < attributes.length; ++i) {
      if (!~['id', 'class'].indexOf(attributes[i].nodeName)) {
        sel += '[' + attributes[i].nodeName + (
          attributes[i].nodeValue == '' ?
            '' : '=\'' + attributes[i].nodeValue + '\''
        ) + ']';
      }
    }

    return sel;
  },
  set: function(sel) {
    if (typeof sel !== 'string') {
      throw 'argument 1 has to be String';
    }

    var parsedSelector = selectors.parse(sel);

    if (this.tagName != parsedSelector.tag && parsedSelector.tag != '') {
      var err = 'cannot change tagName of Element from \'';
      err += this.tagName.toLowerCase() + '\' to \'';
      err += parsedSelector.tag + '\'';

      throw err;
    }
    this.classes = parsedSelector.classes;

    if (parsedSelector.id) {
      this.id = parsedSelector.id;
    }

    this.attr(parsedSelector.attr);
  }
};

objects.prop(Element.prototype, 'selector', selector);

},{"../../util/object":28,"../../util/selector":29}],9:[function(require,module,exports){
/**
 * Insert `elem` after element
 *
 * @param {Element} elem - element to insert
 *
 * @example
 * var header = waff.element('header');
 * header.after(waff.query('#slider'));
 *
 * // <div id='slider'></div>
 * // <header></header>
 *
 */
Element.prototype.after = function(element) {
  if (element.parentElement != null) {
    if (element.nextSibling != null) {
      element.parentElement.insertBefore(this, element.nextSibling);
    } else {
      element.parentElement.appendChild(this);
    }
  } else {
    throw 'cannot insert after root element';
  }

  return this;
};

},{}],10:[function(require,module,exports){
var array = require('../../util/array.js');

/**
 * Insert `elem` at the end of childlist
 *
 * @param {Element} elem - element to insert
 *
 *
 * @example
 * var header = waff.element('header');
 * header.append(waff.text('some text'));
 *
 * // <header>some text</header>
 *
 */
Element.prototype.append = function() {
  for (var i = 0; i < arguments.length; ++i) {
    var element = arguments[i];

    if (array.arrayLike(element)) {
      for (var j = 0; j < element.length; ++j) {
        if (element[j] instanceof Element || element[j] instanceof Text) {
          this.appendChild(element[j]);
        }
      }
    } else {
      this.appendChild(element);
    }
  }

  return this;
};

},{"../../util/array.js":26}],11:[function(require,module,exports){
var objects = require('../../util/object');

/**
 * Get/Set attributes of element
 *
 * @param {String|Object} key - Attribute name or key-value pairs
 * @param {String} [value] - Attribute value
 *
 * @example
 * var header = waff.element('header');
 * header.attr('data-name' , 'header');
 *
 * // And right now header has data-name='header'
 *
 */
Element.prototype.attr = function(name, value) {
  if (objects.object(name)) {
    for (var i in name) {
      if (name.hasOwnProperty(i)) {
        this.setAttribute(i, name[i].toString());
      }
    }
  } else if (name == null || typeof name === 'string') {
    if (name == null) {
      var attributes = this.attributes;
      var res = {};

      for (var i = 0; i < attributes.length; ++i) {
        res[attributes[i].nodeName] = attributes[i].nodeValue;
      }

      return res;
    } else if (value === null) {

      this.removeAttribute(name);
    } else if (value != null) {

      return this.setAttribute(name, value);
    } else {

      return this.getAttribute(name);
    }
  } else {
    throw 'argument 1 has to be String, Object or null';
  }
};

},{"../../util/object":28}],12:[function(require,module,exports){
/**
 * Insert `elem` before element
 *
 * @param {Element} elem - element to inssert
 *
 * @example
 * var header = waff.element('header');
 * header.before(waff.query('#slider'));
 *
 * // <header></header>
 * // <div id='slider'></div>
 *
 */
Element.prototype.before = function(element) {
  if (element.parentElement != null) {
    element.parentElement.insertBefore(this, element);
  } else {
    throw 'cannot insert before root element';
  }

  return this;
};

},{}],13:[function(require,module,exports){
/**
 * Clear all content of element
 *
 * @example
 * var header = waff.element('header');
 * header.clear();
 *
 * // <header><div></div></header> => <header></header>
 *
 */
Element.prototype.clear = function() {
  var len = this.childNodes.length;

  while (len-- > 0) {
    this.removeChild(this.firstChild);
  }

  return this;
};

},{}],14:[function(require,module,exports){
/**
  Clone element
 *
 * @example
 * var header = waff.element('header');
 * var clone = header.clone();
 *
 */
Element.prototype.clone = function() {
  return this.cloneNode(false);
};

/**
  Deep clone element
 *
 * @example
 * var header = waff.element('header');
 * var deep_clone = header.deepClone();
 *
 */
Element.prototype.deepClone = function() {
  return this.cloneNode(true);
};

},{}],15:[function(require,module,exports){
var strings = require('../../util/string');
var arrays = require('../../util/array');
var objects = require('../../util/object');

var trbl = function(property, suffix) {
  suffix = suffix || '';
  suffix = (suffix[0] || '').toUpperCase() + suffix.slice(1);
  return [
    property + 'Top' + suffix,
    property + 'Right' + suffix,
    property + 'Bottom' + suffix,
    property + 'Left' + suffix,
    property + suffix
  ];
};

var pixels = [
  'width', 'height', 'lineHeight',
  'top', 'right', 'bottom', 'left',
  'fontSize', 'textIndent', 'wordSpacing'
];

arrays.add(pixels, trbl('margin'));
arrays.add(pixels, trbl('padding'));
arrays.add(pixels, trbl('border', 'width'));

var pixelize = function(prop, value) {
  if (isNaN(+value) === false && arrays.has(pixels, prop)) {
    value += 'px';
  }
  return value;
};

/**
 * Get/Set css properties of element
 *
 * @param {String|Object} properties - properties to find or key-value object
 * @param {String} [value] - value to set
 *
 * @example
 * var header = waff.element('header');
 * header.css('color', 'black');
 *
 */
Element.prototype.css = function(properties, value) {
  if (typeof properties === 'string') {
    if (value == null) {
      var css = this.css();
      return css[strings.camel(properties)] ||
        css[strings.dash(properties)];
    }
    var property = strings.camel(properties);
    this.style[property] = pixelize(property, value);
  } else if (objects.object(properties)) {
    for (var i in properties) {
      if (properties.hasOwnProperty(i)) {
        var property = strings.camel(i);
        this.style[property] = pixelize(property, properties[i]);
      }
    }
  } else if (properties == null) {
    var properties = getComputedStyle(this);
    var res = {};
    if (properties._values != null) properties = properties._values;

    for (var i in properties) {
      if (isNaN(+i) && properties.hasOwnProperty(i)) {
        res[i] = properties[i];
        res[strings.camel(i)] = properties[i];
      }
    }

    if (res.display === undefined) {
      var text = res.cssText || '';
      res = {};
      var rules = text.split(';');
      for (var i = 0; i < rules.length; ++i) {
        var rule = rules[i].split(':');
        if (rule[1] != null) {
          res[strings.spaces(rule[0])] = strings.spaces(rule[1]);
          res[strings.camel(strings.spaces(rule[0]))] = strings.spaces(rule[1]);
        }
      }
    }

    return res;
  } else {
    throw 'first argument has to be String, Object or null';
  }
  return this;
};

},{"../../util/array":26,"../../util/object":28,"../../util/string":30}],16:[function(require,module,exports){
/**
 * Check element has `elem` inside
 *
 * @param {Element} elem - Element to check
 *
 */
Element.prototype.has = function(element) {
  return element.inside(this);
};

},{}],17:[function(require,module,exports){
/**
 * Get/Set innerHTML of element
 *
 * @param {String} [str] - HTML to set
 *
 * @example
 * var header = waff.element('header');
 * header.html('<div></div>')
 * // <header><div></div</header>
 *
 */
Element.prototype.html = function(str) {
  if (str == null) {
    return this.innerHTML;
  }

  if (str instanceof Text) {
    str = str.get();
  }

  if (typeof str === 'string') {
    this.innerHTML = str;
    return this;
  } else if (str instanceof Element) {
    this.clear();
    this.appendChild(str);
    return this;
  } else {
    throw 'argument 1 has to be String, Element, Text or null';
  }
};

},{}],18:[function(require,module,exports){
/**
 * Check if `elem` is a parent of element
 *
 * @param {Element} elem - Element to check
 *
 * @example
 * var header = waff.element('header');
 * header.inside(q()); // => true
 */
Element.prototype.inside = function(element) {
  if (this.parentElement === element) {
    return true;
  }

  var current = this;
  while (current = current.parentElement) {
    if (current == element) {
      return true;
    }
  }

  return false;
};

},{}],19:[function(require,module,exports){
var array = require('../../util/array.js');

/**
 * Insert `elem` as first child of element
 *
 * @param {Element} elem - Element to insert
 *
 * @example
 * var header = waff.element('header');
 * header.append(waff.text('some text'));
 * header.prepend(waff.query('#slider'));
 *
 * // <header>some text<div id='slider'></div></header>
 *
 */
Element.prototype.prepend = function(element) {
  for (var i = arguments.length - 1; i >= 0; --i) {
    var element = arguments[i];
    if (array.arrayLike(element)) {
      for (var j = element.length - 1; j >= 0; --j) {
        if (element[j] instanceof Element || element[j] instanceof Text) {
          if (this.firstChild) {
            this.insertBefore(element[j], this.firstChild);
          } else {
            this.appendChild(element[j]);
          }
        }
      }
    } else {
      if (this.firstChild) {
        this.insertBefore(element, this.firstChild);
      } else {
        this.appendChild(element);
      }
    }
  }

  return this;
};

},{"../../util/array.js":26}],20:[function(require,module,exports){
/**
 * Get/Set textContent of element
 *
 * @param {String} [str] - String to set
 *
 * @example
 * header.text('<yay>');
 *
 * // <header>&lt;yay&gt;</header>
 *
 */
Element.prototype.text = function(str) {
  if (str == null) {
    return this.textContent;
  }

  if (str instanceof Text) {
    str = str.get();
  } else if (str instanceof Element) {
    str = str.textContent;
  }

  if (typeof str === 'string') {
    this.textContent = str;
    return this;
  } else {
    throw 'argument 1 has to be String, Element, Text or null';
  }
};

},{}],21:[function(require,module,exports){
var array = require('../util/array');

var tags    = /^\*|^[A-Za-z0-9*_-]+$/;
var ids     = /^#[A-Za-z0-9_-]+$/;
var classes = /^\.[A-Za-z0-9_.-]+$/;

/**
 * Find element in document with selector
 *
 * @func
 * @alias module:waff.query
 * @param {string} selector - query selector
 * @param {object} [options] - query options
 * @param {boolean} options.array=true - if true - output is an array. If false - output can be NodeList or HTMLCollection
 */
var query = function(selector, options) {
  options = options || {};
  options.root = options.root || document;
  options.single = options.single === false ? false : true;
  options.array = options.array === false ? false : true;

  selector = selector === '' ? options.root.children[0] : selector;
  if (selector == null) {
    selector = options.root === document ? document.body : 'body';
  }

  if (selector instanceof Element) {
    return options.single ? selector : [ selector ];
  }

  var querySelector = function(selector, root) {
    if (options.single) return [ root.querySelector(selector) ];
    else return root.querySelectorAll(selector);
  };

  var queryElements = function(selector) {
    if (typeof selector === 'string') selector = selector.trim();

    if (array.arrayLike(options.root) === false) {
      options.root = [ options.root ];
    }

    if (selector[0] === '>') {
      selector = selector.slice(1).trim();
    }

    var res = [];
    for (var i = 0; i < options.root.length; ++i) {
      var root = options.root[i];

      if (typeof selector === 'function') {
        for (var j = 0; j < root.children.length; ++j) {
          if (selector(root, root.children[j])) {
            res.push(root.children[j]);
          }
        }
      } else if (tags.test(selector)) {
        [].push.apply(res, root.getElementsByTagName(selector));
      } else if (ids.test(selector)) {
        res.push(root.getElementById(selector.slice(1)));
      } else if (classes.test(selector)) {
        selector = selector.slice(1).split('.').join(' ');
        [].push.apply(res, root.getElementsByClassName(selector));
      } else {
        [].push.apply(res, querySelector(selector, root));
      }
    }
    return res;
  };

  if (array.arrayLike(selector)) {
    var res = [];
    for (var i = 0; i < selector.length; ++i) {
      if (selector[i] instanceof Element) {
        res.push(selector[i]);
      } else if (typeof selector[i] === 'string') {
        var element = queryElements(selector[i]);
        if (element != null) [].push.apply(res, element);
      }
      if (options.single && !!res.length) return res[0];
    }

    return options.single ? undefined : res;
  } else {
    if (typeof selector !== 'function' && typeof selector !== 'string') {
      throw 'selector must be a String, Element, Function or an Array';
    }
    var res = queryElements(selector);
    return options.single ? res[0] : options.array ? array.from(res) : res;
  }

};

/**
 * Find all elements in document with selector
 *
 * @func
 * @alias module:waff.queryAll
 * @param {string} selector - query selector
 * @param {object} [options] - query options
 * @param {boolean} options.array=true - if true - output is an array. If false - output can be NodeList or HTMLCollection
 */
query.all = function(selector, options) {
  options = options || {};
  options.single = false;
  return query(selector, options);
};

Element.prototype.query = function(selector, options) {
  options = options || {};
  options.root = this;
  return query(selector, options);
};

Element.prototype.query.all = function(selector, options) {
  options = options || {};
  options.root = this;
  return query.all(selector, options);
};

Element.prototype.q = Element.prototype.query;
Element.prototype.qq = Element.prototype.query.all;

module.exports = query;

},{"../util/array":26}],22:[function(require,module,exports){
/**
 * Create TextNode
 *
 * @func
 * @alias module:waff.text
 * @param {String} [str] - String to set
 */
var text = function(str) {
  return document.createTextNode(str || '');
};

module.exports = text;

},{}],23:[function(require,module,exports){
/**
 * @class Text
 */
(function() {

  // require prototypes
  require('./prototype/get');
  require('./prototype/set');
})();

},{"./prototype/get":24,"./prototype/set":25}],24:[function(require,module,exports){
/**
 * Get nodeValue of textnode
 *
 * @example
 * var text = waff.text('wq');
 * text.get(); // => 'wq'
 */
Text.prototype.get = function() {
  return this.nodeValue;
};

},{}],25:[function(require,module,exports){
/**
 * Set nodeValue of textnode
 *
 * @param {String} str - String to set
 *
 * @example
 * var text = waff.text('wq');
 * text.set('waff-query');
 * text.get(); // => 'waff-query
 */
Text.prototype.set = function(str) {
  this.nodeValue = str || '';
  return this;
};

},{}],26:[function(require,module,exports){
var isArrayLike = function(array) {
  return array instanceof Array ||
    array instanceof NodeList ||
    array instanceof HTMLCollection;
};

var from = function(array) {
  if (array instanceof Array) return array;
  var res = [];
  [].push.apply(res, array);
  return res;
};

var join = function(array, str) {
  return [].join.call(array, str);
};

var indexOf = function(array, element) {
  for (var i = 0; i < array.length; ++i) {
    if (array[i] == element) {
      return i;
    }
  }
  return -1;
};

var splice = function(array, from, to) {
  return [].splice.call(array, from, to);
};

var remove = function(array, element) {
  var index = indexOf(array, element);
  return !!splice(array, index, 1).length;
};

var has = function(array, element) {
  return !!~indexOf(array, element);
};

var add = function(array, array2) {
  [].push.apply(array, array2);
};

var isArray = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

var array = {
  arrayLike: isArrayLike,
  from: from,
  join: join,
  index: indexOf,
  splice: splice,
  remove: remove,
  has: has,
  add: add,
  array: isArray
};

module.exports = array;

},{}],27:[function(require,module,exports){
var extend = function(_extended, _super) {
  _extended.prototype = Object.create(_super.prototype);
};

var _super = function(instance) {
  var params = [].slice.call(arguments);
  params.shift();
  instance.constructor.apply(instance, params);
};

var classes = {
  extend: extend,
  super: _super
};

module.exports = classes;

},{}],28:[function(require,module,exports){
var prop = function(object, prop, desc) {
  var descriptor = {
    enumerable: true,
    configurable: true,
    get: desc.get,
    set: desc.set,
    wiratable: desc.writable
  };
  if (desc.value != null) {
    descriptor.value = desc.value;
    delete descriptor.set;
    delete descriptor.get;
  }
  Object.defineProperty(object, prop, descriptor);
};

var exports = function(objs, names, value) {
  for (var i = 0; i < objs.length; ++i) {
    for (var j = 0; j < names.length; ++j) {
      objs[i][names[j]] = value;
    }
  }
};

var isObject = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

var objects = {
  prop: prop,
  export: exports,
  object: isObject
};

module.exports = objects;

},{}],29:[function(require,module,exports){
var attributes = /\[([a-z][a-z0-9-_]*)(\||\*|\^|\$|~|)=([^\]]+)\]/gi;

var parse = function(selector) {
  var tag = false;
  var id = false;
  var attr = {};

  if (selector == null) {
    return {tagName: false, id: false, classes: [], attr: {}};
  }

  selector = selector.replace(attributes, function(_, name, operator, value) {
    value = value.replace(/^'(.+)'$|^"(.+)"$/, function(_, n1, n2) { return n1 || n2; });
    attr[name] = {
      operator: operator,
      value: value,
      toString: function() {
        return value;
      }
    };
    return '';
  });

  var classes = selector.split('.');
  if (selector[0] !== '.') {
    var tagid = classes[0].split('#');
    tag = tagid[0] || false;
    id = tagid[1] || false;
  }
  classes.splice(0, 1);
  for (var i = 0; i < classes.length; ++i) {
    var classid = classes[i].split('#');
    if (classid.length > 1) {
      id = id || classid[1];
      classes[i] = classid[0];
    }
  }
  return {
    tag: tag,
    id: id,
    classes: classes,
    attr: attr
  };
};

var selector = {
  parse: parse
};

module.exports = selector;

},{}],30:[function(require,module,exports){
var camel = function(str) {
  return str.replace(/(\-[a-z])/g, function(match) {
    return match.toUpperCase().slice(1);
  });
};

var dash = function(str) {
  return str.replace(/([A-Z])/g, function(match) {
    return '-' + match.toLowerCase();
  });
};

var spaces = function(str) {
  return str.trim();
};

var has = function(str, str2) {
  return !!~str.indexOf(str2);
};

var string = {
  camel: camel,
  dash: dash,
  spaces: spaces,
  has: has
};

module.exports = string;

},{}],31:[function(require,module,exports){
(function (global){
/**
 * waff-query module
 *
 * @module waff
 */

var EventEmitter = require('./classes/EventEmitter');
var classes = require('./util/classes');
var objects = require('./util/object');

var waff = function waff() {
  classes.super(this);
  var self = this;

  var state = function() {
    return document.readyState === 'complete' ||
        document.readyState === 'interactive';
  };

  this.handler('ready', function(callback) {
    if (state()) {
      callback();
      return false;
    }
  });

  this.version = require('../package').version;

  this.EventEmitter = EventEmitter;

  var query = require('./element/query');
  objects.export([this, global], ['q', 'query'], query);
  objects.export([this, global], ['qq', 'queryAll'], query.all);

  var element = require('./element/create');
  objects.export([this, global], ['e', 'element'], element);

  var text = require('./text/create');
  objects.export([this, global], ['t', 'text'], text);

  require('./element');
  require('./text');

  // emit ready event
  if (state()) {
    this.emit('ready');
  } else {
    var handler = function() {
      if (state()) {
        document.removeEventListener('readystatechange', handler);
        self.emit('ready');
      }
    };

    document.addEventListener('readystatechange', handler);
  }
};

classes.extend(waff, EventEmitter);

module.exports = new waff;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../package":32,"./classes/EventEmitter":1,"./element":3,"./element/create":2,"./element/query":21,"./text":23,"./text/create":22,"./util/classes":27,"./util/object":28}],32:[function(require,module,exports){
module.exports={
  "name": "waff-query",
  "version": "1.0.0",
  "description": "lightweight dom manager",
  "main": "lib/waff.js",
  "scripts": {
    "build": "rm -rf dist && mkdir dist && browserify -s waff lib/waff.js | uglifyjs > dist/waff-query.js",
    "doc": "rm -rf doc && node_modules/.bin/jsdoc -t node_modules/docdash -d doc -r README.md lib",
    "test": "nyc mocha --reporter nyan"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/wvffle/waff-query.git"
  },
  "keywords": [
    "waff-query",
    "wq",
    "dom",
    "query"
  ],
  "author": "wvffle",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/wvffle/waff-query/issues"
  },
  "homepage": "https://github.com/wvffle/waff-query#readme",
  "devDependencies": {
    "expect.js": "^0.3.1",
    "jsdoc": "^3.4.3",
    "jsdom": "9.9.1",
    "jsdom-global": "2.1.1",
    "mocha": "^3.2.0",
    "nyc": "^10.0.0",
    "uglify-js": "^2.7.5"
  }
}

},{}]},{},[31])(31)
});