const DOMNodeCollection = require('./dom_node_collection.js');


let callbacksArr = [];
let ready = false;

window.$l = (queryArg) => {
    let nodesArr;
    if (queryArg instanceof HTMLElement) {
        nodesArr = [queryArg];
    } else if (queryArg && {}.toString.call(queryArg) === '[object Function]') {
        return addCallbackToDocReady(queryArg);
    } else {
        nodesArr = Array.from(document.querySelectorAll(queryArg));
    }
    return new DOMNodeCollection(nodesArr);
}

addCallbackToDocReady = (callback) => {
    if (ready) {
        callback();
    } else {
        callbacksArr.push(callback);
    }
}

$l.extend = (base, ...otherObjects) => {
    otherObjects.forEach( (obj) => {
        for (const prop in obj) {
            base[prop] = obj[prop];
        }
    });
    return base;
}

$l.ajax = (options) => {
    const request = new XMLHttpRequest();
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
  

document.addEventListener('DOMContentLoaded', () => {
    ready = true;
    callbacksArr.forEach( (callback) => callback());
});


$l( () => {
    const buttonEl = $l('.news-button');
    buttonEl.on('click', () => getNews());
});

getNews = () => {
    const $input = $(".news-subject").val();
    event.preventDefault();
    $l.ajax({method: 'get', url: `https://newsapi.org/v2/everything?q=${$input}&apiKey=47feb2c99f604fe2bb308b7ffd24335d`})
    .then((result) => handleResult(result))
}

handleResult = (result) => {
    $title = $('<p></p>');
    $title.html(result.articles[0].title);
    $('.news').append($title);
    $li = $('<li></li>')
    $li.html(result.articles[0].description);
    $('.news-list').append($li);
    console.log(result);
}


