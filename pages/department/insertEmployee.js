import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function InsertEmployee() {
  const [teacherName, setTeacherName] = useState("");
  const [validName, setValidName] = useState(false);
  const [teacherDob, setTeacherDob] = useState("");
  const [validDob, setValidDob] = useState(false);
  const [teacherPhone, setTeacherPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [teacherAddress, setTeacherAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [validStatus, setValidStatus] = useState(false);

  const [showTextBox, setShowTextBox] = useState(false);
  const [textList, setTextList] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [validBackground, setValidBackground] = useState(false);

  const [teacherExperience, setTeacherExperience] = useState("");
  const [validExp, setValidExp] = useState(false);
  const [teacherWeb, setTeacherWeb] = useState("");
  const [validWeb, setValidWeb] = useState(false);
  const [file, setFile] = useState(false);
  const [validImg, setValidImg] = useState(false);
  const [dept, setDept] = useState("");
  const [validDept, setValidDept] = useState(false);

  const [success, setSuccess] = useState("");

  const toggleTextBox = (e) => {
    e.preventDefault();
    setShowTextBox((prev) => !prev);
  };

  const handleTextChange = (e) => {
    setCurrentText(e.target.value);
  };

  const validateFile = (event) => {
    const fileInput = event.target;
    const allowedFileExtensions = /\.(jpg|jpeg|png)$/;

    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      let state = allowedFileExtensions.test(fileName);
      state ? setFile(fileInput.files[0]) : null;
      setValidImg(allowedFileExtensions.test(fileName));
    } else {
      setValidImg(false);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (currentText.trim() !== "") {
      setTextList([...textList, currentText]);
      setCurrentText("");
    }
  };

  const deleteText = (e, index) => {
    e.preventDefault();
    const updatedTextList = [...textList];
    updatedTextList.splice(index, 1);
    setTextList(updatedTextList);
  };

  const toggleEdit = (e, index) => {
    e.preventDefault();
    setEditIndex(index);
    setCurrentText(textList[index]);
    setShowTextBox(false);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setEditIndex(null);
    setCurrentText("");
    setShowTextBox(true);
  };

  const handleTextUpdate = (e) => {
    e.preventDefault();
    if (currentText.trim() !== "") {
      const updatedTextList = [...textList];
      updatedTextList[editIndex] = currentText;
      setTextList(updatedTextList);
      setEditIndex(null);
      setCurrentText("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const concatenatedText = textList.join(", ");
    formData.append("TeacherName", teacherName);
    formData.append("Dob", teacherDob);
    formData.append("Phone", teacherPhone);
    formData.append("Email", teacherEmail);
    formData.append("Address", teacherAddress);
    formData.append("EmploymentStatus", employmentStatus);
    formData.append("EducationalBackground", concatenatedText);
    formData.append("ProfessionalExperience", teacherExperience);
    formData.append("PersonalWebsite", teacherWeb);
    formData.append("myfile", file);
    formData.append("DepartmentId", dept);

    try {
      const response = await axios.post(
        "http://localhost:3000/Teacher/addTeacherProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Teacher add successfully");
    } catch (error) {
      console.log(error);

      setSuccess("Teacher add unsuccessfull " + error);
    }
  };

  useEffect(() => {
    let state = /^[A-Za-z]+[A-Za-z0-9]+$/.test(teacherName);
    console.log(state);
    setValidName(state);
  }, [teacherName]);
  useEffect(() => {
    setValidDob(/^.+$/.test(teacherDob));
  }, [teacherDob]);
  useEffect(() => {
    setValidEmail(/^[A-Za-z0-9]+@[A-Za-z]+.com$/.test(teacherEmail));
  }, [teacherEmail]);
  useEffect(() => {
    setValidAddress(/^[a-zA-Z0-9\s.,#-]+$/.test(teacherAddress));
  }, [teacherAddress]);
  useEffect(() => {
    setValidStatus(/^.+$/.test(employmentStatus));
  }, [employmentStatus]);
  useEffect(() => {
    setValidBackground(textList.length !== 0);
  }, [textList]);
  useEffect(() => {
    setValidExp(/^[0-9]+$/.test(teacherExperience));
  }, [teacherExperience]);
  useEffect(() => {
    setValidWeb(/^.+$/.test(teacherWeb));
  }, [teacherWeb]);
  useEffect(() => {
    setValidDept(/^[0-9]+$/.test(dept));
  }, [dept]);
  useEffect(() => {
    setValidPhone(/^\+880[0-9]{10}$/.test(teacherPhone));
  }, [teacherPhone]);

  return (
    <>
      <section>
        <h2>Inserting Employee</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="TeacherName">Teacher's Name</label>
          <input
            type="text"
            id="TeacherName"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Teacher Name here..."
          />
          {!validName && <p>Name consists of Letters and numbers</p>}

          <br></br>

          <label htmlFor="Dob">Date of Birth</label>
          <input
            type="datetime-local"
            id="Dob"
            value={teacherDob}
            onChange={(e) => setTeacherDob(e.target.value)}
          />
          {!validDob && <p>Date Required</p>}

          <br></br>

          <label htmlFor="Phone">Phone</label>
          <input
            type="text"
            id="Phone"
            value={teacherPhone}
            onChange={(e) => setTeacherPhone(e.target.value)}
            placeholder="Phone Number here..."
          />
          {!validPhone && <p>Number should follow +880********* pattern</p>}

          <br></br>

          <label htmlFor="Email">Email</label>
          <input
            type="text"
            id="Email"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
            placeholder="Email here..."
          />
          {!validEmail && <p>Invalid Email</p>}

          <br></br>

          <label htmlFor="Address">Address</label>
          <textarea
            type="text"
            id="Address"
            value={teacherAddress}
            onChange={(e) => setTeacherAddress(e.target.value)}
            placeholder="Address here..."
          />
          {!validAddress && (
            <p>Address should contain Letters, numbers, :, -</p>
          )}

          <br></br>

          <label>
            <input
              type="radio"
              name="employmentStatus"
              value="Employed"
              checked={employmentStatus === "Employed"}
              onChange={(e) => setEmploymentStatus(e.target.value)}
            />
            Employed
          </label>
          <label>
            <input
              type="radio"
              name="employmentStatus"
              value="Unemployed"
              checked={employmentStatus === "Unemployed"}
              onChange={(e) => setEmploymentStatus(e.target.value)}
            />
            Unemployed
          </label>
          {!validStatus && <p>Must choose one of them</p>}

          <br></br>

          <button onClick={toggleTextBox}>
            {showTextBox ? "Close it" : "Add Educational Background"}
          </button>

          {showTextBox && (
            <div>
              <textarea
                id="EducationalBackground"
                value={currentText}
                onChange={handleTextChange}
                placeholder="Educational Background here..."
              />
              <button onClick={handleTextSubmit}>
                Submit Educational Background
              </button>
            </div>
          )}

          <div>
            <h3>Entered Educational Background:</h3>
            <ul>
              {textList.map((text, index) => (
                <li key={index}>
                  {editIndex === index ? (
                    <>
                      <textarea
                        type="text"
                        value={currentText}
                        onChange={handleTextChange}
                        placeholder="Educational Background here for update..."
                      />
                      <button onClick={handleTextUpdate}>Update</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {text}
                      <button onClick={(e) => deleteText(e, index)}>
                        Delete
                      </button>
                      <button onClick={(e) => toggleEdit(e, index)}>
                        Edit
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {!validBackground && <p>Must have one Background</p>}

          <br></br>

          <label htmlFor="ProfessionalExperience">
            Professional Experience
          </label>
          <input
            type="text"
            id="ProfessionalExperience"
            value={teacherExperience}
            onChange={(e) => setTeacherExperience(e.target.value)}
            placeholder="Write Experience years here..."
          />
          {!validExp && <p>Experience should be in years</p>}

          <br></br>

          <label htmlFor="PersonalWebsite">Personal Website</label>
          <input
            type="text"
            id="PersonalWebsite"
            value={teacherWeb}
            onChange={(e) => setTeacherWeb(e.target.value)}
            placeholder="Personal Website here..."
          />
          {!validWeb && <p>Web Required</p>}

          <br></br>

          <label htmlFor="UploadImage">Upload Image</label>
          <input type="file" id="UploadImage" onChange={validateFile} />
          {!validImg && <p>Image only here</p>}

          <br></br>

          <label htmlFor="Department_Id">Department Id</label>
          <input
            type="text"
            id="Department_Id"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            placeholder="Department Id here..."
          />
          {!validDept && <p>Dept Number only</p>}

          <br></br>

          <button
            type="submit"
            disabled={
              !validName ||
              !validDob ||
              !validPhone ||
              !validEmail ||
              !validAddress ||
              !validStatus ||
              !validBackground ||
              !validExp ||
              !validImg ||
              !validDept
            }
          >
            Add Employee
          </button>
        </form>
      </section>
    </>
  );
}
