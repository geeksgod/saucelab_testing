const { expect } = require('@playwright/test');

export class LoginPage{
   
   constructor(Page){
    this.page = Page
    this.tb_username = this.page.locator('#user-name')
    this.tb_password = this.page.locator('#password')
    this.btn_login = this.page.locator('#login-button')    
   }

   async login(username,password){
    await this.tb_username.fill(username)
    await this.tb_password.fill(password)
    await this.btn_login.click()
   }

   async checkLockedUser(){
    await expect(this.page.locator('[data-test="error"]')).toContainText("Sorry, this user has been locked out.");
   }
   async checkisLogged(){
    await expect(this.page.locator('.product_label')).toContainText("Products");    
   }
}