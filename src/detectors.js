module.exports = () => {
    window.detectedLibs = []
    for (const libraryName in Object.keys(window.LibraryDetectorTests)) {
        try {
            const library = window.LibraryDetectorTests[libraryName]
            const result = library.test()
            if (result) {
                window.detectedLibraries.append({ ...result, name: libraryName })
            }
        } catch (e) {
            console.error(e)
        }
    }
}
const { JSDOM } = require('jsdom')
const { UNKNOWN_VERSION, LibraryDetectorTests } = require('./libraries')

module.exports = class LibraryDetector {
    dom = null
    constructor(scripts) {
        this.dom = new JSDOM(`<body><script>${scripts}</script></body>`, { runScripts: 'dangerously' })
    }

    detect() {
        const detectedLibs = []
        for (let libraryName of Object.keys(LibraryDetectorTests)) {
            try {
                const library = LibraryDetectorTests[libraryName]
                const result = library.test(this.dom.window)
                if (result) {
                    detectedLibs.push({ ...result, name: libraryName })
                }
            } catch (e) {
                console.error(e)
            }
        }
        return detectedLibs;
    }
}
