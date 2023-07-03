//ts-check
import { LitElement, html, css } from "lit";

/**
 * Amount Selector - component controls addition and removal of items from cart.
 */
export class AmountSelector extends LitElement{
    static styles = css`
        :host{
            display: flex;
            align-items: center;
        }

        span{
            font-family: var(--Poppins);
            margin: 0 0.5em;
            font-size: 1.5em;
            font-weight: 200;
        }
    
    `

    /**
     * Current count
     * @type {number}
     */
    static properties = {
        count: {type: Number}
    }

    constructor(){
        super()
        this.count = 0;
    }

    render(){
        return html`
                <iconify-icon id='minus' align icon="ei:minus" style="font-size: 24px;" @click=${this._decrement}></iconify-icon>
                <span>${this.count}</span>
                <iconify-icon align icon="ei:plus" style="font-size: 24px;" @click=${this._increment}></iconify-icon>
        `
    }

    /**
     * Returns the current this.count - 1 if this.count > 0
     * @returns {count}
     */
    _decrement = () => {
        this.count = this.count > 0 ? this.count - 1 : this.count = 0;

        this.dispatchEvent(new CustomEvent('productCount', {
            detail: this.count,
            bubbles: true,
            composed: true,
        }))
    }

    /**
     * Returns the current this.count + 1
     * @returns {count}
     */
    _increment = () => {
        this.count = this.count + 1;

        this.dispatchEvent(new CustomEvent('productCount', {
            detail: this.count,
            bubbles: true,
            composed: true,
        }))
    }
}

customElements.define('amount-selector', AmountSelector)