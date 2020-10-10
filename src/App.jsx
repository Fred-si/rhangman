import React from "react"
import "./App.css"

import VirtualKeyboard from "./VirtualKeyboard"

export default class App extends React.Component {
    onKeyClicked(letter) {
        return null
    }

    render() {
        return (
            <React.Fragment>
                <h1>Le jeu du pendu</h1>
                <div className="App">
                    <VirtualKeyboard onClick={this.onKeyClicked.bind(this)} />
                </div>
            </React.Fragment>
        )
    }
}
