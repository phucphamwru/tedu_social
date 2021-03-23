//check các key object truyền vào.
export const isEmptyObject = (obj: object): boolean => {
    return !Object.keys(obj).length;
};