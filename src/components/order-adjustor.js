import { LitElement, html, css} from "lit";

/**
 * @typedef invoice
 * @type {Object}
 * @property {number} cases
 * @property {number} bottles
 */


/**
 * OrderAdjustor - Component to manage quantity of order in cart
 * 
 * @property {string} bottlesTitle - translation for bottles heading
 * @property {string} casesTitle - translation for cases heading
 * @property {number} bottlePrice - product's cost per bottle
 * @property {number} casePrice - product's cost per case
 * @property {string} deleteProductText - remove product label
 * @property {number} bottleAmount - amount of bottles
 * @property {number} caseAmount - amount of cases
 */

export class OrderAdjustor extends LitElement{

    static properties = {
        bottlesTitle: {type: String},
        casesTitle: {type: String},
        bottlePrice: {type: Number},
        casePrice: {type: Number},
        deleteProductText: {type: String},
        invoice: {type: Object}
    }

    constructor(){
        super()
        this.bottlesTitle = 'Bottles:',
        this.casesTitle = 'Cases:',
        this.bottlePrice = 0,
        this.casePrice = 0,
        this.deleteProductText = 'Delete',
        this.invoice = {'bottles' : 1, 'cases': 0}
    }

    static styles = css`
        .container{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-family: var(--Poppins);
            text-transform: uppercase;
        }

        .amounts{
            display: flex;
            align-items: center;
        }

        .amounts p{
            margin-right: 0.5em;
        }

        button{
            background: none;
            border: none;
            font-family: inherit;
            color: red;
            text-decoration: underline;
            text-transform: uppercase;
            
        }

        select{
            font-size: 1.1em;
            font-family: inherit;
            font-weight: 400;
            text-align: center;
        }
    `

    /**
     * @param {{value: number}} total 
     * @param {string} type
     */
    order = (total, type) => {
        this.invoice = {...this.invoice, [type]: +total.value}

        console.log(this.invoice)

        this.dispatchEvent(new CustomEvent('order-selection', {
            detail: this.invoice,
            composed: true,
            bubbles: true,
        }))
    }

    

    /**
     * 
     * @param {string} packaging 
     * @param {function} cb 
     * @return {import("lit").TemplateResult}
     */
    amountSelectionHandler = (packaging, cb) => {
        const amountArr = [...Array(10).keys()]

        return html`
            <select @change=${(/** @type {Event} */ e) => cb(e.target, packaging)}>
                ${amountArr.map(val => {
                    return html`
                            <option value=${val} ?selected=${(packaging === 'bottles' && val === 1 || packaging === 'cases' && val === 0)}>${val}</option>
                    `
                    })}
                }
                <option value=${10} class='ten-plus'>10+<option>
                
            <select>
        `
    }

   


    render(){
        return html`
            <div class='container'>
                <div class='amounts'>
                    <p>${this.bottlesTitle}</p>
                    ${this.amountSelectionHandler('bottles', this.order)}
                </div>
                <div class='amounts'>
                    <p>${this.casesTitle}</p>
                    ${this.amountSelectionHandler('cases', this.order)}
                </div>
                <button @click=${this.removeProduct}>${this.deleteProductText}</button>
            </div>
        `
    }

    
    removeProduct = () => {
        this.dispatchEvent(new Event('remove-product', {
            bubbles: true,
            composed: true
        }))
    }
}

customElements.define('order-adjustor', OrderAdjustor)