class NotInWordError extends Error {
    name = "NotInWordError"
}

export default class Word {
    constructor(word) {
        this.raw = word
        this.ASCII = this.getASCII(word).toLowerCase()
        this.length = this.raw.length
        this.masked = [...this.raw].map(() => "·").join("")
    }

    pushLetter(letterToPush) {
        letterToPush = letterToPush.toLowerCase()

        if (this.ASCII.indexOf(letterToPush) === -1) {
            throw new NotInWordError()
        }

        this.masked = [...this.ASCII]
            .map((l, idx) =>
                l === letterToPush ? this.raw[idx] : this.masked[idx]
            )
            .join("")
    }

    getASCII(word) {
        let NFD = Array.prototype.map.call(word, l => l.normalize("NFD")[0])
        return NFD.join("")
    }

    getMasked() {
        return this.masked
    }

    toString() {
        return this.raw
    }
}
