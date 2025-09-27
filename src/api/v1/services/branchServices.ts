import { Branch, branches } from "../../../data/branches";

export const getAllBranches = (): Branch[] => {
    return branches;
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

