import app from "./app.js";

const fixture = [
    {
        "url": "http://doesNotExist.boldtech.co",
        "priority": 1
    },
    {
        "url": "http://boldtech.co",
        "priority": 3
    },
    {
        "url": "http://offline.boldtech.co",
        "priority": 2
    },
    {
        "url": "http://google.com",
        "priority": 4
    }
]
describe("Check online servers", () => {
    it("it should return http://boldtech.co", async () => {
        const response = await app(fixture);
        expect(response).toEqual("http://boldtech.co");
    })
})