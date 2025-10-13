import { Request, Response, NextFunction } from "express";
import { validate } from "../src/api/v1/middlewares/validateMiddleware";
import { 
    createEmployeeSchema, 
    updateEmployeeSchema,
} from "../src/api/v1/validators/employeeValidators";
import { 
    createBranchSchema, 
    updateBranchSchema,
} from "../src/api/v1/validators/branchValidators";
import Joi from "joi";
import { MiddlewareFunction } from "../src/api/v1/types/middleType";

describe("validate Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it("should pass validation for valid employee data", () => {
        // Arrange
        mockReq.body = {
            name: "Alice Johnson",
            position: "Branch Manager",
            department: "Management",
            email: "alice.johnson@pixell-river.com",
            phone: "604-555-0148",
            branchId: 1
        };
        const middleware: MiddlewareFunction = validate(createEmployeeSchema);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should fail validation when employee name is empty string", () => {
        // Arrange
        mockReq.body = {
            name: "",
            position: "Branch Manager",
            department: "Management",
            email: "alice.johnson@pixell-river.com",
            phone: "604-555-0148",
            branchId: 1
        };
        const middleware: MiddlewareFunction = validate(createEmployeeSchema);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Validation failed",
            details: ['"name" is not allowed to be empty'],
        });
    });

    it("should pass validation for valid updated employee data", () => {
        // Arrange
        mockReq.body = {
            name: "Alice Johnson",
            position: "Branch Manager",
            department: "Management",
        };
        const middleware: MiddlewareFunction = validate(updateEmployeeSchema);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should fail validation when updated employee name is empty string", () => {
        // Arrange
        mockReq.body = {
            name: "",
            position: "Branch Manager",
            department: "Management",
        };
        const middleware: MiddlewareFunction = validate(updateEmployeeSchema);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Validation failed",
            details: ['"name" is not allowed to be empty'],
        });
    });



    it("should pass validation for valid branch data", () => {
        // Arrange
        mockReq.body = {
            name: "Vancouver Branch",
            address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
            phone: "604-456-0022"
        };
        const middleware: MiddlewareFunction = validate(createBranchSchema);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should fail validation when branch name is empty string", () => {
        // Arrange
        mockReq.body = {
            name: "",
            address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
            phone: "604-456-0022"
        };
        const middleware: MiddlewareFunction = validate(createBranchSchema);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Validation failed",
            details: ['"name" is not allowed to be empty'],
        });
    });

    it("should pass validation for valid updated branch data", () => {
        // Arrange
        mockReq.body = {
            name: "Vancouver Branch",
            address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
        };
        const middleware: MiddlewareFunction = validate(updateBranchSchema);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should fail validation when updated branch name is empty string", () => {
        // Arrange
        mockReq.body = {
            name: "",
            address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
        };
        const middleware: MiddlewareFunction = validate(updateBranchSchema);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Validation failed",
            details: ['"name" is not allowed to be empty'],
        });
    });
});
