//ts-check
import { LitElement, html, css } from "lit";

/**
 * Input Field: handles collection of individual form inputs
 */
export class InputField extends LitElement{
    static styles = css`
        label{
            display: inline-flex;
            flex-direction: column;
            font-family: var(--Poppins);
            font-size: 0.8em;
            text-transform: uppercase;
        }

        input{
            border: 1px solid rgba(112, 128, 144, 0.5);
            border-radius: 0.25em;
            padding: 0.25em;
        }   
    `

    /**
     * @typedef {'tel' | 'email' | 'text'}  InputFieldType
     */

     /** 
     * @property {string} fieldLabel - The field label for the input field
     * @property {InputFieldType} inputType - Type of input field
     */
    static properties = {
        fieldLabel: {type: String},
        inputType: {type: 'tel' | 'email' | 'text'}
    }
    
    render(){
        return html`
            <label>${this.fieldLabel} <input type=${this.inputType} @input=${e => this._inputtedTextHandler(e)}/></label>
        `
    }

    /**
     * @argument {e} - The input event on the field
     * @returns {void}
     */
    _inputtedTextHandler = (e) => {
        this.dispatchEvent(new CustomEvent('get_input', {
            detail: e.target.value,
            bubbles: true,
            composed: true
        }))
    }
}

customElements.define('input-field', InputField)