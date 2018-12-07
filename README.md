# DOMNews

<a href="https://odiuriagin.github.io/DOMNews/">LIVE</a>

For this project, I have implemented my own version of jQuery library using native DOM API. 

<p>DOMNews Features:</p>
<ul>
    <li>Queuing document ready callbacks</li>
    <li>Handling user's input (news search keyword)</li>
    <li>Sending asynchronous request to News API to fetch news data</li>
    <li>Creating and adding DOM elements</li>
    <li>Manipulating existing DOM to display news data</li>
</ul>



<h2>API</h2>

<h3>AJAX Request</h3>
<ul>
    <li><b>$l.ajax(options)</b> - creates an asynchronous AJAX query with flexible parameters and sensible defaults.</li>
</ul>

```javascript
$l.ajax = (options) => {
    
    const defaults = {
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: "GET",
      url: "",
      success: () => {},
      error: () => {},
      data: {},
      dataType: 'json',
    };
    options = $l.extend(defaults, options);
    options.method = options.method.toUpperCase();

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url);
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(JSON.parse(xhr.response));
          }
        };
        xhr.send(JSON.stringify(options.data));
      })
  };

```


<p><b>$l(selector)</b> - The core function that takes a CSS selector or HTML element as argument and wraps it in a DOMNodeCollection that gives us access to all its available methods. If it receives a function, it will push that fucntion into an array (queue) of functions to be executed when the document is ready.</p>

```javascript
$l = (queryArg) => {
    let nodesArr;
    if (queryArg instanceof HTMLElement) {
        nodesArr = [queryArg];
    } else if (queryArg && {}.toString.call(queryArg) === '[object Function]') {
        return addCallbackToDocReady(queryArg);
    } else if (queryArg[0] === "<") {
        nodesArr = [document.createElement(queryArg.split("<")[1].split(">")[0])];
    } else {
        nodesArr = Array.from(document.querySelectorAll(queryArg));
    }
    return new DOMNodeCollection(nodesArr);
}
```

<h2>DOMNodeCollection methods</h2>

<h3>DOM manipulation</h3>
<ul>
    <li><b>html</b> - sets the innerHTML of each element in the DOMNodeCollection to passed argument(string). If there is no passed argument - it returns innerHTML of the first element in the DOMNodeCollection.</li>
    <li><b>empty</b> - clears out the content of all nodes in the internal array.</li>
    <li><b>append</b> - appends the outerHTML of each element in the argument to the innerHTML of each element in the DOMNodeCollection.</li>
    <li><b>attr</b> - sets each element in the DOMNodeCollection with the given attribute to the value</li>
</ul>

```javascript
    attr(key, value) {
        if (typeof value === "string") {
            this.nodes.forEach( (node) => node.setAttribute(key, value));
        } else {
            return this.nodes[0].getAttribute(key);
        }
    }
```
<ul>
    <li><b>toggleClass</b> - takes a string as an argument ad adds or removess class name to each element in the DOMNodeCollection.</li>
</ul>

```javascript
    toggleClass(string) {
        this.nodes.forEach ( (node) => {
            if (node.classList.contains(string)) {
                node.classList.remove(string);
            } else {
                node.classList.add(string.trim());
            }
        });
        return this.nodes;
    }

```

<h3>DOM Traversal</h3>
<ul>
    <li><b>children()</b> - returns a DOMNodeCollection of all children of all nodes in the array</li>
    <li><b>parent()</b> - returns DOMNodeCollection of the parents of each of the nodes</li>
    <li><b>find(selector)</b> - returns a DOMNodeCollection of all descendants of any nodes matching a passed selector argument.</li>

```javascript
    find(selector) {
        let arr = [];
        this.nodes.forEach((node) => {
            arr = arr.concat(Array.from(node.querySelectorAll(selector)));
        });
        return new DOMNodeCollection(arr);
    }

```
</ul>

<h3>Event Listeners</h3>
<ul>
    <li><b>on(eventType, callback)</b> - adds an event listener to elements of DOMNodeCollection with a specific callback.</li>
    <li><b>off(eventType)</b> - removes a callback for an event from elements of a DOMNodeCollection.</li>
</ul>
