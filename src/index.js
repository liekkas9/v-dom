const mountElement = require('./mountElement');
const diff = require('./diff');
const patch = require('./patch');
const {setProps} = require('./DOM');

function render(element, node) {
    node.appendChild(mountElement(element));
}

function hyperscript(type, props, children) {
    props = props || {};

    // children could be both primitive type like string or number,
    // or an array of element
    return {
        type,
        props,
        children
    };
}

/**
 * This is actually not `setState` at all,
 * it's just the entry for the diff algorithm.
 * In react, setState is the entry so here we keep the consistency
 */
function setState(parent, prevElement, nextElement) {
    // 先拿到 patch
    const p = diff(prevElement, nextElement);

    /**
     * 目测是把 path 转化成为真实的 dom，然后操作
     */
    patch(parent, p);
}

module.exports = {
    hyperscript,
    render,
    setState
};
