import { Employee, employees } from "../../../data/employees";

export const getAllEmployees = (): Employee[] => {
    return employees;
};

export const getById = (id: number): Employee | null =>{
    const employee = employees.find(e => e.id === id);
    if (!employee) {
        return null;
    }
    return employee;
};

export const createEmployee = (data: Omit<Employee, "id">): Employee => {
    const newId = employees.length + 1;

    const newEmployee: Employee = {
        id: newId,
        ...data     
    };
    employees.push(newEmployee);

    return newEmployee;
};

export const updateEmployee = (
    id: number,
    patch: Partial<Employee>
): Employee | null =>{
    const idx = employees.findIndex(e => e.id === id);
    if (idx === -1) return null;
    employees[idx] = { ...employees[idx], ...patch };
    return employees[idx];
}

export const deleteEmployee = (id: number): Employee | null => {
    const idx = employees.findIndex(e => e.id === id);
    if (idx === -1) return null;
    return employees.splice(idx, 1)[0];
}