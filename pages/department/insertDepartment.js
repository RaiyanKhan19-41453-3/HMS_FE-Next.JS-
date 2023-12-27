import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function InsertDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const [validDept, setValidDept] = useState(false);
  const [deptHead, setDeptHead] = useState("");
  const [validDeptHead, setValidDeptHead] = useState(false);
  const [desc, setDesc] = useState("");
  const [validDesc, setValidDesc] = useState(false);
  const [detptEmail, setDeptEmail] = useState("");
  const [validDeptEmali, setValidDeptEmail] = useState(false);
  const [workers, setWorkers] = useState(0);

  const [success, setSuccess] = useState("");

  useEffect(() => {
    setValidDept(/^[A-Za-z]+$/.test(departmentName));
  }, [departmentName]);
  useEffect(() => {
    setValidDeptHead(/^[A-Za-z]+$/.test(deptHead));
  }, [deptHead]);
  useEffect(() => {
    setValidDesc(/^[A-Za-z]+$/.test(desc));
  }, [desc]);
  useEffect(() => {
    setValidDeptEmail(/^[A-Za-z0-9]+@[A-Za-z]+.com$/.test(detptEmail));
  }, [detptEmail]);

  const handleDeptSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("DepartmentName", departmentName);
    formData.append("DepartmentHead", deptHead);
    formData.append("Description", desc);
    formData.append("ContactEmail", detptEmail);
    try {
      const response = await axios.post(
        "http://localhost:3000/Teacher/AddDepartment",
        JSON.stringify({
          DepartmentName: departmentName,
          DepartmentHead: deptHead,
          Description: desc,
          ContactEmail: detptEmail,
          NumberOfWorkers: 0,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Department add successfully");
    } catch (error) {
      console.log(error);

      setSuccess("Department add unsuccessfull " + error);
    }
  };

  return (
    <>
      <h2>Inserting Department</h2>
      <form onSubmit={handleDeptSubmit}>
        <label htmlFor="DepartmentName">Department's Name</label>
        <input
          type="text"
          id="DepartmentName"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          placeholder="Depatment Name here..."
        />
        {!validDept && <p>Letters only</p>}

        <br></br>

        <label htmlFor="DepartmentHead">Department's Head</label>
        <input
          type="text"
          id="DepartmentHead"
          value={deptHead}
          onChange={(e) => setDeptHead(e.target.value)}
          placeholder="Depatment Head Name here..."
        />
        {!validDeptHead && <p>Letters only</p>}

        <br></br>

        <label htmlFor="DepartmentDesc">Department's Description</label>
        <input
          type="text"
          id="DepartmentDesc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Depatment Description here..."
        />
        {!validDesc && <p>Letters only</p>}

        <br></br>

        <label htmlFor="DepartmentEmail">Department's Email</label>
        <input
          type="text"
          id="DepartmentEmail"
          value={detptEmail}
          onChange={(e) => setDeptEmail(e.target.value)}
          placeholder="Depatment Email here..."
        />
        {!validDeptEmali && <p>It should follow ___@____.com pattern</p>}

        <button
          type="submit"
          disabled={
            !validDept || !validDeptHead || !validDeptEmali || !validDesc
          }
        >
          Add Department
        </button>
      </form>
    </>
  );
}
