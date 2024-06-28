const { expect } = require('@playwright/test');

export class OverviewPage{
   
   constructor(Page){
    this.page = Page    
    this.btn_finish = this.page.locator('.btn_action.cart_button')    
   }

   async continue(){
    await this.btn_finish.click()
    }
}