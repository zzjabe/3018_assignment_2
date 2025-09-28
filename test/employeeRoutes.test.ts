import request from "supertest";
import app from "../src/app";

describe("Employee API Endpoints", () => {
    it("should call createEmployee controller", async () => {
        const mockEmployee = {
            name: "Jianbin Zhang",
            position: "Developer",
            department: "IT",
            email: "jianbinzhang@rrc.ca",
            phone: "204-555-1234",
            branchId: 3
        };
        const res = await request(app).post("/employees").send(mockEmployee);
        expect(res.status).toBe(201);
        expect(res.body.data).toMatchObject(mockEmployee);
        expect(res.body.data.id).toBeDefined();
    });

    it("should return 400 if name is missing", async () => {
        const mockEmployee = {
            position: "Developer",
            department: "IT",
            email: "jianbinzhang@rrc.ca",
            phone: "204-555-1234",
            branchId: 3
        };
        const res = await request(app).post("/employees").send(mockEmployee);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Missing required fields");
    });
});