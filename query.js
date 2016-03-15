(function (exports) {

  // -- Group selectors
  var gs = function(selector){
    selector = selector || ''
    var cn = selector.split('.');
    var tag = false;
    if(selector[0] != '.') tag = cn[0];
    cn.splice(0, 1);
    var id = false;
    if(tag && tag[0] == '#') id = tag.split('#')[1];
    if(tag && id == '' && tag.indexOf('#') != -1){
      _tag = tag.split('#')
      tag = _tag[0]
      id = _tag[1]
    }
    if(id == '')
      for(var i = 0; i<cn.length;i++){
        var _id = cn[i].split('#')
        if(_id[1]){
          id = _id[1]
          cn[i] = _id[0]
          break;
        }
      }
    return {
      tag: tag,
      id: id,
      classList: cn
    }
  }

  // -- Query functions
  var qq = function(qs, root){
    if(root instanceof Array || root instanceof NodeList){
      var s = gs(qs);
      var arr = [].slice.call(root);
      var ret = [];
      for (var i = 0; i < arr.length; i++){
        is = true;
        if(arr[i] instanceof Element){
          if(s.tag && arr[i].tagName.toLowerCase()!=s.tag.toLowerCase()) is = false;
          if(s.id && arr[i].id != s.id) is = false;
          for (var j = 0; j < s.classList.length; j++)
            if(!arr[i].classList.contains(s.classList[j])) is = false;
          if(is) ret.push(arr[i]);
        }
      }
      return ret;
    }
    root = root instanceof Element ? root : document;
    if(qs instanceof Element) return [qs];
    if(qs instanceof NodeList || qs instanceof Array){
      var arr = [].slice.call(qs);
      var ret = [];
      for (var i = 0; i < arr.length; i++)
        if(arr[i] instanceof Element) ret.push(arr[i]);
      return ret;
    }
    var arr = [].slice.call(root.querySelectorAll(qs));
    var ret = [];
    for (var i = 0; i < arr.length; i++)
      if(arr[i] instanceof Element) ret.push(arr[i]);
    return ret;
  }
  var q = function(qs, root){
    return qq(qs, root)[0]||null;
  }
  Element.prototype.qq = function(qs){
    return qq(qs, this);
  }
  Element.prototype.q = function(qs){
    return q(qs, this);
  }

  //-- Create elements
  var e = function(selector){
    var s = gs(selector);
    var el = document.createElement(s.tag||'div');
    if(el.id) el.id = s.id;
    for (var i = 0; i < s.classList.length; i++)
      el.classList.add(s.classList[i]);
    return el;
  }
  var t = function(text){
    var e = document.createTextNode(text);
    return e;
  }
  Text.prototype.set = function (text) {
    this.nodeValue = text;
  }
  Text.prototype.get = function () {
    return this.nodeValue;
  }

  // -- Element actions
  Element.prototype.append = function (element) {
    this.appendChild(element);
  }
  Element.prototype.text = function (text) {
    if(!text) return this.textContent;
    if(text instanceof NodeList || text instanceof Array){
      var arr = [].slice.call(text);
      var _text = '';
      for (var i = 0; i < arr.length; i++){
        if(arr[i] instanceof Text) _text+= arr[i].get();
        else _text += arr[i].toString();
      }
      var e = t(_text);
      this.append(e);
      return e;
    }
    var nodes = this.childNodes;
    for (var i = 0; i < nodes.length; i++)
      nodes[i].remove();
    var e = t(text);
    this.append(e);
    return e;
  }
  Element.prototype.html = function (html) {
    if(!html) return this.innerHTML;
    var nodes = this.childNodes;
    for (var i = 0; i < nodes.length; i++)
      nodes[i].remove();
    if(html instanceof Element){
      this.append(html);
      return this.innerHTML;
    }
    if(html instanceof NodeList || html instanceof Array){
      var arr = [].slice.call(html);
      for (var i = 0; i < arr.length; i++)
        if(arr[i] instanceof Element || arr[i] instanceof Text)
          this.append(arr[i]);
      return this.innerHTML;
    }
    this.innerHTML = html;
    return this.innerHTML;
  }


  // -- Event
  var _ev = function(event, next, sth){
    var self = this;
    sth = sth === false?true:false;
    this.addEventListener(event, function(ev){next.call(self,ev)}, sth);
  }
  Element.prototype.on = _ev;
  Text.prototype.on = _ev;
  Window.prototype.on = _ev;
  Document.prototype.on = _ev;
  FileReader.prototype.on = _ev;
  XMLHttpRequest.prototype.on = _ev;

  // -- Changing css
  Element.prototype.css = function(css, ignoreDefaults){
    if(!css){
      css = getComputedStyle(this);
      var ret = {};
      if(ignoreDefaults){
        var defaults = getComputedStyle(e(this.tagName));
        for (var k in css) {
          if (!css.hasOwnProperty(k) && css[k] != '' && css[k] != defaults[k]) {
             ret[k] = css[k];
          }
        }
        return ret;
      }
      for (var k in css) {
        if (!css.hasOwnProperty(k) && css[k] != '') {
           ret[k] = css[k];
        }
      }
      return ret;
    };
    if(typeof css === 'boolean') return this.css(null, css);
    if(typeof css === 'string') return this.css(null, ignoreDefaults)[css];
    var self = this;
    for (var _k in css) {
      if (css.hasOwnProperty(_k)) {
        self.style[_k] = css[_k]
      }
    }
  }

  exports.q = q;
  exports.qq = qq;
  exports.gs = gs;
  exports.e = e;
  exports.t = t;

})(window);