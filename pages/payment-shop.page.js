import BasePage from "../base/base.page.js";
import Button from "../elements/button.js";
import Dropdown from "../elements/dropdown.js";
import Label from "../elements/label.js";
import Input from "../elements/input.js";

class PaymentShopPage extends BasePage {
    constructor() {
        super();
    }
    static getBaseElement() {
        return new BaseElement($(''), "");
    }

    get accountMenuBtn() {
        return new Button($('#navbarAccount'), "Account Menu");
    }
    get closePopupBtn() {
        return new Button($('button.close-dialog'), "Close dialog message");
    }
    get closeCookieBtn() {
        return new Button($('.cc-btn'), "Closse cookie message");
    }
    get sideNavMenuBtn() {
        return new Button($('.mat-focus-indicator.mat-tooltip-trigger.mat-button.mat-button-base:first-of-type'), "Open Side Navigation Menu");
    }
    get footer() {
        return new Label($('.mat-paginator.mat-elevation-z6'), "The footer ")
    }
    get basketBtn() {
        return new Button($('[aria-label="Show the shopping cart"]'), "Navigate to Basket")
    }
    get addNewCardBtn() {
        return new Button($('(//mat-panel-title[contains(text(),"Add new card")])'), "Add New Card")
    }
    get personNameInput() {
        return new Input($('(//input[@type="text"])[2]'), "Name Input")
    }
    get cardNumberInput() {
        return new Input($('(//input[@type="number"])'), "Card Number Input")
    }
    get invalidCardNumberMsg() {
        return new Label($('//mat-error[contains(text(),"Please enter your card number.")]'), "Card number is not valid or empty Massege.");
    }
    get expiryMonthDropdown() {
        return new Dropdown($("(//select[starts-with(@class,'mat-input-element mat-form-field-autofill-control')])[1]"), "Choose expiry month of the card")
    }
    get expiryYearDropdown() {
        return new Dropdown($("(//select[starts-with(@class,'mat-input-element mat-form-field-autofill-control')])[2]"), "Choose expiry year of the card")
    }
    get submitBtn() {
        return new Button($('(//span[contains(text(), "Submit")])'), "Submit Button")
    }
    get selectTheCardBtn() {
        return new Button($('(//mat-radio-button[contains(@class,"mat-radio-button")])[1]'), "Select User's Card")
    }
    get continueBtn() {
        return new Button ($('(//button[@aria-label="Proceed to review"])'), "Navigate to Order Summary")
    }

    async open() {
        await allure.startStep(`Navigation to the Search Page`);
        await super.open(`${global.baseUrl}#/delivery-method`);
        /*if (await this.closePopupBtn.isExisting())
            await this.closePopupBtn.click();
        if (await this.closeCookieBtn.isExisting())
            await this.closeCookieBtn.click();*/
        await allure.endStep(`passed`);
    }
    async waitForScreenToBeAvailable() {
        await this.accountMenuBtn.waitForDisplayed();
        await this.sideNavMenuBtn.waitForDisplayed();
    }
    async addNewCard() {
        await allure.addStep(`Click on Add New Card Button`);
        await this.addNewCardBtn.click();
    }
    async fillCardFields(personName, cardNumber, expiryMonth, expiryYear) {
        await allure.startStep(`Adding New Card : ${personName}/ ${cardNumber}/ ${expiryMonth}/ ${expiryYear}`);
        await this.personNameInput.setValue(personName);
        await this.cardNumberInput.setValue(cardNumber);
        await this.expiryMonthDropdown.wdioElement.waitForClickable({
            timeout: 10000
        });
        await this.expiryMonthDropdown.selectNumber(expiryMonth);
        await this.expiryYearDropdown.selectNumber(expiryYear);
        await this.submitBtn.wdioElement.waitForClickable({
            timeout: 10000
        });
        await this.submitBtn.click();
        await allure.endStep(`passed`);

    }
    async selectTheCard() {
        await allure.addStep(`Click on User's Card`);
        await this.selectTheCardBtn.click();
    }
    async continue() {
        await allure.addStep(`Click on Continue Button`);
        await this.continueBtn.wdioElement.waitForClickable({
            timeout: 10000
        });
        await this.continueBtn.click();
    }

}
export default new PaymentShopPage();
