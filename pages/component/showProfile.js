import { useEffect } from "react";

export default function ShowProfile(props) {
  useEffect(() => {
    console.log(props.data.TeacherName);
  });
  return (
    <>
      <div key={props.data.Email}>
        <p>Name: {props.data.TeacherName}</p>
        <p>Date: {props.data.Dob}</p>
        <p>Background: {props.data.EducationalBackground}</p>
        <p>ProfessionalExperience: {props.data.ProfessionalExperience}</p>
        <p>Web: {props.data.PersonalWebsite}</p>
      </div>
    </>
  );
}
