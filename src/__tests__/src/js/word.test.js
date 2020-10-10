import Word, { NotInWordError } from "../../../js/word.js"

let word

beforeAll(() => {
    word = new Word("Téléphone")
})

it("should correctly store word", () => {
    expect(word.raw).toBe("Téléphone")
})

it("should correctly remove accents", () => {
    expect(word.ASCII).toBe("telephone")
})

it("should have correct length", () => {
    expect(word.length).toBe(9)
})

it("should return word.raw", () => {
    expect(word + "").toBe(word.raw)
})

it("should return a string that contain only upper dots", () => {
    expect(word.masked).toMatch(/^·+$/)
})
it("should throw an Error", () => {
    expect(() => word.pushLetter("z")).toThrow(NotInWordError)
    expect(word.masked).toMatch(/^·+$/)
})

it("should find letters that is in word", () => {
    expect(() => word.pushLetter("e")).not.toThrow(NotInWordError)
    expect(word.masked).toBe("·é·é····e")

    expect(() => word.pushLetter("t")).not.toThrow(NotInWordError)
    expect(word.masked).toEqual("Té·é····e")
})
