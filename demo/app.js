const {render, hyperscript, setState} = require('../src');

function createComponent(count) {
    const r = [...Array(count).keys()];
    return (
        <ul id="cool" className={`my-class-${count}`}>
            {r.map(n => <li>{count}</li>)}
        </ul>
    );
}

function inc(parent, count) {
    if (count > 5) {
        return false;
    }
    /**
     * 1 已初始化
     * 后续从1开始，每次都修改一下 ul 的 classname，和添加一个节点。
     */
    setState(parent, createComponent(count), createComponent(count + 1));
    setTimeout(() => inc(parent, count + 1), 500);
}

// test setState
(function () {
    const root = document.getElementById('root');
    render(createComponent(1), root);

    setTimeout(() => inc(root, 1), 500);
})();
