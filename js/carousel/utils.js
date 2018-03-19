const log = function() {
    console.log.apply(console, arguments)
}
// 定义元素选择器
const e = function (sel) {
    return document.querySelector(sel)
}
// es 返回一个数组, 包含所有被选中的元素
const es = function (sel) {
    return document.querySelectorAll(sel)
}

const appendHTML = function(element, html){
    element.insertAdjacentHTML('beforeend', html)
}
