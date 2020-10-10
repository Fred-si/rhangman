import React from "react"
import "../App.scss"

import VirtualKeyboard from "./VirtualKeyboard"

export default class App extends React.Component {
    state = {
        maskedWord: "······",
    }

    onKeyClicked(letter) {
        return null
    }

    newWord() {
        return null
    }

    render() {
        return (
            <React.Fragment>
                <h1>Le jeu du pendu</h1>
                <div id="App">
                    <button
                        className="newWord"
                        onClick={this.newWord.bind(this)}
                    >
                        Nouveau mot
                    </button>
                    <p className="maskedWord">{this.state.maskedWord}</p>
                    <VirtualKeyboard onClick={this.onKeyClicked.bind(this)} />
                </div>
            </React.Fragment>
        )
    }
}
