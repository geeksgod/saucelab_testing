// @ts-check
const { test, expect } = require('@playwright/test');
const userdata = require('../data/users.json')
import { buylist } from "../data/produtstobuy";

import {sortby} from "../utils/sortoptions"
import { CartPage, InformationPage, LoginPage,OverviewPage,ProductPage } from './pageobjects';
import { FinishPage } from "./pageobjects/fisnishpage";

test.describe('Login Functiion Test',()=>{
  test.beforeEach(async ({ page }) => {   
    await page.goto('/v1/index.html');
  });

  test('Login with invalid user details', async ({ page }) => {
    // Assertions use the expect API.
    var lp = new LoginPage(page)
    await lp.login(userdata.lockedUser.username,userdata.lockedUser.password)
    await lp.checkLockedUser()
  });

  test('Login with valid user details', async ({ page }) => {
    // Assertions use the expect API.
    var lp = new LoginPage(page)
    await lp.login(userdata.validUser.username,userdata.validUser.password)
    await lp.checkisLogged()
  });

  test('Filter Products by Size and Price', async ({ page }) => {
    // Assertions use the expect API.
    var lp = new LoginPage(page)
    await lp.login(userdata.validUser.username,userdata.validUser.password)
    await lp.checkisLogged()
    var pp = new ProductPage(page)

    var productlist = await pp.getProdcutNames()
    await pp.sortby(sortby.DSCNAME)
    var productlistDesc = await pp.getProdcutNames()
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
    await pp.addtocart(buylist)

    var cp = new CartPage(page)
    await cp.gotocart()
    var productlist = await cp.getProdcutNames()
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
    await ip.enterInfo(userdata.orderUser.firstname,userdata.orderUser.lastname,userdata.orderUser.zip)
    await ip.continue()

    var op = new OverviewPage(page)
    await op.continue()

    var fp = new FinishPage(page)
    await fp.verifySucess()

  });
});
