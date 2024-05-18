import { getProfile } from "@/services/api/getProfile.js";
import { getAccessToken, login } from "@/services/api/authentication";
import { describe, expect, it } from "vitest";
import user from "./authentication.test";

var payload = {};

describe("testing login", () => {
    it("should return a user and a token", async () => {
        const _response = await login({
            email: user.email,
            password: user.password,
        });

        payload = _response.data;
    });
});

describe("testing getting user profile", () => {
    it("should user credentials", async () => {
        const _response = await getProfile(payload);
        // refreshToken = response.data.refresh;
        expect(_response.status).toBe(200);
    });
});

describe("testing refresh token", () => {
    it("should get new access token", async () => {
        const response = await getAccessToken(payload);
        console.log(response.data);
    });
});
