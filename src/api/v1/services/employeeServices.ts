import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Employee } from "../models/employeeModel"
import * as firestoreRepository from "../repositories/firestoreRepository";
import { getEmployee } from "../controllers/employeeController";

const COLLECTION: string = "employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
    try{
        const snapshot: QuerySnapshot = 
        await firestoreRepository.getDocuments(COLLECTION);
        const employees: Employee[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: Number(doc.id),
                ...data
            } as Employee;
        });
        return employees;
    } catch (error: unknown) {
        throw error;
    }
};

export const getById = async (id: number): Promise<Employee> =>{
    try{
    const doc: DocumentSnapshot | null = await firestoreRepository.getDocumentById(
        COLLECTION,
        id.toString()
    );

    if (!doc) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const employee: Employee = {
        id: Number(doc.id),
        ...data,
    } as Employee;

        return structuredClone(employee);
    } catch (error: unknown) {
        throw error;
    }
};

export const createEmployee = async (
    employeeData: Omit<Employee, "id">
): Promise<Employee> => {
    try{
        const snapshot = await firestoreRepository.getDocuments(COLLECTION);
        const employees = snapshot.docs.map(doc => doc.data() as Employee);
        const maxId = employees.length === 0 ? 0 : Math.max(...employees.map(e => e.id));
        const newId = maxId + 1;

        const newEmployee: Employee = {
        id: newId,
        ...employeeData,     
        };

        await firestoreRepository.setDocument(COLLECTION, String(newId), newEmployee);

        return newEmployee;
    } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
    };
};

export const updateEmployee = async (employeeData: Employee): Promise<void> =>{
    try{
        await firestoreRepository.updateDocument(
            COLLECTION,
            employeeData.id.toString(),
            employeeData
        );
    } catch (error: unknown) {
        throw error;
    }
}

export const deleteEmployee = async (id: number): Promise<void> => {
    try{
        const employee: Employee = await getById(id);

        if (!employee) {
            throw new Error(`Employee with ID ${id} not found`);
        }

        await firestoreRepository.deleteDocument(COLLECTION, id.toString());
    } catch (error: unknown) {
        throw error;
    }
};

export const getByBranch = async (branchId: number): Promise<Employee> =>{
    return employees.filter(e => e.branchId === branchId);
};

export const getByDepartment = (department: string): Employee[] => {
  const dep = department.toLowerCase();
  return employees.filter(e => String(e.department).toLowerCase() === dep);
};