const mountElement = require('./mountElement');
const {setProp, removeProp} = require('./DOM');

function changed(node1, node2) {
    /**
     * 1. 本身的类型换了，比如 div（object）变为 string（"AAAA"）
     * 2. 类型变了，比如 div 变为 p，相当于整体替换了，则整体替换
     * 3. 为 string，但是值变了，其实也就是整体被替换了
     * 以上三种，都走整体替换的路子！
     */
    return (typeof node1 !== typeof node2)
        || (node1.type !== node2.type)
        || (typeof node1 === 'string' && node1 !== node2);
}

function diff(prevElement, nextElement) {
    if (!prevElement) {
        return {
            type: 'CREATE',
            node: nextElement
        };
    }
    if (!nextElement) {
        return {
            type: 'REMOVE'
        };
    }
    if (changed(prevElement, nextElement)) {
        return {
            type: 'REPLACE',
            node: nextElement
        };
    }
    /**
     * 到这里的条件：
     * 1. pre 和 next 都存在
     * 2. 节点本身基本属性没有发生类型的变动，比如 number 变 string
     * 3. 节点的类型没有变化
     * 则余下来需要处理的点：
     * 1. 处理 props 的变动
     * 2. 处理子节点的变动
     */
    if (nextElement.type) {
        return {
            type: 'UPDATE',
            propsPatches: diffProps(prevElement.props, nextElement.props),
            childrenPatches: diffChildren(prevElement.children, nextElement.children)
        };
    }
}

function diffProps(prevProps, nextProps) {
    const props = Object.assign({}, prevProps, nextProps);
    const patches = [];
    Object.keys(props).forEach((attr) => {
        /**
         * 1. 该属性是新增的;
         * 2. 该属性存在，但是变动了
         */
        if (!prevProps[attr] || nextProps[attr] !== prevProps[attr]) {
            patches.push({
                type: 'SET_PROP',
                attr,
                value: props[attr]
            });
        }
        /**
         * 该属性被拿到了
         */
        if (!nextProps[attr]) {
            patches.push({
                type: 'REMOVE_PROP',
                attr
            });
        }
    });
    return patches;
}

function diffChildren(prevChildren, nextChildren) {
    const patches = [];
    const diffLength = Math.max(
        prevChildren.length,
        nextChildren.length
    );
    for(let i = 0; i < diffLength; i++) {
        patches.push(diff(
            prevChildren[i],
            nextChildren[i]
        ));
    }
    return patches;
}

module.exports = diff;
