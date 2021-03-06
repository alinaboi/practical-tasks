import baseApi from "../base/base.api.js";
import User from "./user.js";

const password = 'password';

class RegistrationViaApi {
    constructor() {
    }

    async registerAndReturnUser() {
        await allure.addStep(`POST User Registration with autogenerated Email and password`);
        for (let i = 0; i < 10; i++) {
            const email = await this.generateEmail(10);
            const response = await this.register(email, password);
            if (response.status === 201) {
                return new User(response.body.data.email, password);
            }
        }
        throw new Error('Cannot register a user.')
    }

    async register(email, password) {
        await allure.addStep(`POST User Registration with ${email}`);
        return await baseApi.post("api/Users", {
            "email": email,
            "password": password,
            "passwordRepeat": password,
            "securityQuestion": {
                "id": 1,
                "question": "Your eldest siblings middle name?",
                "createdAt": "2021-12-11T10:11:06.058Z",
                "updatedAt": "2021-12-11T10:11:06.058Z"
            },
            "securityAnswer": "Funtic"
        });
    }

    async generateEmail(length) {
        await allure.addStep(`Creating random Email`);
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = 'user-';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result + '@gmail.com';
    }
}

export default new RegistrationViaApi();
