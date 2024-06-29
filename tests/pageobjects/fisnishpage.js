const { expect } = require('@playwright/test');

export class FinishPage{
   
   constructor(Page){
    this.page = Page    
    this.msg_finish = this.page.locator('.complete-header')    
   }

   async verifySucess(){
    await expect(this.msg_finish).toContainText("THANK YOU FOR YOUR ORDER")
    }
}