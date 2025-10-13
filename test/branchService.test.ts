import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import * as branchService from "../src/api/v1/services/branchServices";
import { Branch } from "../src/api/v1/models/branchModel";

jest.mock("../src/api/v1/repositories/firestoreRepository");

const mockBranch: Branch = {
    id: 1,
    name: "Vancouver Branch",
    address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
    phone: "604-456-0022"
};

const mockSnapshot = (docs: any[]) => ({
    docs: docs.map((doc) => ({
        id: doc.id.toString(),
        data: () => doc,
    })),
});

describe("branchService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all branches from Firestore", async () => {
        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(
        mockSnapshot([mockBranch])
        );

        const result = await branchService.getAllBranches();

        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("branches");
        expect(result).toEqual([mockBranch]);
    });

    it("should return a branch by ID", async () => {
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
        id: "1",
        data: () => mockBranch,
        });

        const result = await branchService.getById(1);

        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
        "branches",
        "1"
        );
        expect(result).toEqual(mockBranch);
    });

    it("should throw an error if branch not found", async () => {
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(null);

        await expect(branchService.getById(99)).rejects.toThrow(
        "Branch with ID 99 not found"
        );
    });

    it("should create a new branch with incremented ID", async () => {
        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(
        mockSnapshot([mockBranch])
        );
        (firestoreRepository.setDocument as jest.Mock).mockResolvedValue(undefined);

        const newBranchData = {
        name: "Downtown Branch",
        address: "456 City Ave",
        phone: "204-555-0222",
        manager: "Bob",
        };

        const result = await branchService.createBranch(newBranchData);

        expect(firestoreRepository.setDocument).toHaveBeenCalledWith(
        "branches",
        "2", 
        { id: 2, ...newBranchData }
        );
        expect(result).toEqual({ id: 2, ...newBranchData });
    });

    it("should update an existing branch", async () => {
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
        id: "1",
        data: () => mockBranch,
        });

        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        const updated = { ...mockBranch, phone: "204-555-0999" };
        const result = await branchService.updateBranch(1, updated);

        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
        "branches",
        "1",
        updated
        );
        expect(result.phone).toBe("204-555-0999");
    });

    it("should delete a branch and return deleted data", async () => {
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
        id: "1",
        data: () => mockBranch,
        });

        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        const result = await branchService.deleteBranch(1);

        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
        "branches",
        "1"
        );
        expect(result).toEqual(mockBranch);
    });

    it("should throw an error if deleting a non-existent branch", async () => {
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(null);

        await expect(branchService.deleteBranch(999)).rejects.toThrow(
        "Branch with ID 999 not found"
        );
    });
});
