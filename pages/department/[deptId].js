import axios from "axios";
import ShowProfile from "../component/showProfile";
import Link from "next/link";

export default function Teachers({ teachers }) {
  return (
    <>
      <h1>List of Teachers</h1>
      {teachers.Teachers.map((teacher) => {
        console.log(teacher);
        return (
          <Link href={"teacher/" + teacher.TeacherName}>
            <h2>{teacher.TeacherName}</h2>
          </Link>
        );
        
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { deptId } = params;
  const response = await axios.get(
    "http://localhost:3000/Teacher/getTeachersByDepartmentId/" + deptId
  ); //, {headers: {'Content-Type': 'application/json'}

  const data = await response.data;
  return { props: { teachers: data } };
}
