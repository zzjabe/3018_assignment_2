import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Branch } from "../models/branchModel"
import * as firestoreRepository from "../repositories/firestoreRepository";

const COLLECTION: string = "branches";

export const getAllBranches = async (): Promise<Branch[]> => {
    try{
        const snapshot: QuerySnapshot = 
        await firestoreRepository.getDocuments(COLLECTION);
        const branches: Branch[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: Number(doc.id),
                ...data
            } as Branch;
        });
        return branches;
    } catch (error: unknown) {
        throw error;
    }
};

export const getById = async (id: number): Promise<Branch> =>{
    try{
    const doc: DocumentSnapshot | null = await firestoreRepository.getDocumentById(
        COLLECTION,
        id.toString()
    );

    if (!doc) {
        throw new Error(`Branch with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const branch: Branch = {
        id: Number(doc.id),
        ...data,
    } as Branch;

        return structuredClone(branch);
    } catch (error: unknown) {
        throw error;
    }
};

export const createBranch = async (
    branchData: Omit<Branch, "id">
): Promise<Branch> => {
    try{
        const snapshot = await firestoreRepository.getDocuments(COLLECTION);
        const branches = snapshot.docs.map(doc => doc.data() as Branch);
        const maxId = branches.length === 0 ? 0 : Math.max(...branches.map(e => e.id));
        const newId = maxId + 1;

        const newBranch: Branch = {
        id: newId,
        ...branchData,     
        };

        await firestoreRepository.setDocument(COLLECTION, String(newId), newBranch);

        return newBranch;
    } catch (error) {
    throw error;
    };
};

export const updateBranch = async (id: number, branchData: Branch): Promise<Branch> =>{
    try{
        const branch = await getById(id);
        const updatedBranch: Branch = { ...branch, ...branchData };

        await firestoreRepository.updateDocument(COLLECTION, id.toString(), updatedBranch);
        return updatedBranch;
    } catch (error: unknown) {
        throw error;
    };
};

export const deleteBranch = async (id: number): Promise<Branch> => {
    try{
        const branch: Branch = await getById(id);

        if (!branch) {
            throw new Error(`Branch with ID ${id} not found`);
        }

        await firestoreRepository.deleteDocument(COLLECTION, id.toString());

        return branch;
    } catch (error: unknown) {
        throw error;
    };
};