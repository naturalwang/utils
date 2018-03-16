var appendHTML = function(element, html){
    element.insertAdjacentHTML('beforeend', html)
}
// log 函数
// var log = console.log.bind(console)
var log = function() {
    console.log.apply(console, arguments)
}

// 封装的事件绑定函数
var bindEvent = function(element, eventName, callback, useCapture=false){
    element.addEventListener(eventName, callback, useCapture)
}

// 定义元素选择器
var e = function (sel) {
    return document.querySelector(sel)
}

var hasClass = (element, className) => {
    return element.classList.contains(className)
}
// es 返回一个数组, 包含所有被选中的元素
//
// 实现一个 GuaAlert 函数, 如下
var GuaAlert = function(title, message) {
    /*
    title 是 string
    message 是 string

    这个函数生成一个弹窗插入页面
    弹窗并不是真正的弹窗, 而是模拟的, 请参考下面的链接
    https://www.webtoolnavi.com/demo/sweetalert2/
    弹窗包含 title 作为标题 和 message 作为信息
    还包含一个 OK 按钮
    点击 OK 按钮关闭弹窗
    */
    var addHtml = () => {
        var html = `
        <div class="gua-container">
            <div class="gua-alert gua-absolute-center gua-flex-center">
                <div class="gua-title">
                    ${title}
                </div>
                <div class="gua-message">
                    ${message}
                </div>
                <div class="gua-footer">
                    <button class="footer-ok gua-button">OK</button>
                </div>
            </div>
            <div class="gua-mask"></div>
        </div>
        `
        var body = document.body
        appendHTML(body, html)
    }

    var addCss = () => {
        var css = `
            <style>
                .gua-alert {
                    background: #FFFFFF;
                    width: 480px;
                    height: 210px;
                    z-index: 2;
                    font-family: cursive, 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    border-radius: 7px;
                    transition: all 2s;
                }
                .gua-alert:hover {
                    box-shadow: 1px 1px 60px 5px rgba(255, 255, 255, 0.6);
                }
                .gua-absolute-center {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translateX(-50%) translateY(-50%);
                }
                .gua-button {
                    display: inline-block;
                    background-color: rgb(140, 212, 245);
                    border-radius: 5px;
                    padding: 10px 32px;
                    margin: 26px 5px 0 5px;
                    cursor: pointer;
                    color: white;
                    border: none;
                    font-size: 17px;
                    font-weight: 500;
                }
                .gua-button:hover {
                    background: rgb(25, 138, 228);
                }
                .gua-mask {
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.4);
                    position: absolute;
                    z-index: 1;
                }
                .gua-flex-center {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                }
                .gua-title {
                    position: relative;
                    top: -34px;
                    font-size: 26px;
                }
                .gua-footer {
                    position: relative;
                    bottom: -34px;
                }
            </style>
        `
        var head = document.head
        appendHTML(head, css)
    }

    var bindEventOk = function() {
        var body = document.body
        bindEvent(body, 'click', function(event){
            var self = event.target
            log('click', self)
            if (hasClass(self, 'footer-ok')) {
                var container = e('.gua-container')
                container.remove()
            }
        })
        // bindEvent(body, 'click', function(event){
        //     var self = event.target
        //     if (hasClass(self, 'footer-ok')) {
        //         var alertContainer = e('.gua-alert')
        //         alertContainer.remove()
        // })
    }

    var __init = () => {
        addHtml()
        addCss()
    }

    var bindEvents = () => {
        bindEventOk()
    }

    var __main = () => {
        __init()
        bindEvents()
    }

    __main()
}

GuaAlert('title', 'hello gua!')
