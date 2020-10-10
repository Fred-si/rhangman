import React from "react"
import { cleanup, render } from "@testing-library/react"

import App from "../App"

let app

beforeEach(() => {
    app = render(<App />)
})

afterEach(() => {
    cleanup()
})

it("should create h1", () => {
    const { getByText, getByRole } = app

    expect(getByRole("heading")).toBeInTheDocument()
    expect(getByText("Le jeu du pendu")).toBeInTheDocument()
})

it("should create virtual keyboard", () => {
    expect(app.container.querySelector(".virtualKeyboard")).toBeTruthy()
})

it("should create masked word", () => {
    expect(app.getByText(/^·+$/)).toBeTruthy()
})

it("should create button with class newWord", () => {
    expect(app.container.querySelector("button.newWord")).toBeTruthy()
})
