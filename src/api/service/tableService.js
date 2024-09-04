import supabase from "../client";

export async function getTableData() { 
    const { data, error } = await supabase.from('students').select("id, groupName, studentName, studentSurname, studentCourse, sessionDone")
    console.log(data,error)
    return data
}
export async function getTableDataByName(name){
    const { data, error } = await supabase.from('students').select("id, groupName, studentName, studentSurname, studentCourse, sessionDone").like('studentName',`%${name}%`)
    console.log(data,error)
    return data
}