import { Employee, employees } from "../../../data/employees";

export const getAllEmployees = (): Employee[] => {
    return employees;
};

export const createEmployee = (data: Omit<Employee, "id">): Employee => {
    const newId = employees.length + 1;

    const newEmployee: Employee = {
        id: newId,
        name: data.name,
        position: data.position,
        department: data.department,
        email: data.email,
        phone: data.phone,
        branchId: data.branchId
        
     };
    employees.push(newEmployee);

    return newEmployee;
};

