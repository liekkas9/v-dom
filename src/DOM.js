function setProps(node, props) {
    if (!props) {
        return false;
    }
    Object.keys(props).forEach((attr) => {
        setProp(node, attr, props[attr]);
    });
}

function setProp(node, attr, value) {
    // 在全部浏览器上均有效！
    if (attr === 'className') {
        node.className = value;
    }
    else {
        // 设置 className，在 ie 有效，其他W3C标准的浏览器是无效的
        // 设置 class，则在W3C下是生效的，但在IE下是无效的
        node.setAttribute(attr, value);
    }
}

function removeProp(node, attr) {
    if (attr === 'className') {
        node.className = '';
    }
    else {
        node.removeAttribute(attr);
    }
}

module.exports = {
    setProps,
    setProp,
    removeProp
};
