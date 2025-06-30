export function useFilterRows(data,text,key) {

    const filterByValue = (item, text) => {
        return key.some(k => { 
            return item[k]?.toLowerCase()?.includes(text.toLowerCase())});
    };
    const filterRows = data.filter((item) => {
        return filterByValue(item, text);
    });
    return filterRows;
}