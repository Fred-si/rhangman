import HangmanCore from "../../../js/core.js"
import Word from "../../../js/word.js"

jest.mock("../../../js/word_list.js")

let mock = jest.fn()
let hangman_core

beforeEach(() => {
    mock.mockReset()
    hangman_core = new HangmanCore()
})

describe("newGame()", () => {
    beforeEach(() => {
        hangman_core.newGame()
    })

    it("should remain 9 lives after newGame() was called", () => {
        expect(hangman_core.badLetterRemaining).toBe(9)
    })

    it("should create Word instance", () => {
        expect(hangman_core.word).toMatchObject(new Word("télé"))
    })
})

describe("processLetter()", () => {
    beforeEach(() => {
        mock.mockReset()
        hangman_core = new HangmanCore()
    })

    it("should no catch TypeError", () => {
        hangman_core.word.pushLetter = mock
        mock.mockImplementationOnce(() => {
            throw new TypeError()
        })

        expect(() => hangman_core.processLetter()).toThrow(TypeError)
    })

    it("should  call badLetter method", () => {
        hangman_core.badLetter = mock
        hangman_core.processLetter("z")

        expect(mock).toHaveBeenCalledWith("z")
    })

    it("should call goodLetter method", () => {
        hangman_core.goodLetter = mock
        hangman_core.processLetter("t")

        expect(mock).toHaveBeenCalledWith("t")
    })
})

describe("Test goodLetter()", () => {
    beforeEach(() => {
        hangman_core.newGame()

        hangman_core.endGame = jest.fn()
    })

    it("should not call endGame method", () => {
        hangman_core.goodLetter()
        expect(hangman_core.endGame).not.toHaveBeenCalled()
    })

    test("should call endGame method", () => {
        hangman_core.word.masked = hangman_core.word.raw
        hangman_core.goodLetter()
        expect(hangman_core.endGame).toHaveBeenCalledWith("win")
    })
})

describe("Test badLetter()", () => {
    beforeAll(() => {})

    beforeEach(() => {
        mock.mockReset()

        hangman_core.newGame()
        hangman_core.endGame = mock
    })

    it("should decrease lives counter", () => {
        hangman_core.badLetterRemaining = 9
        hangman_core.badLetter()

        expect(hangman_core.badLetterRemaining).toBe(8)
        expect(hangman_core.endGame).not.toHaveBeenCalled()
    })

    it("should call endGame method when bad letters counter is falsy", () => {
        hangman_core.badLetterRemaining = 0
        hangman_core.badLetter()

        expect(hangman_core.endGame).toHaveBeenCalledWith("loose")
    })
})

describe("Test endGame()", () => {
    beforeEach(() => {
        hangman_core.newGame()
    })

    test("should throw EndGameError with status win", () => {
        expect(() => hangman_core.endGame("win")).toThrowError(/win/)
    })

    test("should throw EndGameError with status loose", () => {
        expect(() => hangman_core.endGame("loose")).toThrowError(/loose/)
    })
})
