const __NSU = (w => {
    if (Object.keys(w).length <= 0) {
        log('Window object not found.')

        return
    }

    function error (item) {
        console.log(`%c${item}`, `
            background: red;
            border-radius: .25em;
            color: white;
            font-style: italic;
            font-weight: bold;
            padding: .2em .5em;
        `)
    }

    function log (item) {
        console.log(`%c${item}`, `
            background: white;
            border-radius: .25em;
            color: black;
            font-weight: bold;
            padding: .2em .5em;
        `)
    }

    function warn (item) {
        console.log(`%c${item}`, `
            background: yellow;
            border-radius: .25em;
            color: black;
            padding: .2em .5em;
        `)
    }

    function viewport () {
        function start (timer) {
            const el = document.createElement('div')
            let theViewport = {}
            let elWidth = 0

            el.style.cssText = `
            display: none;
            width: 1em;
        `
            document.body.appendChild(el)

            __NSU.resize = () => {
                elWidth = Number.parseFloat(w.getComputedStyle(el).width)

                theViewport = {
                    px: {
                        width: w.innerWidth,
                        height: w.innerHeight
                    },
                    em: {
                        width: w.innerWidth / elWidth,
                        height: w.innerHeight / elWidth
                    },
                    '1em (in px)': elWidth,
                    ratio: w.innerWidth / w.innerHeight,
                    'Pixel ratio': w.devicePixelRatio
                }

                log(`Viewport info:`)
                console.dir(theViewport)
            }

            w.addEventListener('resize', __NSU.resize)

            if (Number.isInteger(timer) || timer.match(/s$/)) {
                __NSU.resizeTimer = setTimeout(() => {
                    clearTimeout(__NSU.resizeTimer)

                    w.removeEventListener('resize', __NSU.resize)
                }, (Number.isInteger(timer) ? timer : timer.match(/ms$/) ? parseInt(timer) : parseInt(timer) * 1000))
            }

            __NSU.resize()
        }

        function stop () {
            w.removeEventListener('resize', __NSU.resize)
        }

        return {
            start,
            stop
        }
    }

    return {
        viewport,
        error,
        log,
        warn,
    }
})(typeof window !== 'undefined' ? window : {})
