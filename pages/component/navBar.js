import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import ShowProfile from "./showProfile";

export default function NavBar() {
  const [searchTeacher, setSearchTeacher] = useState("");
  const [valid, setValid] = useState(false);
  const [profile, setProfile] = useState(null);

  const getTeacherInfo = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      "http://localhost:3000/Teacher/findTeacherByName/" + searchTeacher
    );

    const data = await response.data;
    setProfile(data);
  };

  useEffect(() => {
    setValid(/^.+$/.test(searchTeacher));
  }, [searchTeacher]);

  return (
    <>
      <ul>
        <li key="department">
          <Link href={"/department"}>Department</Link>
        </li>
        <li key="insertTeacher">
          <Link href={"/department/insertEmployee"}>+ Add Teacher</Link>
        </li>
        <li key="insertDepartment">
          <Link href={"/department/insertDepartment"}>+ Add Department</Link>
        </li>
        <li key="searchTeacher">
          <input
            type="text"
            value={searchTeacher}
            onChange={(e) => {
              setSearchTeacher(e.target.value);
            }}
            placeholder="Write Teacher Name"
          />
          <button onClick={getTeacherInfo} disabled={!valid}>
            Search
          </button>
          {valid &&
            profile &&
            profile.map((p) => (
              <>
                <ShowProfile data={p}></ShowProfile>
              </>
            ))}
        </li>
      </ul>
    </>
  );
}
