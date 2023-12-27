import { useEffect } from "react";
import axios from "axios";
import ShowProfile from "@/pages/component/showProfile";

export default function TeacherDetails({ data }) {
  useEffect(() => {
    console.log(data[0]);
  });
  //<ShowProfile data={teachers}></ShowProfile>
  return <ShowProfile data={data[0]}></ShowProfile>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { teach } = params;
  const response = await axios.get(
    "http://localhost:3000/Teacher/findTeacherByName/" + teach
  );

  const data = await response.data;
  return { props: { data } };
}
