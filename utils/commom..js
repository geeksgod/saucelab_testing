
export class Common{
    static async goto(page){
        await page.goto('/v1/index.html');
    }

    static async getItemList(element){
        var itemcount = await element.count()
        var items =[]       
        for(let i = 0;i < itemcount ;i++){
            items.push(await element.nth(i).textContent())
        }
        return items   
    }

    static async detectAddToCartButton(element,item){
        var itemcount = await element.count()
        for(let i = 0;i < itemcount ;i++){
            
           if(await element.nth(i).locator('.inventory_item_name').textContent() === item){
            
            return await element.nth(i).locator('.btn_primary.btn_inventory')
           }           
        }
        return null
    }
}
