import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import * as employeeService from "../src/api/v1/services/employeeServices";
import { Employee } from "../src/api/v1/models/employeeModel";


jest.mock("../src/api/v1/repositories/firestoreRepository");

const mockEmployee: Employee = {
    id: 1,
    name: "Alice Johnson",
    position: "Branch Manager",
    department: "Management",
    email: "alice.johnson@pixell-river.com",
    phone: "604-555-0148",
    branchId: 1
};

const mockSnapshot = (docs: any[]) => ({
    docs: docs.map((doc) => ({
        id: doc.id.toString(),
        data: () => doc,
    })),
});

describe("employeeService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all employees from Firestore", async () => {
        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(
        mockSnapshot([mockEmployee])
        );

        const result = await employeeService.getAllEmployees();

        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("employees");
        expect(result).toEqual([mockEmployee]);
    });


    it("should return an employee by ID", async () => {
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
        id: "1",
        data: () => mockEmployee,
        });

        const result = await employeeService.getById(1);

        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
        "employees",
        "1"
        );
        expect(result).toEqual(mockEmployee);
    });

    it("should throw error if employee not found", async () => {
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(null);

        await expect(employeeService.getById(99)).rejects.toThrow(
        "Employee with ID 99 not found"
        );
    });

    it("should create a new employee with incremented ID", async () => {
        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(
        mockSnapshot([mockEmployee])
        );
        (firestoreRepository.setDocument as jest.Mock).mockResolvedValue(undefined);

        const newEmployeeData = {
        name: "Bob",
        position: "Engineer",
        department: "IT",
        email: "bob@example.com",
        phone: "987-654-3210",
        branchId: 3,
        };

        const result = await employeeService.createEmployee(newEmployeeData);

        expect(firestoreRepository.setDocument).toHaveBeenCalledWith(
        "employees",
        "2", 
        { id: 2, ...newEmployeeData }
        );
        expect(result).toEqual({ id: 2, ...newEmployeeData });
    });

    it("should update employee data", async () => {
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
        id: "1",
        data: () => mockEmployee,
        });

        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        const updated = { ...mockEmployee, position: "Senior Manager" };
        const result = await employeeService.updateEmployee(1, updated);

        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
        "employees",
        "1",
        updated
        );
        expect(result.position).toBe("Senior Manager");
    });

    it("should delete employee and return deleted data", async () => {
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
        id: "1",
        data: () => mockEmployee,
        });

        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        const result = await employeeService.deleteEmployee(1);

        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
        "employees",
        "1"
        );
        expect(result).toEqual(mockEmployee);
    });


    it("should return employees by branch ID", async () => {
        (firestoreRepository.getDocumentsByField as jest.Mock).mockResolvedValue(
        mockSnapshot([mockEmployee])
        );

        const result = await employeeService.getByBranch(2);

        expect(firestoreRepository.getDocumentsByField).toHaveBeenCalledWith(
        "employees",
        "branchId",
        "==",
        2
        );
        expect(result).toEqual([mockEmployee]);
    });


    it("should return employees by department", async () => {
        (firestoreRepository.getDocumentsByField as jest.Mock).mockResolvedValue(
        mockSnapshot([mockEmployee])
        );

        const result = await employeeService.getByDepartment("HR");

        expect(firestoreRepository.getDocumentsByField).toHaveBeenCalledWith(
        "employees",
        "department",
        "==",
        "HR"
        );
        expect(result).toEqual([mockEmployee]);
    });
});
