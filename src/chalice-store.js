// @ts-check
import { LitElement, html, css } from "lit";
import './components/input-field'

export class ChaliceStore extends LitElement{
    render(){
        return html`
            <input-field fieldLabel='Email' inputType='email' ></input-field>
        `
    }
}

customElements.define('chalice-store', ChaliceStore)
