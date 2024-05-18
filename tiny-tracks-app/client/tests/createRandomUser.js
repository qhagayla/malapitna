import { faker } from "@faker-js/faker";

import React from "react";

function createRandomUser() {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: "pa$$w0rd1234",
        re_password: "pa$$w0rd1234",
    };
}

export default createRandomUser;
