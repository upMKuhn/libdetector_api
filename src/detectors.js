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
const { JSDOM, VirtualConsole } = require('jsdom')
const { UNKNOWN_VERSION, LibraryDetectorTests } = require('./libraries')

module.exports = class LibraryDetector {
    /**
     * @type {JSDOM}
     */
    dom = null
    constructor(scriptText) {
        const testScript = ``
        let scripts = scriptText
            .split(/\/\/\s*\<\-*\s*SPLIT\s*\-*\>/gi);
        scripts.push(testScript);
        scripts = scripts
        //.map((text, i)=> `console.log("executing script", ${i}, window.goog);\n` + text + `\nconsole.log("done script", ${i});`)
        .map((text) => `<script>${text}</script>`)
        this.dom = new JSDOM(`<head>${scripts.join('\n\n')}</head><body><div></div></body>`, {
            runScripts: 'dangerously',
        })
    }

    detect() {
        const detectedLibs = []
        this.setGlobalConsts()
        for (let libraryName of Object.keys(LibraryDetectorTests)) {
            try {
                const library = LibraryDetectorTests[libraryName]
                const result = library.test(this.dom.window)
                if (result) {
                    detectedLibs.push({ ...result, name: libraryName })
                }
            } catch (e) {
                console.error('Detector error', e)
            }
        }
        return detectedLibs
    }

    setGlobalConsts() {
        global.NodeFilter = {
            FILTER_ACCEPT: 1,
            FILTER_REJECT: 2,
            FILTER_SKIP: 3,
            SHOW_ALL: 4294967295,
            SHOW_ELEMENT: 1,
            SHOW_ATTRIBUTE: 2,
            SHOW_TEXT: 4,
            SHOW_CDATA_SECTION: 8,
            SHOW_ENTITY_REFERENCE: 16,
            SHOW_ENTITY: 32,
            SHOW_PROCESSING_INSTRUCTION: 64,
            SHOW_COMMENT: 128,
            SHOW_DOCUMENT: 256,
            SHOW_DOCUMENT_TYPE: 512,
            SHOW_DOCUMENT_FRAGMENT: 1024,
            SHOW_NOTATION: 2048,
        }
    }
}
