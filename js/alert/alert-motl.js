const log = console.log.bind(console)

const EventType = {
    show: 'show',
    close: 'close',
}

class Dialog {
    constructor(title, body, cancelText, okText) {
        this.title = title || '温馨提示'
        this.body = body || ''
        this.cancelText = cancelText || '取消'
        this.okText = okText || '确定'
        //
        this.id = `dialog-${Date.now()}`
        this.active = true
        this.activeClass = 'alert-active'
        this.eventStorage = {}
        this.setupInputs()
    }
    setupInputs() {
        let self = this
        let html = `
        <div id="${self.id}" class="${self.activeClass}">
            <div class="gua-alert gua-absolute-center gua-flex-center">
                <div class="gua-alert-title">${self.title}</div>
                <div class="gua-alert-body">${self.body}</div>
                <div class="gua-alert-footer">
                    <button class="gua-button alert-cancel">${self.cancelText}</button>
                    <button class="gua-button alert-ok">${self.okText}</button>
                </div>
            </div>
            <div class="gua-mask"></div>
        </div>
        `
        let css = `
            <style>
                #${self.id} {
                    display: none;
                }
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
                .gua-alert-title {
                    position: relative;
                    top: -34px;
                    font-size: 26px;
                }
                .gua-alert-footer {
                    position: relative;
                    bottom: -34px;
                }

                .alert-active {
                    display: block !important;
                }
            </style>
        `
        // add html and css
        let head = document.querySelector('head')
        let body = document.querySelector('body')
        head.insertAdjacentHTML('beforeend', css);
        body.insertAdjacentHTML('afterbegin', html);
    }
    _hasEvent(eventName) {
        let self = this
        let eventValue = self.eventStorage[eventName] || null
        return eventValue != null
    }
    _trigger(eventName) {
        if (this._hasEvent(eventName)) {
            this.eventStorage[eventName]()
        }
    }
    _addClass(className) {
        let alert = document.querySelector(`#${this.id}`)
        alert.classList.add(className)
    }
    _removeClass(className) {
        let alert = document.querySelector(`#${this.id}`)
        alert.classList.remove(className)
    }
    on(eventName, callback) {
        let self = this
        if (!self._hasEvent(eventName)) {
            self.eventStorage[eventName] = callback
        }
    }
    off(eventName) {
        let self = this
        if (self._hasEvent(eventName)) {
            self.eventStorage[eventName] = null
        }
    }
    show() {
        this._addClass('alert-active')
        this._trigger(EventType.show)
    }
    close() {
        this._removeClass('alert-active')
        this._trigger(EventType.close)
    }
}

const __main = () => {
    let dialog = new Dialog()
    dialog.on(EventType.show, () => {
        log('show dialog!')
    })

    dialog.on(EventType.close, () => {
        log('close dialog!')
    })

    dialog.show()

    setTimeout(() => {
        dialog.close()
    }, 5000)
}

__main()

