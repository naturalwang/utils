// 定义我们的 log 函数

const log = console.log.bind(console)

// 定义我们用于测试的函数
// ensure 接受两个参数
// condition 是 bool, 如果为 false, 则输出 message
// 否则, 不做任何处理
const ensure = (condition, message) => {
    // 在条件不成立的时候, 输出 message
    if (!condition) {
        log('*** 测试失败:', message)
    } else {
        log('+++ 测试成功')
    }
}

let parsedList = (tokens) => {
    let array = []
    //
    let objectMode = []
    let objectStore = []
    let arrayMode = []
    let arrayStore = []
    //
    for (let token of tokens) {
        if (':,'.includes(token)) {
            continue
        }
        // 处理 object 的情况
        if (token == '{') {
            // 用来处理多层 obj 嵌套的情况
            objectMode.push(1)
            objectStore.push(token)
            continue
        } else if (objectMode.length === 1 && token == '}') {
            objectMode.pop()
            objectStore.push(token)
            let dict = parsedDict(objectStore.slice(1, objectStore.length - 1))
            array.push(dict)
            continue
        } else if (objectMode.length > 1 && token == '}') {
            objectMode.pop()
            objectStore.push(token)
            continue
        } else if (objectMode.length > 0) {
            objectStore.push(token)
            continue
        }

        // 处理 array 的情况
        if (token == '[') {
            // 用来处理多层 obj 嵌套的情况
            arrayMode.push(1)
            arrayStore.push(token)
            continue
        } else if (arrayMode.length === 1 && token == ']') {
            arrayMode.pop()
            arrayStore.push(token)
            let list = parsedList(arrayStore.slice(1, arrayStore.length - 1))
            array.push(list)
            continue
        } else if (arrayMode.length > 1 && token == ']') {
            arrayMode.pop()
            arrayStore.push(token)
            continue
        } else if (arrayMode.length > 0) {
            arrayStore.push(token)
            continue
        }

        // 处理一般情况: string, number, date 等
        array.push(token)
    }
    return array
}

let parsedDict = (tokens) => {
    let obj = []
    //
    let objectMode = []
    let objectStore = []
    let arrayMode = []
    let arrayStore = []
    //
    let pair = []
    //
    for (let token of tokens) {
        if (':,'.includes(token)) {
            continue
        }
        // 处理 object 的情况
        if (token == '{') {
            // 用来处理多层 obj 嵌套的情况
            objectMode.push(1)
            objectStore.push(token)
            continue
        } else if (objectMode.length === 1 && token == '}') {
            objectMode.pop()
            objectStore.push(token)
            let dict = parsedDict(objectStore.slice(1, objectStore.length - 1))
            array.push(dict)
            continue
        } else if (objectMode.length > 1 && token == '}') {
            objectMode.pop()
            objectStore.push(token)
            continue
        } else if (objectMode.length > 0) {
            objectStore.push(token)
            continue
        }

        // 处理 array 的情况
        if (token == '[') {
            // 用来处理多层 obj 嵌套的情况
            arrayMode.push(1)
            arrayStore.push(token)
            continue
        } else if (arrayMode.length === 1 && token == ']') {
            arrayMode.pop()
            arrayStore.push(token)
            let list = parsedList(arrayStore.slice(1, arrayStore.length - 1))
            obj[pair.pop()] = list
            continue
        } else if (arrayMode.length > 1 && token == ']') {
            arrayMode.pop()
            obj[pair.pop()] = token
            continue
        } else if (arrayMode.length > 0) {
            arrayStore.push(token)
            continue
        }

        // 处理一般情况: string, number, date 等
        if (pair.length == 1) {
            obj[pair.pop()] = token
        } else {
            pair.push(token)
        }
    }
    return obj
}


// 3 补全函数
const parsedJson = (tokens) => {
    // tokens 是一个包含 JSON tokens 的数组
    // 解析 tokens, 返回解析后的 object 或者数组
    // 不需要考虑数组嵌套数组和字典嵌套字典的情况

    // 提示
    // 1. 如果第一个元素是 '{', 那么对余下的元素按照 object 处理
    // 2. 如果第一个元素是 '[', 那么对余下的元素按照 array 处理

    let firstChar = tokens[0]
    if (firstChar == '[') {
        return parsedList(tokens.slice(1, tokens.length - 1))
    } else if (firstChar == '{') {
        return parsedDict(tokens.slice(1, tokens.length - 1))
    } else {
        // 不处理
        return null
    }

}

const testParsedJson = () => {
    let tokens1 = ['{', 'name', ':', 'gua', ',', 'height', ':', 169, '}']
    let json1 = parsedJson(tokens1)
    log('debug json1', json1)
    let expected1 = json1.name === 'gua' && json1.height === 169
    ensure(expected1, 'test parsed json 1')

    let tokens2 = ['[', 'hhvb', ',', 'shhl', ']']
    let json2 = parsedJson(tokens2)
    log('debug json2', json2)
    let expected2 = json2.includes('hhvb') && json2.includes('shhl')
    ensure(expected2, 'test parsed json 2')

    let tokens3 = ['{', 'name', ':', 'gua', ',', 'location', ':', '[', 'hhvb', ',', 'shhl', ']', '}']
    let json3 = parsedJson(tokens3)
    log('debug json3', json3)
    let expected3 = json3.name === 'gua' && json3.location.includes('hhvb')
    ensure(expected3, 'test parsed json 3')
}

testParsedJson()
