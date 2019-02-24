// ============================================================
// 基础 -------------------------------------------------------
// ============================================================
// log 函数
// var log = console.log.bind(console)
var log = function() {
    console.log.apply(console, arguments)
}
// 定义元素选择器
var e = function (sel) {
    return document.querySelector(sel)
}
// es 返回一个数组, 包含所有被选中的元素
var es = function (sel) {
    return document.querySelectorAll(sel)
}
// JS 时间格式化
var currentTime = function() {
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var timeString = `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`
    return timeString
}
// 时间标准库
// ===
// 常用用法如下
/*
var d = new Date()
d.getFullYear()
年份, 2016
d.getMonth()
月份, 0-11
d.getDate()
日期, 1-31
d.getHours()
小时, 0-23
d.getMinutes()
分钟, 0-59
d.getSeconds()
秒数, 0-59
d.getMilliseconds()
毫秒, 0-999
d.getDay()
星期几, 0-6
*/
// 测试函数
var ensure = function(condition, message) {
    // condition 是布尔值
    // message 是 string, condition 不成立的时候被输出
    if(!condition) {
        console.log(message)
    } else {
        console.log('测试成功')
    }
}
// 判断浮点数相等
var floatEqual = function(a, b) {
    var delta = 0.0001
    return Math.abs(a - b) < delta
}
// 加强版测试函数
var ensureEqual = function(a, b, message) {
    if (JSON.stringify(a) != JSON.stringify(b)) {
        log(`${message} 测试出错:${a} != ${b}`)
    } else {
        log(`${message} 测试成功!`)
    }
}
const arrayEqual = function(a, b) {
    if (a.length != b.length) {
        return false
    }
    var result = true
    for (var i = 0; i < a.length; i++) {
        var a1 = a[i]
        var b1 = b[i]
        if (a1 instanceof Array && b1 instanceof Array) {
            result = arrayEqual(a1, b1)
        } else {
            result = a1 == b1
        }
        if (!result) {
            return false
        }
    }
    return true
}
const arrayEqualTest = () => {
    a1 = [1, 2, 3]
    a2 = [1, 2, 3]
    ensure(arrayEqual(a1, a2), 'test1')
    b1 = [[1, 2, 3]]
    b2 = [[1, 2, 3]]
    ensure(arrayEqual(b1, b2), 'test2')
    c1 = [[1, 2, 3], [1, 2, 3]]
    c2 = [[1, 2, 3], [1, 2, 3]]
    ensure(arrayEqual(c1, c2), 'test3')
    d1 = [[1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2, 3]]]
    d2 = [[1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2, 3]]]
    ensure(arrayEqual(d1, d2), 'test4')
    e1 = []
    e2 = []
    ensure(arrayEqual(e1, e2), 'test5')
    f1 = [[1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2, 2]]]
    f2 = [[1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2, 3]]]
    ensure(!arrayEqual(f1, f2), 'test6')
}

let objectEquals = (o1, o2) => {
    if (Object.keys(o1).length !== Object.keys(o2).length) {
        return false
    }
    for (var k1 in o1) {
        if (o1.hasOwnProperty(k1)) {
            let v1 = o1[k1]
            let v2 = o2[k1]
            // log('debug k', k1)
            // log('debug v1 v2', v1, v2)
            if ((v1 instanceof Array) && (v2 instanceof Array)) {
                let result = arrayEquals(v1, v2)
                if (!result) {
                    return false
                }
            } else if ((v1 instanceof Object) && (v2 instanceof Object)) {
                let result = objectEquals(v1, v2)
                if (!result) {
                    return false
                }
            } else {
                if (v1 !== v2) {
                    return false
                }
            }
        }
    }
    return true
}

