import { LitElement, html, css } from "lit";


/**
 * @typedef {'tel' | 'email' | 'text'}  InputFieldType 
*/

/**
 * Input Field - Holds values for various inputs from the form
 * 
 * @property {string} fieldLabel
 * @property {InputFieldType} inputType
 *
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

    constructor(){
        super()

        this.fieldLabel = ''
        this.inputType = 'text'
    }
    
    render(){
        return html`
            <label>${this.fieldLabel} <input type=${this.inputType.toLowerCase()} @input=${(/** @type {InputEvent} */ e) => this._inputtedTextHandler(e)}/></label>
        `
    }

    /**
     * @argument {Event} e - The input event on the field
     * @returns {void}
     */
    _inputtedTextHandler = (e) => {
        const target = e.target 
        if (target instanceof HTMLInputElement){
            this.dispatchEvent(new CustomEvent('get_input', {
                detail: target.value,
                bubbles: true,
                composed: true
            }))
        }
    }
}

customElements.define('input-field', InputField)