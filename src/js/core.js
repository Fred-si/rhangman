import Word from "./word.js"
import WORDS from "./word_list.js"

const MAX_BAD_LETTER = 9

class EndGameError extends Error {
    name = "EndGameError"
}

export default class HangmanCore {
    constructor() {
        this.newGame()
    }

    newGame() {
        this.badLetterRemaining = MAX_BAD_LETTER
        this.word = new Word(getRandomItem(WORDS))
    }

    processLetter(letter) {
        try {
            this.word.pushLetter(letter)
        } catch (err) {
            if (err.name !== "NotInWordError") {
                throw err
            }

            this.badLetter(letter)
        }

        this.goodLetter(letter)
    }

    goodLetter() {
        if (this.word.masked === this.word.raw) {
            this.endGame("win")
        }
    }

    badLetter() {
        if (!this.badLetterRemaining) {
            this.endGame("loose")
        }

        this.badLetterRemaining--
    }

    endGame(status) {
        throw new EndGameError(status)
    }
}

function getRandomItem(items) {
    let word = items[Math.floor(Math.random() * items.length)]
    return word
}
