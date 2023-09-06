//ts-check
import { LitElement, html, css } from "lit";
import '../components/order-adjustor'

/**
 * Product View structures how the product image and name are represented.
 * @property {string} imgSrc - location of file in project directory
 * @property {number} productId - id of the product
 * @property {string} productName - name of product being rendered.
 * @property {number} bottlePrice - cost of one bottle 
 * @property {number} casePrice - cost of one case 
 */

export class ProductView extends LitElement{
    static styles = css`
        #product{
            display: inline-grid;
            grid-template-columns: 20% 80%;
            grid-template-rows: auto;
            grid-template-areas: 'img meta'
                                 'img estimate';
            align-items: center;
            font-family: var(--Poppins);
            margin-bottom: 1em;
            max-width: 480px;
            border-bottom: 1px solid rgba(112, 128, 144, 0.25);
            
        }

        img{
            grid-area: img;
            width: 100%;
            justify-self: center;
            margin: 0 0.5em;
        }

        #product-meta{
            grid-area: meta;
            margin-right: 1em;
        }

        #product-name{
            margin: 0;
            font-weight: 200;
            font-size: 1.25em;
            font-weight: 500;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-x: hidden;
        }
        
        #estimate{
            margin: 0;
            grid-area: estimate;
            font-weight: 300;
            justify-self: end;
            margin-right: 1em;
        }
    `

    static properties = {
        imgSrc : {type: String},
        productId: {type: Number},
        productName: {type: String},
        bottlePrice: {type: Number},
        casePrice: {type: Number},
        invoice: {type: Object}
    }

    constructor(){
        super()

        this.imgSrc = '';
        this.productId = 0;
        this.productName = '';
        this.bottlePrice = 0;
        this.casePrice = 0;
        this.invoice = {}
    }

    calculateOrderPrice = (/** @type {'US' | 'TW'}*/ locale) => {
        const casePrice = Number(this.casePrice)
        const bottlePrice = Number(this.bottlePrice)

        const price = (this.invoice.bottles * bottlePrice) + (this.invoice.cases * casePrice)

        return price.toLocaleString(locale === 'US' ? 'en-US' : 'zh-TW', {
            style: 'currency',
            currency: locale === 'US' ? 'USD' : 'TWD'
        })

        

    }

    render(){
        return html`
        <div id='product'>
            <img src=${this.imgSrc} alt=${this.productName}/>
            <div id='product-meta'>
                <p id='product-name'>${this.productName}</p>
                <order-adjustor></order-adjustor>
            </div>
            <p id='estimate'>${`Estimated price: ${this.calculateOrderPrice('US')}`}</p>
        </div>
        `
    }
}

customElements.define('product-view', ProductView)