import { Common } from '../../utils/commom.';
const { expect } = require('@playwright/test');



export class CartPage{
    constructor(Page){
        this.page = Page
        this.block_items_name = this.page.locator('.inventory_item_name');
        this.btn_checkout = this.page.locator('a.btn_action.checkout_button');
        this.btn_cart = this.page.locator('#shopping_cart_container>a')
    }

    async gotocart(){
        await this.btn_cart.click({force:true})
    }
    async getProdcutNames(){
        return Common.getItemList(this.block_items_name)
    }
    async validate(initlalList,finalList){
        expect(finalList).toEqual(expect.arrayContaining(initlalList))
    }

    async checkout(){
        await this.btn_checkout.click({force:true})
    }
}