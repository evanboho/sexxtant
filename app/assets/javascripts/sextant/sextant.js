function each(elems, func) {
  if (!elems instanceof Array) { elems = [elems]; }
  for (var i = elems.length; i--; ) {
    func(elems[i]);
  }
}

function setValOn(elems, val) {
  each(elems, function(elem) {
    elem.innerHTML = val;
  });
}

function onClick(elems, func) {
  each(elems, function(elem) {
    elem.onclick = func;
  });
}

// Enables functionality to toggle between `_path` and `_url` helper suffixes
function setupRouteToggleHelperLinks() {
  var toggleLinks = document.querySelectorAll('#route_table [data-route-helper]');
  onClick(toggleLinks, function(){
    var helperTxt   = this.getAttribute("data-route-helper");
    var helperElems = document.querySelectorAll('[data-route-name] span.helper');
    setValOn(helperElems, helperTxt);
  });
}

function setupAjaxSearch() {
  var searchBar = document.querySelectorAll('#search-field input');
  keyUp(searchBar, function() {
    var term = this.value;
    loadResults('/rails/routes.js', term, function(xhr) {
      eval(xhr.responseText);
    })
  });
}

function keyUp(elems, func) {
  each(elems, function(elem) {
    elem.onkeyup = func;
  });
}

function loadResults(url, term, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = ensureReady;
  function ensureReady() {
    if(xhr.readyState < 4) {  
      return;  
    }  
    if(xhr.status !== 200) {  
      return;  
    }  
    if(xhr.readyState === 4) {  
      callback(xhr);  
    }  
  }
  xhr.open('GET', url + "?term=" + term, true);
  xhr.send("");
}

