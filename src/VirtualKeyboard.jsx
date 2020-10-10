import React, { useState } from "react"

export default function VirtualKeyboard({ onClick }) {
    const letters = [...Array(26).keys()].map(idx =>
        String.fromCharCode(idx + 65)
    )

    return (
        <div className="virtualKeyboard">
            {letters.map(l => (
                <Key
                    key={"button-" + l}
                    letter={l}
                    onClick={letter => onClick(letter)}
                />
            ))}
        </div>
    )
}

function Key({ letter, onClick }) {
    const [state, setState] = useState("enabled")

    return (
        <button
            className={"key " + state}
            onClick={() => {
                setState("disabled")
                onClick(letter)
            }}
        >
            {letter}
        </button>
    )
}
