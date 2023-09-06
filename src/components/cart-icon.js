import { LitElement, html, css, nothing } from "lit";

/**
 * Cart icon button. 
 * 
 * @property {number} itemsInCart
 */
export class CartIcon extends LitElement{
    static styles = css`
        div{
            display: inline-block;
            position: relative;
        }

        #icon{
            background: red;
            padding: 0.25em;
            border-radius: 100%; 
        }

        span{
            color: white;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 41%;
            font-family: var(--Poppins);
            
        }
    `
    
    constructor(){
        super()
        this.itemsInCart = 0;
    }


    render(){
        return html`
        <div>
        <iconify-icon align id='icon' icon="heroicons:shopping-bag" style="color: white; font-size: 40px;"></iconify-icon>
        ${this.itemsInCart > 0 ? html`<span>${this.itemsInCart}</span>`: nothing}
        </div>
        
        `
    }
}

customElements.define('cart-icon', CartIcon)