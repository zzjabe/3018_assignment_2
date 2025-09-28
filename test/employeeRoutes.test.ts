import request from "supertest";
import app from "../src/app";

describe("creatEmployee Endpoints", () => {
    it("should create an new employee successfully", async () => {
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

describe("getEmployee endpoint", () => {

    it("should return the employee object for a valid id", async () => {
        const res = await request(app).get("/employees/15");
        expect(res.status).toBe(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.id).toBe(15);
        expect(res.body.data.name).toBe("Thomas Walker");
        expect(res.body.data.position).toBe("Teller");
        expect(res.body.data.department).toBe("Operations");
        expect(res.body.data.email).toBe("thomas.walker@pixell-river.com");
        expect(res.body.data.phone).toBe("506-555-0285");
        expect(res.body.data.branchId).toBe(9);
    });

    it("should return 404 if employee with id does not exist", async () => {
        const res = await request(app).get("/employees/99");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Employee not found");
    });
});

describe("updateEmployee endpoint", () => {
    it("should update employee data successfully", async () => {
        const patch = {
            id: 15,
            position: "Developer",
            phone: "666-666-6666"
        };
        const id = patch.id
        const res = await request(app).put(`/employees/${id}`).send(patch);

        expect(res.status).toBe(200);
        expect(res.body.data.id).toBe(id);
        expect(res.body.data.position).toBe(patch.position);
        expect(res.body.data.phone).toBe(patch.phone);
        expect(res.body.data.name).toBe("Thomas Walker");
        expect(res.body.data.department).toBe("Operations");
        expect(res.body.data.email).toBe("thomas.walker@pixell-river.com");
        expect(res.body.data.branchId).toBe(9);
    });

    it("should return 404 if employee missing ID parameter", async () => {
        const patch = { position: "Developer" };
        const res = await request(app).put("/employees/").send(patch);
        expect(res.status).toBe(404);
    });
});

describe("deleteEmployee endpoint", () => {
    it("should delete a employee successfully", async () => {
        const res = await request(app).delete("/employees/15");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Employee deleted");
        expect(res.body.data).toHaveProperty("id", 15);
    });

    it("should return 404 if employee missing ID parameter", async () => {
        const res = await request(app).delete("/employees/");
        expect(res.status).toBe(404);
    });
});

describe("getByBranch endpoint", () => {
    it("should return all the employees for that branch", async () => {
        const res = await request(app).get("/employees/byBranch?branchId=5");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        res.body.data.forEach((e: any) => {
            expect(e.branchId).toBe(5);
        });
    });

    it("should return 400 if without branchId", async () => {
        const res = await request(app).get("/employees/byBranch/");
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Missing branchId query parameter");
    });
});

describe("getByDepartment endpoint", () => {
    it("should return all the employees for that department", async () => {
        const res = await request(app).get("/employees/byDepartment?department=Loans");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        res.body.data.forEach((e: any) => {
            expect(e.department).toBe("Loans");
        });
    });

    it("should return 400 if without department", async () => {
        const res = await request(app).get("/employees/byDepartment/");
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Missing department query parameter");
    });
});