import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import server from "./server.js";

test("GET / should return Hello World!", async () => {
    const response = await request(server).get("/");

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.text, "Hello World!");
});
