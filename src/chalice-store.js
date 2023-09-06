import { LitElement, html, css } from "lit";
import './components/order-summary'
/**
 * Chalice Store - Where all components are laid out to create the store
 */
export class ChaliceStore extends LitElement{
    static styles = css`
        .store-container{
            background-color: rgba(67, 77, 86, 0.9);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .order-container{
            max-width: 576px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: white;
        }

        
    
    `


    render(){
        return html`
            <div class="store-container">
                <div class="order-container">
                    <order-summary></order-summary>
                </div>
            </div>
        `
    }

    
}

customElements.define('chalice-store', ChaliceStore)
