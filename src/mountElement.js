const {setProps} = require('./DOM');

/**
 * javascript generate real dom，其实就是典型的递归操作！代码倒是很可取~ 非常有用！
 */
function mountElement(element) {
    // node 是真实节点，element 是{}，切记！
    let node;
    if (typeof element === 'number' || typeof element === 'string') {
        node = document.createTextNode(element);
    }
    else {
        node = document.createElement(element.type);

        // node 为真实的 dom 节点， element.props是一个{}，内部属性是真实的 dom 属性，这里直接赋值就行
        setProps(node, element.props);
        if (typeof element.children === 'number' || typeof element.children === 'string') {
            node.appendChild(mountElement(element.children));
        }
        else if (element.children) {
            // 深度优先遍历，返回一个 dom 数的数组；
            // 将该数据放置到当前的 node 内部

            //如果给forEach传递了thisArg参数，
            // 当调用时，它将被传给callback 函数，作为它的this值。
            // 否则，将会传入 undefined 作为它的this值。
            // callback函数最终可观察到this值，这取决于 函数观察到this的常用规则
            // node.appendChild 如果用到了 this，会是 undefined

            //forEach() 为每个数组元素执行callback函数；不像map() 或者reduce() ，它总是返回 undefined值，并且不可链式调用。
            // 典型用例是在一个链的最后执行副作用。
            element.children
                .map(mountElement)
                // 此处也可以改用箭头函数
                .forEach(node.appendChild, node);
        }
    }
    return node;
}

module.exports = mountElement;
