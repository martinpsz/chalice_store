//ts-check
import { LitElement, html, css } from "lit";
import '../components/amount-selector'

/**
 * Product View structures how the product image and name are represented.
 */
export class ProductView extends LitElement{
    static styles = css`
        :host{
            display: inline-grid;
            grid-template-columns: 60px 1fr;
            grid-template-rows: auto;
            grid-template-areas: 'img name'
                                 'img amounts';
            align-items: center;
            font-family: var(--Poppins);
        }

        img{
            grid-area: img;
            max-height: 120px;
            justify-self: center;
        }

        #product-name{
            grid-area: name;
            margin: 0;
            font-weight: 200;
            font-size: 1.25em;
        }

        #product-amount{
            grid-area: amounts;
            display: flex;
        }

        #product-amount fieldset{
            border: 1px solid rgba(112, 128, 144, 0.5);
            border-radius: 0.4em;
        }

        #product-amount fieldset:nth-of-type(1){
            margin-right: 1.5em;
        }

        #product-amount > fieldset legend{
            margin: 0 auto;
            text-transform: uppercase;
            font-size: 0.8em;
        }

    
    `

    /**
     * @property {string} imgSrc - location of file in project directory
     * @property {string} productName - name of product being rendered. 
     */
    static properties = {
        imgSrc : {type: String},
        productName: {type: String}
    }

    render(){
        return html`
            <p id='product-name'>${this.productName}</p>
            <img src=${this.imgSrc} alt=${this.productName} />
            <div id='product-amount'>
                <fieldset>
                    <legend>Bottles:</legend>
                    <amount-selector>
                </fieldset>
                
                <fieldset>
                    <legend>Cases:</legend>
                    <amount-selector>
                </fieldset>
            </div>
        `
    }
}

customElements.define('product-view', ProductView)