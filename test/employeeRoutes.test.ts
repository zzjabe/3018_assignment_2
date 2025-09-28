import request from "supertest";
import app from "../src/app";

describe("creatEmployee Endpoints", () => {
    it("should call createEmployee controller", async () => {
        const mockEmployee = {
            name: "Jianbin Zhang",
            position: "Developer",
            department: "ADD",
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
            department: "ADD",
            email: "jianbinzhang@rrc.ca",
            phone: "204-555-1234",
            branchId: 3
        };
        const res = await request(app).post("/employees").send(mockEmployee);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Missing required fields");
    });
});

describe("getAllEmployees endpoint", () => {
    it("should return an array of all employees", async () => {
        const res = await request(app).get("/employees");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should ensure each employee has required fields", async () => {
        const res = await request(app).get("/employees");
        expect(res.status).toBe(200);

        res.body.data.forEach((employee: any) => {
        expect(employee).toHaveProperty("id");
        expect(employee).toHaveProperty("name");
        expect(employee).toHaveProperty("position");
        expect(employee).toHaveProperty("department");
        expect(employee).toHaveProperty("email");
        expect(employee).toHaveProperty("phone");
        expect(employee).toHaveProperty("branchId");
        });
    });
});