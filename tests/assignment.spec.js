// @ts-check
const { test, expect } = require('@playwright/test');
const userdata = require('../data/users.json')
import { buylist } from "../data/produtstobuy";

import {sortby} from "../utils/sortoptions"
import { CartPage, InformationPage, LoginPage,OverviewPage,ProductPage } from './pageobjects';
import { FinishPage } from "./pageobjects/fisnishpage";

test.describe('Test Scenarios',()=>{
  test.beforeEach(async ({ page }) => { 
    //goes to home page before each test  
    await page.goto('/v1/index.html');
  });

  test('Login with invalid user details', async ({ page }) => {
    //creating Loginpage object
    var lp = new LoginPage(page)
    //trying to log with invalid user details
    await lp.login(userdata.lockedUser.username,userdata.lockedUser.password)
    //checking for the error message
    await lp.checkLockedUser()
  });

  test('Login with valid user details', async ({ page }) => {
    // Assertions use the expect API.
    var lp = new LoginPage(page)
    //trying to log with valid user details
    await lp.login(userdata.validUser.username,userdata.validUser.password)
    //verfy we are in product page with help of text matching
    await lp.checkisLogged()
  });

  test('Filter Products by Size and Price', async ({ page }) => {

    var lp = new LoginPage(page)
    await lp.login(userdata.validUser.username,userdata.validUser.password)
    await lp.checkisLogged()
    var pp = new ProductPage(page)
    // get the initial product list for comparision
    var productlist = await pp.getProdcutNames()
    //porduct is sorted
    await pp.sortby(sortby.DSCNAME)
    //new list is extracted
    var productlistDesc = await pp.getProdcutNames()
    //list if compared
    pp.checkDsc(productlist,productlistDesc)
    

    var pricelist = await pp.getPricelists()
    await pp.sortby(sortby.ASCPRICE)
    var pricelistasc = await pp.getPricelists()
    pp.checkAsc(pricelist,pricelistasc)
  
  });

  
  test('Add items to the cart', async ({ page }) => {
    // Assertions use the expect API.
    var lp = new LoginPage(page)
    await lp.login(userdata.validUser.username,userdata.validUser.password)
    await lp.checkisLogged()

    var pp = new ProductPage(page)
    //buylist has the list of items to be added to cart
    await pp.addtocart(buylist)

    var cp = new CartPage(page)
    //navigate to the cart
    await cp.gotocart()
    //get  the product list from cart page
    var productlist = await cp.getProdcutNames()
    //validate the items in the cart
    await cp.validate(buylist,productlist)
   
  });

  test('Perform Checkout', async ({ page }) => {
    // Assertions use the expect API.
    var lp = new LoginPage(page)
    await lp.login(userdata.validUser.username,userdata.validUser.password)
    await lp.checkisLogged()

    var pp = new ProductPage(page)
    await pp.addtocart(buylist)

    var cp = new CartPage(page)
    await cp.gotocart()
    var productlist = await cp.getProdcutNames()
    await cp.validate(buylist,productlist)
    await cp.checkout()

    var ip = new InformationPage(page)
    //enter the checkout info
    await ip.enterInfo(userdata.orderUser.firstname,userdata.orderUser.lastname,userdata.orderUser.zip)
    //click in continue option
    await ip.continue()

    var op = new OverviewPage(page)
    //click in continue option
    await op.continue()

    var fp = new FinishPage(page)
    //varify the sucess message
    await fp.verifySucess()

  });
});
