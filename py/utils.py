# 进制转化
def base10toN(num, base):
  return ((num == 0) and  "0" ) or ( base10toN(num // base, base).lstrip("0") + "0123456789abcdefghijklmnopqrstuvwxyz"[num % base])


# python2 log
import time
def log(*args, **kwargs):
    time_format = '%Y/%m/%d %H:%M:%S'
    value = time.localtime(int(time.time()))
    dt = time.strftime(time_format, value)
    with open('/tmp/log/log.txt', 'a') as f:
        print >> f, 'log debug ***', dt, args, kwargs


# 打印类的继承顺序
def print_mro(cls):
     print(', '.join(c.__name__ for c in cls.__mro__))

# python3 log
import time
# 用 log 函数把所有输出写入到文件，这样就能很方便地掌控全局了
# 即便你关掉程序，也能再次打开来查看，这就是个时光机
def log(*args, **kwargs):
    format = '%Y/%m/%d %H:%M:%S'
    value = time.localtime(int(time.time()))
    dt = time.strftime(format, value)
    # 中文 windows 平台默认打开的文件编码是 gbk 所以需要指定一下
    with open('log.gua.txt', 'a', encoding='utf-8') as f:
        # 通过 file 参数可以把输出写入到文件 f 中
        # 需要注意的是 **kwargs 必须是最后一个参数
        print(dt, *args, file=f, **kwargs)


def range_list(list):
    return range(len(list)


def is_even(num):
    return num % 2 == 0


def not_empty(element):
    if isinstance(element, (list, str, dict)):
        return len(element) != 0
    elif isinstance(element, int):
        return element != 0
    elif isinstance(element, None):
        return False
    else:
        print('unknown type', type(element))


def is_empty(element):
    if isinstance(element, (list, str, dict)):
        return len(element) == 0
    elif isinstance(element, int):
        return element == 0
    elif isinstance(element, None):
        return True
    else:
        print('unknown type', type(element))


def trim_space(s):
    result = ''
    for char in s:
        if char != ' ':
            result += char
    return result


def dict_equal(d1, d2):
    if len(d1.keys()) != len(d2.keys()):
        return False
    diff_keys = [k for k in d1 if d1[k] != d2[k]]
    return len(diff_keys) == 0
