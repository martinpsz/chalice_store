import { LitElement, html, css } from "lit";
import data from '../../products.json'
import '../components/product-view'

/**
 * @typedef invoice
 * @type {Object}
 */


/**
 * @typedef Order
 * @type {Object}
 * @property {string} Product_Id - The id of the product (also used as alt for image.)
 * @property {string} Product_Name - The name of the product
 * @property {string} Product_Image - The image of the product
 * @property {string} Per_Case_Price - The price of a case
 * @property {string} Per_Bottle_Price - The price of a bottle
 * @property {invoice} Invoice - The number of cases / bottles selected 
 */

/**
 * Order Summary - manages the user's order cart
 * 
 * @property {Array.<Order>} order
 */
export class OrderSummary extends LitElement{
    static styles = css`
        #order-summary{
            display: flex;
            flex-direction: column;
        }
    `

    static properties = {
        order: {type: Object}
    }

    constructor(){
        super()
        this.order = data.order

        this.order = this.order.map(prod => {
            return {...prod, Invoice: {'cases': 0, 'bottles': 1}}
        })
        
    }
    render(){
        return html`
            <div id='order-summary'>
            ${this.order.map(elem => {
                return html`<product-view key=${elem.Product_Id}
                                          productName=${elem.Product_Name}
                                          imgSrc=${elem.Product_Image}
                                          casePrice=${elem.Per_Case_Price}
                                          bottlePrice=${elem.Per_Bottle_Price}
                                          .invoice=${elem.Invoice}
                                          @remove-product=${() => this.removeProduct(elem.Product_Id)}
                                          @order-selection=${(/** @type {CustomEvent} */ e) => this.updateProductOrder(e, elem.Product_Id)}>
                            </product-view>`
            })}
            </div>
        `
    }

    /**
     * @param {number} id - ID of the product being removed 
     */
    removeProduct = (id) => {
        this.order = this.order.filter(prod => prod.Product_Id !== id)
    }

    /**
     * @param {CustomEvent} e 
     * @param {number} id
     */
    updateProductOrder = (e, id) => {
        this.order = this.order.map(prod => {
            if(prod.Product_Id === id){
                return {...prod, Invoice: {...prod.Invoice, ...e.detail}}
            }

            return prod
        })
    }
}

customElements.define('order-summary', OrderSummary)