import RegistrationViaApi from "../../../api/registration.api.js";
import Api from "../../../api/login.api.js";
import chai from "chai";

describe('API testing', async () => {
    it('Negative login via API / unregistered user', async () => {

        //Loginn via API
        const response = await Api.login("wrong@email.com", "password");
        chai.expect(response.status).to.be.equal(401);
    });

    it('Negative login via API / wrong password', async () => {

        //Registration via API
        const user = await RegistrationViaApi.registerAndReturnUser();
        const response = await Api.login(user.email, "passTypo");
        chai.expect(response.status).to.be.equal(401);
    });
});