const { expect } = require('@playwright/test');

import { Common } from '../../utils/commom.';

export class ProductPage{
   
   constructor(Page){
    this.page = Page
    this.sel_sortmenu = this.page.locator('.product_sort_container')
    this.block_item = this.page.locator('.inventory_item')
    this.block_items_name = this.page.locator('.inventory_item_name');
    this.block_items_price = this.page.locator('.inventory_item_price');
   }

   async sortby(value){
    await this.sel_sortmenu.selectOption(value)    
    await expect(this.page.locator('.product_label')).toContainText("Products");    
   }

   async addtocart(itemlist){
    for(var item of itemlist){
        var addbtn = await Common.detectAddToCartButton(this.block_item,item)
        expect(addbtn).toBeVisible() 
        await addbtn.hover()
        await addbtn.click({force: true })           
    }
   }

   async getProdcutNames(){
     return Common.getItemList(this.block_items_name)
   }

   async getPricelists(){
    var pricelist = await Common.getItemList(this.block_items_price)
    var convertedList = pricelist.map(price => parseFloat(price.replace('$','')))
    return convertedList
   }

   async checkDsc(initlalList,finalList){
    expect(finalList).toEqual(expect.arrayContaining(initlalList.reverse()))
   }

   async checkAsc(initlalList,finalList){
    expect(finalList).toEqual(expect.arrayContaining(initlalList.sort()))
   }
}