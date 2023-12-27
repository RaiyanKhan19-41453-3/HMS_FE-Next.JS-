import axios from "axios"
import Link from "next/link"

export default function Department({ depts }) {
    return (
        <>
            <h1>List of Departments</h1>
            {depts.map((dept)=> {
                return(
                    <Link href={'department/'+dept.DeptId}>
                        <h2>{dept.DepartmentName}</h2>
                    </Link>
                )
            })}
        </>
    )
}


export async function getServerSideProps() {
    const response = await axios.get('http://localhost:3000/Teacher/getDepartments')//, {headers: {'Content-Type': 'application/json'}
    
    const data = await response.data
    console.log(data)
    return { props: { depts: data } }
}