import { login, register } from "@/services/api/authentication.js";
import { describe, expect, it } from "vitest";
import createRandomUser from "./createRandomUser.js";

const user = createRandomUser();

describe("testing registration", () => {
    it("should return Http Status Code 201 - Created", async () => {
        const response = await register(user);

        expect(response.status).toBe(201);
    });
});

describe("testing login", () => {
    it("should return a user and a token", async () => {
        const response = await login({
            email: user.email,
            password: user.password,
        });

        expect(response.data).toHaveProperty("access");
        expect(response.data).toHaveProperty("refresh");
    });
});

export default user;
