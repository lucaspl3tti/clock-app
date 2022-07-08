/**
 * This is a demo js plugin
 */
export default class demoPlugin {
    constructor(el) {
        this.el = document.querySelector(el)

        console.log(this.el)
    }
}
