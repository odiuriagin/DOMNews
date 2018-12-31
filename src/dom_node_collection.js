class DOMNodeCollection {
    constructor(nodes) {
        this.nodes = nodes;
    }

    html(string = null) {
        if (string === null) {
            return this.nodes[0].innerHTML;
        } else {
            this.nodes.forEach( (node) => node.innerHTML = string);
            return this.nodes;
        }
    }

    empty() {
        this.html('');
    }

    each(callback) {
        this.nodes.forEach(callback);
    }

    val() {
        return this.nodes[0].value;
    }

    append(el) {
        let html = "";
        if (el instanceof DOMNodeCollection) {
            el.nodes.forEach( (node) => {
                html += node.outerHTML;
            });
        } else if (el instanceof HTMLElement) {
            html += el.outerHTML;
        } else if (typeof el === 'string') {
            html = el;
        }

        this.nodes.forEach( (node) => {
            node.innerHTML += html;
        });

        return this.nodes;
    } 

    attr(key, value) {
        if (typeof value === "string") {
            this.nodes.forEach( (node) => node.setAttribute(key, value));
        } else {
            return this.nodes[0].getAttribute(key);
        }
      }
    
    addClass(string) {
        this.nodes.forEach( (node) => node.classList.add(string.trim()));
        return this.nodes;
    }

    removeClass(string) {
        this.nodes.forEach( (node) => node.classList.remove(string));
        return this.nodes;
    }

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

    children() {
        let arr = [];
        this.nodes.forEach((node) => {
            arr = arr.concat(Array.from(node.children));
        });
        return new DOMNodeCollection(arr);
    }

    parent() {
        let arr = [];
        this.nodes.forEach((node) => {
            arr = arr.concat(node.parentElement);
        });
        return new DOMNodeCollection(arr);
    }

    find(selector) {
        let arr = [];
        this.nodes.forEach((node) => {
            arr = arr.concat(Array.from(node.querySelectorAll(selector)));
        });
        return new DOMNodeCollection(arr);
    }

    remove(selector = null) {
        if (selector === null) {
            this.nodes.forEach((node) => {
            node.remove();
            });
        } else {
            const toRemove = document.querySelectorAll(`${this.node.tagName}${selector}`);
            toRemove.nodes.forEach( (node) => node.remove() );
        }
    }

    on(eventType, callback) {
        this.each( (node) => {
            node.addEventListener(eventType, callback);
            const event = `jqliteEvent-${eventType}`;
            if (typeof node[event] === "undefined") {
                node[event] = [];
            }
            node[event].push(callback);
        });
    }

    off(eventType) {
        this.nodes.forEach( (node) => {
            const event = `jqliteEvent-${eventType}`;
            if (node[event]) {
                node[event].forEach( (callback) => {
                    node.removeEventListener(eventType, callback);
                });
            }
        });
    };

}

module.exports = DOMNodeCollection;