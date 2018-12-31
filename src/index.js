const DOMNodeCollection = require('./dom_node_collection.js');

let callbacksArr = [];
let ready = false;

window.$l = (queryArg) => {
    
    let nodesArr;
    if (queryArg instanceof HTMLElement) {
        nodesArr = [queryArg];
    } else if (typeof queryArg === "function") {
        return addCallbackToDocReady(queryArg);
    } else if (queryArg[0] === "<") {
        nodesArr = [document.createElement(queryArg.split("<")[1].split(">")[0])];
    } else {
        nodesArr = Array.from(document.querySelectorAll(queryArg));
    }
    return new DOMNodeCollection(nodesArr);
}


const addCallbackToDocReady = (callback) => {
    
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


const getNews = () => {
    
    const $input = $l(".news-subject").val();
    if ($input === "") {
        alert("Field can't be empty!");
    } else {
        $l.ajax({method: 'get', url: `https://newsapi.org/v2/everything?q=${$input}&apiKey=47feb2c99f604fe2bb308b7ffd24335d`})
        .then((result) => handleResult(result));
    }
}

$l( () => {
    let $form = $l('.news-form');
    $form.on('submit', (event) => {
        event.preventDefault();
        getNews();
    });
});


const handleResult = (result) => {
    
    let articleNumber = getRandomNumber(result.articles.length);
    if (result.totalResults === 0) {
        alert('Invalid Input!');
    } else {
        setTitle(result, articleNumber);
        setImage(result, articleNumber);
        setContent(result, articleNumber);
        setLink(result, articleNumber);
        // addButton();
        // handleSpin();
    }
}

const getRandomNumber = (num) => {
    return Math.floor((Math.random() * num));
};

const setTitle = (result, articleNumber) => {
    let $title = $l('.news-title');
    $title.html(result.articles[articleNumber].title);
}

const setImage = (result, articleNumber) => {
    let imageUrl = result.articles[articleNumber].urlToImage;
    let $image = $l('.news-image');
    $image.attr('src', imageUrl);
}

const setContent = (result, articleNumber) => {
    $content = $l('.news-content');
    $content.html(result.articles[articleNumber].description)
}

const setLink = (result, articleNumber) => {
    let linkAddress = result.articles[articleNumber].url;
    let source = result.articles[articleNumber].source.name;
    $link = $l('.news-link');
    $link.attr('href', linkAddress);
    $link.html(`Read More On "${source}"`);
}

// const addButton = () => {
//     $newsBlock = $l('.news');
//     $button = $l('<button></button>');
//     $button.html('SPIN IMAGE');
//     $button.addClass('spin-button');
//     $newsBlock.append($button);
// }

// const handleSpin = () => {
//     let $button = $l('.spin-button');
//     let $image = $l('.news-image');
//     $button.on('click', (event) => {
//         event.preventDefault();
//         $image.toggleClass('rotate-image');
//         let text = $button.html() === 'SPIN IMAGE' ? 'STOP SPINNING' : 'SPIN IMAGE';
//         $button.html(text);
//     });
// }


