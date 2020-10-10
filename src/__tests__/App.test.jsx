import React from "react"
import { render } from "@testing-library/react"

import App from "../App"

let app

beforeEach(() => {
    app = render(<App />)
})

it("should create h1", () => {
    const { getByText, getByRole } = app

    expect(getByRole("heading")).toBeInTheDocument()
    expect(getByText("Le jeu du pendu")).toBeInTheDocument()
})

it("should create virtual keyboard", () => {
    const { container } = app
    expect(container.querySelector(".virtualKeyboard")).toBeTruthy()
})
