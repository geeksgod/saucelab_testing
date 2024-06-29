import { Common } from '../../utils/commom.';


export class InformationPage{
    constructor(Page){
        this.page = Page
        this.tb_firstname = this.page.locator('#first-name');
        this.tb_lastname = this.page.locator('#last-name');
        this.tb_zip = this.page.locator('#postal-code');
        this.btn_continue = this.page.locator('[type=submit]')
    }

    async enterInfo(firstname,lastname,zip){
        await this.tb_firstname.fill(firstname)
        await this.tb_lastname.fill(lastname)
        await this.tb_zip.fill(zip)
    }
    async continue(){
        await this.btn_continue.click()
    }
}