// ============================================================
// 小工具 utils -----------------------------------------------
// ============================================================
// 判断 string 的元素全部是字母
const isFloat = (num) => {
    return n % 1 !== 0
}
var onlyAlphabet = function(s) {
    var lower = 'abcdefghijklmnopqrstuvwxyz'
    var upper = lower.toUpperCase()
    var alphabeta = lower + upper
    for (var i = 0; i < s.length; i++) {
        var char = s[i]
        if (!alphabeta.includes(char)) {
            return false
        }
    }
    return true
}
// 判断是否是合法的变量名，目前定义了数字、字母、下划线
var validName = function(s) {
    var lower = 'abcdefghijklmnopqrstuvwxyz'
    var upper = lower.toUpperCase()
    var digital = '0123456789'
    var alphabeta = lower + upper
    var limitText = alphabeta + digital + '_'
    for (var i = 0; i < s.length; i++) {
        if (limitText.includes(s[i]) === false) {
            return false
        }
    }
    return true
}
// 检查 s 中是否只包含数字
var isDigit = function(s) {
    /*
    s 是字符串
    检查 s 中是否只包含数字
    返回: bool, 如果 s 中包含的只有数字则返回 true, 否则返回 false
    */
    var digit = '0123456798'
    if (s.length == 0) {
        return false
    }
    for (var i = 0; i < s.length; i++) {
        if (digit.includes(s[i]) == false) {
            return false
        }
    }
    return true
}
// 判断只包含字母或数字
var alphabetaAndNumber = function(s) {
    var lower = 'abcdefghijklmnopqrstuvwxyz'
    var upper = lower.toUpperCase()
    var alphabeta = lower + upper
    var digital = '0123456789'
    var limitText = alphabeta + digital
    for (var i = 0; i < s.length; i++) {
        if (limitText.includes(s[i]) === false) {
            return false
        }
    }
    return true
}
// 返回一个 object 的 key=value&key=value 的形式
var queryFromObject = function(param) {
      var keys = Object.keys(param)
    var items = []
    for(var i = 0; i < keys.length; i++){
        var key = keys[i]
        var item = key + '=' + param[key]
        items.push(item)
    }
      var result = items.join('&')
    return result
}
// 将 foo=1&bar=far 格式的 string 返回 object
var argsFromQuery = function(queryString) {
    var pairs = queryString.split('&')
    var args = {}
    for (var i = 0; i < pairs.length; i++) {
        var p = pairs[i]
        var kv = p.split('=')
        args[kv[0]] = kv[1]
    }
    return args
}
// 将一个单个字符转化为对应的 ascii 码
var ascii = function(char) {
    return char.charCodeAt(0)
}
// 将一个 ascii 码转化为对应的单个字符
var charFromAscii = function(code) {
    return String.fromCharCode(code)
}
// 将一个不大于 255 的 int 转化成 '00000111' 的二进制形式
var binary = function(n) {
    var m = n.toString(2)
    while(m.length < 8) {
        m = '0' + m
    }
    return m
}
// 将一个 8 位二进制形式的字符串转化为 int
var int = function(bin) {
    /*
    bin 是一个 8 位二进制形式的字符串
    返回 bin 代表的数字
    例如 int('00000111') 返回 7
    进制转换自行搜索或者论坛提问大家讨论吧
    */
    return parseInt(bin,2)
}
// 将一个 string 转化为 二进制
var binaryStream = function(s) {
    var str = ''
    for (var i = 0; i < s.length; i++) {
        var n = s.charCodeAt(i)
        str += binary(n)
    }
    return str
}
// 将一个二进制字符串转化为 实际含义的字符串
// 例如 stringFromBinary('010011010110000101101110') 返回 'Man'
var stringFromBinary = function(bins) {
    var str = ''
    var n = 0
    for (var i = 8; i <= bins.length; i += 8) {
        var m = bins.slice(n,i)
        var number = int(m)
        str += String.fromCharCode(number)
        n = i
    }
    return str
}
// s 是一个 string, 返回 s 的 base64 编码
// 求数组的和
var sumArray = function(array) {
    // 先设置一个变量用来存 和
    var s = 0
    // 遍历数组
    for(var i = 0; i < array.length; i++) {
        // 用变量 n 保存元素值
        var n = array[i]
        // 累加到变量 s
        s = s + n
    }
    // 循环结束, 现在 s 里面存的是数组中所有元素的和了
    return s
}
// 参数是一个只包含数字的 array， 求 array 的乘积
var productArray = function(array) {
    // 先设置一个变量用来存结果
    var s = 1
    // 遍历数组
    for(var i = 0; i < array.length; i++) {
        // 用变量 n 保存元素值
        var n = array[i]
        // 累乘到变量 s
        s = s * n
    }
    // 循环结束, 现在 s 里面存的是数组中所有元素的积了
    return s
}
// 返回参数 s2 在 s1 中第一次出现的下标， 没有则是 -1
var findIn = function(s1, s2) {
    /*
    s1 是一个字符串
    s2 是一个长度为 1 的字符串
    返回参数 s2 在 s1 中第一次出现的下标
    如果 s2 没有在 s1 中出现, 返回 -1
    */
    for (var i = 0; i < s1.length; i++) {
        if (s1[i] == s2) {
            return i
        }
    }
    return -1
}
// 返回参数 s2 在 s1 中出现的下标, 一个数组
var findAllString = function(s1, s2) {
    /*
    s1 是一个字符串
    s2 是一个字符串, 长度未知, 不一定为 1
    返回参数 s2 在 s1 中出现的下标组成的 array
    如果 s2 没有在 s1 中出现, 返回 []
    */
    var result = []
    for (var i = 0; i < s1.length - s2.length; i++) {
        if (s1.slice(i, i + s2.length) == s2) {
            result.push(i)
        }
    }
    return result
}
// 把 n 的位数变成 width 这么长，并在右对齐，不足部分用 0 补足并返回
var zfill = function(n, width) {
    /*
    n 是 int 类型
    width 是 int 类型
    把 n 的位数变成 width 这么长，并在右对齐，不足部分用 0 补足并返回
    具体请看测试, 注意, 返回的是 string 类型
    返回 string 类型
    */
    var s = String(n)
    if (s.length >= width) {
        return s
    } else {
        for (var i = s.length; i < width; i++) {
            s = '0' + s
        }
        return s
    }
}
// 如果 s 长度小于 width, 则在末尾用 fillchar 填充并返回
var ljust = function(s, width, fillchar = ' ') {
    /*
    s 是 string
    width 是 int
    fillchar 是 长度为 1 的字符串, 默认为空格 ' '
    如果 s 长度小于 width, 则在末尾用 fillchar 填充并返回
    否则, 原样返回, 不做额外处理
    返回 string 类型
    */
    if (s.length >= width) {
        return s
    } else {
        for (var i = s.length; i < width; i++) {
            s += fillchar
        }
        return s
    }
}
var rjust = function(s, width, fillchar = ' ') {
    /*
    s 是 string
    width 是 int
    fillchar 是 长度为 1 的字符串, 默认为空格 ' '
    如果 s 长度小于 width, 则在开头用 fillchar 填充并返回
    返回 string 类型
    */
    if (s.length >= width) {
        return s
    } else {
        for (var i = s.length; i < width; i++) {
            s = fillchar + s
        }
        return s
    }
}
var center = function(s, width, fillchar = ' ') {
    /*
    s 是 string
    width 是 int
    fillchar 是 长度为 1 的字符串, 默认为空格 ' '
    如果 s 长度小于 width, 则在两边用 fillchar 填充并返回
    如果 s.length 和 width 互为奇偶, 则无法平均分配两边的 fillchar
    这种情况下, 让左边的 fillchar 数量小于右边
    返回 string 类型
    */
    if (s.length >= width) {
        return s
    } else {
        for (var i = s.length; i < width; i++) {
            if ((width - s.length) % 2 == 0) {
                s = fillchar + s
            } else {
                s += fillchar
            }
        }
        return s
    }
}
// 检查 s 中是否只包含空格
var isSpace = function(s) {
    /*
    s 是 string
    检查 s 中是否只包含空格
    返回 bool, 如果 s 中包含的只有空格则返回 true, 否则返回 false
    */
    if (s.length == 0) {
        return false
    }
    for (var i = 0; i < s.length; i++) {
        if (s[0] != ' ') {
            return false
        }
    }
    return true
}
// 返回一个「删除了字符串开始的所有空格」的字符串
var stripLeft = function(s) {
    /*
    s 是 string
    返回一个「删除了字符串开始的所有空格」的字符串
    返回 string
    */
    var index = s.length
    for (var i = 0; i < s.length; i++) {
        if (s[i] != ' ') {
            index = i
            break
        }
    }
    return s.slice(index)
}
// 返回一个「删除了字符串末尾的所有空格」的字符串
var strip_right = function(s) {
    /*
    s 是 string
    返回一个「删除了字符串末尾的所有空格」的字符串
    返回 string
    */
    var index = -1
    for (var i = s.length - 1; i >= 0; i--) {
        if (s[i] != ' ') {
            index = i
            break
        }
    }
    return s.slice(0, index + 1)
}
var strip = function(s) {
    /*
    s 是 string
    返回一个「删除了字符串首尾的所有空格」的字符串
    返回 string
    */
    s = strip_left(s)
    s = strip_right(s)
    return s
}
var startsWith = function(s1, s2) {
    /*
    s1 是一个字符串
    s2 是一个字符串
    检查 s1 是否以 s2 开头, 返回 true 或者 false
    */
    var len2 = s2.length
    log(s1.slice(0, len2 + 1))
    return s1.slice(0, len2) == s2
}
var endsWith = function(s1, s2) {
    /*
    s1 是一个字符串
    s2 是一个字符串
    检查 s1 是否以 s2 结尾, 返回 true 或者 false
    */
    return s1.slice(s1.length - s2.length) == s2
}
var prettyLog = function(array) {
    /*
    array 是 array 类型, 里面的元素都是字符串
    按如下的格式返回这个 array
    假设 array 是 ['python', 'js', 'objective-c']
    那么返回的数据是一个数组, 多了首尾两个元素
    [
        '+++++++++++++++',
        '+ python      +',
        '+ js          +',
        '+ objective-c +',
        '+++++++++++++++',
    ]
    返回包含了 string 的 array
    */
    var len = array[0].length
    var result = []
    for (var i = 0; i < array.length; i++) {
        if (array[0].length < array[i].length) {
            len = array[i].length
        }
    }
    result.push('+'.repeat(len + 4))
    for (var i = 0; i < array.length; i++) {
        var lenSpace = len - array[i].length
        var formatted = '+ ' + array[i] + ' '.repeat(lenSpace) + ' +'
        result.push(formatted)
    }
    result.push('+'.repeat(len + 4))
    return result
}
var replaceAll = function(s, old, newString) {
    /*
    s old newString 都是 string
    返回一个「将 s 中出现的所有 old 字符串替换为 new 字符串」的字符串
    */
    var arr = s.split(old)
    var result = arr.join(newString)
    return result
}
// 返回一个 array, 包含了 a 中所有元素, 但不包含重复元素
var unique = function(a) {
    /*
    a 是一个 array
    返回一个 array, 包含了 a 中所有元素, 但不包含重复元素
    例如 a 是 [1, 2, 3, 1, 3, 5]
    返回 [1, 2, 3, 5]
    */
    var r = []
    for (var i = 0; i < a.length; i++) {
        if (!r.includes(a[i])) {
            r.push(a[i])
        }
    }
    return r
}
// 两数组交集
var intersection = function(a, b) {
    /*
    a b 都是 array
    返回一个 array, 里面的元素是同时出现在 a b 中的元素
    也就是取交集
    这个 array 中不包含重复元素
    */
    var r = []
    for (var i = 0; i < a.length; i++) {
        if (b.includes(a[i])) {
            r.push(a[i])
        }
    }
    return r
}
// 两数组求并集
var union = function(a, b) {
    /*
    a b 都是 array
    返回一个 array, 里面的元素是所有出现在 a b 中的元素
    这个 array 中不包含重复元素
    */
    var r = []
    for (var i = 0; i < a.length; i++) {
        r.push(a[i])
    }
    for (var i = 0; i < b.length; i++) {
        r.push(b[i])
    }
    return unique(r)
}
// a 对 b 的差集
var difference = function(a, b) {
    /*
    a b 都是 array
    返回一个 array, 里面的元素是
    所有在 a 中有 b 中没有的元素
    这个 array 中不包含重复元素
    */
    var d = intersection(a, b)
    var r = []
    for (var i = 0; i < a.length; i++) {
        if (!d.includes(a[i])) {
            r.push(a[i])
        }
    }
    return r
}
// 总差集
var differenceAll = function(a, b) {
    /*/
    a b 都是 array
    返回一个 array, 里面的元素是
    所有在 a b 中的非公共元素
    这个 array 中不包含重复元素
    /*/
    var a1 = difference(a, b)
    var a2 = difference(b, a)
    return a1.concat(a2).sort()
}
var isSubset = function(a, b) {
    /*/
    a b 都是 array
    检查是否 a 中的每个元素都在 b 中出现
    返回 bool
    /*/
    for (var i = 0; i < a.length; i++) {
        if (!b.includes(a[i])) {
            return false
        }
    }
    return true
}
// ============================================================
// 算法 -------------------------------------------------------
// ============================================================
// 判断是否是素数
const degreeToRadian = (angle) => {
    return angle * Math.PI / 180
}
const sin = (angle) => {
    let radian = degreeToRadian(angle)
    let s = Math.sin(radian)
    return s.toFixed(3)
}
const cos = (angle) => {
    let radian = degreeToRadian(angle)
    let s = Math.cos(radian)
    return s.toFixed(3)
}
var int = function(num) {
    return Math.floor(num)
}
const range = (a, b, step=1) => {
    var result = []
    if (a < b) {
        if (step < 0) {
            step *= -1
        }
        for (var i = a; i < b; i += step) {
            result.push(i)
        }
    } else if (a > b) {
        if (step < 0) {
            step = Math.abs(step)
        }
        for (var i = a; i > b; i -= step) {
            result.push(i)
        }
    } else {
        log('error in range')
    }
    return result
}
const sum = (array) => {
    return array.reduce((sum, value) => {
        return sum + value
    })
}
var isPrime = function(n) {
    if (n < 2) {
        return false
    }
    for (var i = 2; i <= Math.sqrt(n) ; i++) {
        var a = n % i
        if (a === 0) {
            return false
        }
    }
    return true
}
// 判断是否是奇数和偶数
var isOdd = function(n) {
    // 取余数的操作符是 %
    // if(n % 2 != 0) {
    //     return true
    // } else {
    //     return false
    // }
    // 实际上, 这一段代码可以简单地写成下面的样式
    return n % 2 != 0
    // 或者下面的代码
    // var r = n % 2 != 0
    // return r
}
var isEven = function(n) {
    // 取余数的操作符是 %
    if(n % 2 == 0) {
        return true
    } else {
        return false
    }
}
// 返回两个参数中较小的一个
var min = function(a, b) {
    if(a < b) {
        return a
    } else {
        return b
    }
}
// 求绝对值
var abs = function(n) {
    if (n < 0) {
        n = -n
    }
    return n
}
// 求平均数
var average = function(array) {
    var n = array.length
    var s = sum(array)
    return s / n
}
// 斐波那契数列
var fib = function(n) {
    // 如果 n 是 1 或者 2 则返回 1 作为结果
    // 这是递归终止的条件, 必须要有, 否则无限递归了
    if(n == 1 || n == 2){
        return 1
    } else {
        // 如果 n 不为 1 和 2, 返回 fib(n-2) + fib(n-1)
        // 这时候 fib(n-2) fib(n-1) 需要计算
        // 于是代码进入下一重世界开始计算
        return fib(n-2) + fib(n-1)
    }
}
// 阶乘
var fac = function(n) {
    // 如果 n 是 0 则返回 1
    // 这是递归终止的条件, 必须要有, 否则无限递归了
    if(n == 0) {
        return 1
    } else {
        // 如果 n 不为 0, 返回 n * fac(n-1)
        // 这时候 n 是已知的, fac(n-1) 需要计算
        // 于是代码进入下一重世界开始计算
        return n * fac(n-1)
    }
}
// 凯撒加密
var encode = function(s, shift) {
    /*
    实现 encode3
    多了一个参数 shift 表示移的位数
    如果 s 中包含了不是字母的字符, 比如空格或者其他符号
    则对这个字符不做处理保留原样
    注意:
        s 是一个只包含小写字母和不是字母的字符的字符串
    */
    var lower = 'abcdefghijklmnopqrstuvwxyz'
    var result = ''
    for (var i = 0; i < s.length; i++) {
        var c = s[i]
        var index = find(lower, c)
        if (index == -1) {
            result += c
        } else {
            var newIndex = (index + shift) % 26
            result += lower[newIndex]
        }
    }
    return result
}
// ============================================================
// web 相关 --------------------------------------------------
// ============================================================
// 根据 class 开关状态
var toggleClass = function(element, className){
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}
// 事件类型
var EventType = {
    blur: 'blur',
    click: 'click',
    keydown: 'keydown',
}
// 将 html 插入到元素末尾
var appendHTML = function(element, html){
    element.insertAdjacentHTML('beforeend', html)
}
// 删除所有拥有 className 的元素的 classList 里的 className
var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}
// 把 html 作为子元素插入到 selector 选中的所有元素的末尾
var appendHTMLAll = function(selector, html) {
    /*
    selector 是一个 string, 选择器, 有如下三种取值
        1, 标签选择器, 如 'div'
        2, class 选择器, 如 '.red'
        3, id 选择器, 如 '#id-input-name'
    html 是一段 html 字符串
    把 html 作为子元素插入到 selector 选中的所有元素的末尾
    */
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        appendHtml(elements[i], html)
    }
}
// 封装的事件绑定函数
var bindEvent = function(element, eventName, callback, useCapture=false){
    element.addEventListener(eventName, callback, useCapture)
}
// 在 element 上绑定一个事件委托, 只会响应拥有 responseClass 类的元素
// 需要做成支持多个 responseClass 的形式
var bindEventDelegate = function(element, eventName, callback, responseClass, useCapture=false){
    element.addEventListener(eventName, function(event){
        var target = event.target
        var hasClass = target.classList.contains(responseClass)
        if (hasClass) {
            callback()
        }
    })
}
// 把 html 作为子元素插入到 selector 选中的所有元素的末尾
var append = function(selector, html){
    var target = es(selector)
    for (var i = 0; i < target.length; i++) {
        target[i].insertAdjacentHTML('beforeend',html)
    }
}
// 给 selector 选中的所有元素绑定 eventName 事件
const bindAll = function(selector, eventName, callback, responseClass=""){
    /*
    selector 是一个 string, 选择器, 有如下三种取值
        1, 标签选择器, 如 'div'
        2, class 选择器, 如 '.red'
        3, id 选择器, 如 '#id-input-name'
    eventName 是一个 string, 表示事件的名字
    callback 是一个函数
    responseClass 是一个字符串, 这个参数可以为空
    给 selector 选中的所有元素绑定 eventName 事件
    当 responseClass 给出的时候, callback 只会响应拥有 responseClass 类的元素
    当 responseClass 没有给的时候, callback 直接响应
    */
   var elementList = es(selector)
   var target = elementList
   for (var i = 0; i < elementList.length; i++) {
       if(responseClass != ''){
            if(target[i].classList.contains(responseClass)){
                target[i].addEventListener(eventName, callback)
            }
        } else {
            target[i].addEventListener(eventName, callback)
        }
   }
}
// 用 GET 方法请求一个 URL
var ajaxGet = function(request) {
    var r = XMLHttpRequest()
    // true 表示使用异步
    r.open('get', request.url, true)
    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            request.callback(r.response)
        }
    }
    r.send()
}
// ajax 函数，用来发送 ajax 请求
var ajax = function(request) {
    /*
    var account = {
    'username': 'xiaogua',
    password: '123'
    }
    var data = JSON.stringify(account)
    var r = {
        method: 'POST',
        url: '/login',
        contentType:  'application/json',
        data: data,
        callback: function(response) {
            console.log('响应', response)
            var res = JSON.parse(response)
            if (res.success) {
                window.location.href = '/'
            } else {
                alert('登录失败')
            }
        }
    }
    ajax(r)
    */
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址, true 表示异步
    r.open(request.method, request.url, true)
    // 设置发送的数据的格式
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    } else {
        r.setRequestHeader('Content-Type', 'application/json')
    }
    // 注册响应函数
    r.onreadystatechange = function(event){
        if (r.readyState === 4) {
            request.callback(r.response)
        }
    }
    // 发送请求
    if (request.method == "GET") {
        r.send()
    } else if (request.method == "POST") {
        var data = JSON.stringify(request.data)
        r.send(request.data)
    }
}
var clearActive = function() {
    var activeButton = document.querySelector('.active')
    if (activeButton != null) {
        // 使用 classList 可以访问一个元素的所有 class
        // remove 可以删除一个 class
        activeButton.classList.remove("active")
    }
}
const imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}
// ====================================================================
//                          解释器相关
// ====================================================================
var apply = function(op, a, b) {
    // 实现 apply 函数
    // 参数如下
    // op 是 string 类型, 值是 '+' '-' '*' '/' 其中之一
    // a b 分别是 2 个数字
    // 根据 op 对 a b 运算并返回结果(加减乘除)
    if(op == '+') {
        return a + b
    }
    if(op == '-') {
        return a - b
    }
    if(op == '*') {
        return a * b
    }
    if(op == '/') {
        return a / b
    }
}
var applyList = function(op, oprands) {
    /*
    作业 9
    实现 applyList 函数
    op 是 '+' '-' '*' '/' 其中之一
    oprands 是一个只包含数字的 array
    根据 op 对 oprands 中的元素进行运算并返回结果
    例如, 下面的调用返回 -4
    var n = applyList('-', [3, 4, 2, 1])
    log(n)
    // 结果是 -4, 用第一个数字减去所有的数字
    */
    // log('start', op)
    var s = oprands[0]
    for (var i = 1; i < oprands.length; i++) {
        var n = oprands[i]
        s = apply(op, s, n)
    }
    return s
}
var str1 = function(n) {
    /*
    n 是 int
    返回这样规律的字符串, 特殊情况不考虑
    n       返回值
    1       '1'
    2       '121'
    3       '12321'
    */
    var resultLeft = ''
    var resultRight = ''
    for (var i = 1; i < n; i++) {
        resultLeft += i
        resultRight = i + resultRight
    }
    return resultLeft + n + resultRight
}
var str2 = function(n) {
    /*
    n 是 int
    返回这样规律的字符串, 特殊情况不考虑
    n       返回值
    1       'A'
    2       'ABA'
    3       'ABCBA'
    */
    var resultLeft = ''
    var resultRight = ''
    var alphabeta = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = 1; i < n; i++) {
        resultLeft += alphabeta[i - 1]
        resultRight = alphabeta[i - 1] + resultRight
    }
    return resultLeft + alphabeta[n - 1] + resultRight
}
// 加法口诀表
var addLine = function(n) {
    var s = ''
    for (var i = 0; i < n; i++) {
        var n1 = i + 1
        s += `${n} + ${n1} = ${n + n1}  `
    }
    return s
}
var addTable = function() {
    /*
    返回这样格式的加法口诀表(没写全, 但是要返回完整的)
    注意, 这只是我输入的内容
    实际上你普通 log 出来是不会有回车的
    [
        '1 + 1 = 2',
        '2 + 1 = 3  2 + 2 = 4',
        '3 + 1 = 4  3 + 2 = 5  3 + 3 = 6',
    ]
    */
    var r = []
    for (var i = 1; i < 10; i++) {
        var line = addLine(i)
        r.push(line)
    }
    return r
}
// ========================================================
//                          扫雷
// ========================================================
// 矩形相交
const rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}
// const range = (a, b, step=1) => {
//     var result = []
//     if (a < b) {
//         for (var i = a; i < b; i += step) {
//             result.push(i)
//         }
//     } else if (a > b) {
//         for (var i = a; i > b; i -= step) {
//             result.push(i)
//         }
//     }
//     return result
// }
var stepCondition = function(current, end, step) {
    if (step > 0) {
        return current < end
        // 上面一行会被很多人写出两种失败的写法
        // if (current < end) {
        //     return true
        // } else {
        //     return false
        // }
        // 另一种写法叫 三元表达式, 不要使用, 了解就好
        // return current < end ? true : false
    } else {
        return current > end
    }
}
var range3 = function(start, end, step=1) {
    /*
    start end step 都是数字
    和 range2 一样, 但是要求支持负数 step
    使用 while 循环
    返回一个 array
    假设 start=1, end=5, step=1 返回数据如下
    [1, 2, 3, 4]
    假设 start=6, end=0, step=-1 返回数据如下
    [6, 5, 4, 3, 2, 1]
    */
    var r = []
    var i = start
    while (stepCondition(i, end, step)) {
        r.push(i)
        i += step
    }
    return r
}
// 返回 start 到 end 之间的整数, 是双闭区间
const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
var random01 = function() {
    /*
    js 标准数学库有一个随机数函数
    Math.random()
    它返回 0 - 1 之间的小数
    用它实现本函数, 返回 0 或 1
    */
    var n = Math.random()
    // * 10, 现在就是 0 - 10 之间的小数了
    n *= 10
    // 取整, 这样就是 0 - 10 之间的整数了
    n = Math.floor(n)
    // 用余数来取得范围
    return n % 2
}
var randomLine01 = function(n) {
    /*
    返回一个只包含了 0 1 的随机 array, 长度为 n
    假设 n 为 5, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
    [0, 0, 1, 0, 1]
    */
    var result = []
    for (var i = 0; i < n; i++) {
        result.push(random01())
    }
    return result
}
var randomSquare01 = function(n) {
    /*
    返回以下格式的数据
    假设 n 为 3, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
    注意, 这只是一个 array, 并不是它显示的样子
    注意, 这是一个 array 不是 string
    [
        [0, 0, 1],
        [1, 0, 1],
        [0, 0, 0],
    ]
    返回, 包含了 n 个『只包含 n 个「随机 0 1」的 array』的 array
    */
    var result = []
    for (var i = 0; i < n; i++) {
        result.push(randomLine01(n))
    }
    return result
}
var randomLine09 = function(n) {
    /*
    返回一个只包含了 0 9 的随机 array, 长度为 n
    假设 n 为 5, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
    [0, 0, 9, 0, 9]
    */
    var value = Math.random()
    if (value > 0.5) {
        return 9
    } else {
        return 0
    }
}
var markedLine = function(array) {
    /*
    array 是一个只包含了 0 9 的 array
    返回一个标记过的 array
    ** 注意, 使用一个新数组来存储结果, 不要直接修改老数组
    复制数组用 array.slice(0) 实现
    标记规则如下
    对于下面这样的 array
    [0, 0, 9, 0, 9]
    标记后是这样
    [0, 1, 9, 2, 9]
    规则是, 0 会被设置为左右两边 9 的数量
    */
    var line = array.slice(0)
    for (var i = 0; i < line.length; i++) {
        var n = line[i]
        // 如果是 9, 左边 +1
        if (n == 9 && i > 0) {
            if(line[i-1] != 9) {
                line[i-1] += 1
            }
        }
        // 如果是 9, 右边 +1
        if (n == 9 && i < line.length) {
            if(line[i+1] != 9) {
                line[i+1] += 1
            }
        }
    }
    return line
}
var clonedSquare = function(array) {
    var s = []
    for (var i = 0; i < array.length; i++) {
        var line = array[i]
        s.push(line.slice(0))
    }
    return s
}
var plus1 = function(array, x, y) {
    var n = array.length
    if (x >= 0 && x < n && y >= 0 && y < n) {
        if (array[x][y] != 9) {
            array[x][y] += 1
        }
    }
}
var markAround = function(array, x, y) {
    /*
    ###
    #*#
    ###
    */
    if (array[x][y] == 9) {
        // 标记周围 8 个
        // 先标记左边 3 个
        plus1(array, x-1, y-1)
        plus1(array, x-1, y)
        plus1(array, x-1, y+1)
        // 标记上下 2 个
        plus1(array, x, y-1)
        plus1(array, x, y+1)
        // 标记右边 3 个
        plus1(array, x+1, y-1)
        plus1(array, x+1, y)
        plus1(array, x+1, y+1)
    }
}
var markedSquare = function(array) {
    /*
    array 是一个「包含了『只包含了 0 9 的 array』的 array」
    返回一个标记过的 array
    ** 注意, 使用一个新数组来存储结果, 不要直接修改老数组
    范例如下, 这是 array
    [
        [0, 9, 0, 0],
        [0, 0, 9, 0],
        [9, 0, 9, 0],
        [0, 9, 0, 0],
    ]
    这是标记后的结果
    [
        [1, 9, 2, 1],
        [2, 4, 9, 2],
        [9, 4, 9, 2],
        [2, 9, 2, 1],
    ]
    规则是, 0 会被设置为四周 8 个元素中 9 的数量
    */
    var square = clonedSquare(array)
    for (var i = 0; i < square.length; i++) {
        var line = square[i]
        for (var j = 0; j < line.length; j++) {
            markAround(square, i, j)
        }
    }
    return square
}
var test_markedSquare = function(){
    var s = [
        [0, 9, 0, 0],
        [0, 0, 9, 0],
        [9, 0, 9, 0],
        [0, 9, 0, 0],
    ]
    var s1 = markedSquare(s)
    log(s1)
}
