// class 操作
const addClass = function(element, className) {
    element.classList.add(className)
}

const removeClass = function(element, className) {
    element.classList.remove(className)
}

const toggleClass = function(element, className) {
    element.classList.toggle(className)
}

const hasClass = function(element, className) {
    element.classList.contains(className)
}

const replaceClass = function(element, classNameOld, classNameNew) {
    element.classList.replace(classNameOld, classNameNew)
}
