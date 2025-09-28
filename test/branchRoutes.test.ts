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

describe("getAllBranches endpoint", () => {
    it("should return an array of all branches", async () => {
        const res = await request(app).get("/branches");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should ensure each branch has required fields", async () => {
        const res = await request(app).get("/branches");
        expect(res.status).toBe(200);

        res.body.data.forEach((branch: any) => {
        expect(branch).toHaveProperty("id");
        expect(branch).toHaveProperty("name");
        expect(branch).toHaveProperty("address");
        expect(branch).toHaveProperty("phone");
        });
    });
});

describe("getBranch endpoint", () => {
    it("should return the branch object for a valid id", async () => {
        const res = await request(app).get("/branches/5");
        expect(res.status).toBe(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.id).toBe(5);
        expect(res.body.data.name).toBe("Winnipeg Branch");
        expect(res.body.data.address).toBe("1 Portage Ave, Winnipeg, MB, R3B 2B9");
        expect(res.body.data.phone).toBe("204-988-2402");
    });

    it("should return 404 if branch with id does not exist", async () => {
        const res = await request(app).get("/branches/99");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Branch not found");
    });
});

describe("updateBranch endpoint", () => {
    it("should update branch data successfully", async () => {
        const patch = {
            id: 5,
            phone: "666-666-6666"
        };
        const id = patch.id
        const res = await request(app).put(`/branches/${id}`).send(patch);

        expect(res.status).toBe(200);
        expect(res.body.data.id).toBe(id);
        expect(res.body.data.phone).toBe(patch.phone);
        expect(res.body.data.name).toBe("Winnipeg Branch",);
        expect(res.body.data.address).toBe("1 Portage Ave, Winnipeg, MB, R3B 2B9");
    });

    it("should return 404 if branch missing ID parameter", async () => {
        const patch = { position: "Developer" };
        const res = await request(app).put("/branches/").send(patch);
        expect(res.status).toBe(404);
    });
});

describe("deleteBranch endpoint", () => {
    it("should delete a branch successfully", async () => {
        const res = await request(app).delete("/branches/5");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Branch deleted");
        expect(res.body.data).toHaveProperty("id", 5);
    });

    it("should return 404 if branch missing ID parameter", async () => {
        const res = await request(app).delete("/branches/");
        expect(res.status).toBe(404);
    });
});