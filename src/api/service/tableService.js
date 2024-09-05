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
export async function addStudent(student){
    const { data, error } = await supabase.from('students').insert(student)
    console.log(data,error)
    return data
}
export async function updateStudent(student){
    console.log(student)
    const { error } = await supabase.from('students').update({
        groupName: student.groupName,
        studentName : student.studentName,
        studentSurname : student.studentSurname,
        studentCourse : student.studentCourse,
        sessionDone : student.sessionDone
    }).eq('id',student.id)
    return error
}
export async function deleteStudent(id){
    const { data, error } = await supabase.from('students').delete().eq("id",id)
    return data
}