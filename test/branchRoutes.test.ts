import request from "supertest";
import app from "../src/app";

describe("creatBranch Endpoints", () => {
    it("should create a new branch successfully", async () => {
        const mockBranch = {
            name: "Winnpeg Branch",
            address: "289 Appleford, Winnpeg, MB, R3Y 0S5",
            phone: "111-111-1111"
        };
        const res = await request(app).post("/branches").send(mockBranch);
        expect(res.status).toBe(201);
        expect(res.body.data).toMatchObject(mockBranch);
        expect(res.body.data.id).toBeDefined();
    });

    it("should return 400 if name is missing", async () => {
        const mockBranch = {
            address: "289 Appleford, Winnpeg, MB, R3Y 0S5",
            phone: "111-111-1111"
        };
        const res = await request(app).post("/branches").send(mockBranch);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Missing required fields");
    });
});

