import { Branch, branches } from "../../../data/branches";

export const getAllBranches = (): Branch[] => {
    return branches;
};

export const getById = (id: number): Branch | null =>{
    const branch = branches.find(e => e.id === id);
    if (!branch) {
        return null;
    }
    return branch;
};

export const createBranch = (data: Omit<Branch, "id">): Branch => {
    const newId = branches.length + 1;

    const newBranch: Branch = {
        id: newId,
        ...data     
    };
    branches.push(newBranch);

    return newBranch;
};

export const updateBranch = (
    id: number,
    patch: Partial<Branch>
): Branch | null =>{
    const idx = branches.findIndex(b => b.id === id);
    if (idx === -1) return null;
    branches[idx] = { ...branches[idx], ...patch };
    return branches[idx];
}

export const deleteBranch = (id: number): Branch | null => {
    const idx = branches.findIndex(b => b.id === id);
    if (idx === -1) return null;
    return branches.splice(idx, 1)[0];
}