import { render, cleanup, fireEvent } from "@testing-library/react"
import React from "react"

import VirtualKeyboard from "../../VirtualKeyboard"

let keyboard
const mock = jest.fn()

beforeEach(() => {
    mock.mockReset()
    keyboard = render(<VirtualKeyboard onClick={mock} />)
})

afterEach(() => {
    cleanup()
})
it("should contain class virtualKeyboard", () => {
    expect(keyboard.container.querySelector("div.virtualKeyboard")).toBeTruthy()
})

it("should contain 26 keys", () => {
    expect(keyboard.container.querySelectorAll("button.key")).toHaveLength(26)
})

it("should call callback once when button is clicked", () => {
    let buttons = keyboard.getAllByRole(/button/)
    fireEvent.click(buttons[0])

    expect(mock).toHaveBeenCalledTimes(1)
})

test.each(["A", "B", "Z"])("click on %s", input => {
    let btn = keyboard.getByText(input)
    fireEvent.click(btn)
    expect(mock).toHaveBeenCalledWith(input)
})
