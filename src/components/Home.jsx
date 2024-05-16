import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import "./Home.css";
import { QuillFormats, QuillModules } from '../util/quill';
import { useQuill } from 'react-quilljs';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate=useNavigate();
    const quillRef = useRef(null);

    const [logo, setLogo] = useState("https://www.freedygo.com/images/freedyGo.png");
    const [subject, setSubject] = useState("Offer Letter");
    const [companyName, setCompanyName] = useState("");
    const [designation, setDesignation] = useState("");
    const [empName, setEmpName] = useState("");
    const [address, setAddress] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [text, setText] = useState("");
    const [regards, setRegards] = useState("");
    const [salary, setSalary] = useState("");
    const [lastCursorPosition, setLastCursorPosition] = useState(null);
    const [secondHalfText, setSecondHalfText] = useState(null);

    const handleInputChange = (setter, value) => {
        setter(value);
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            const cursorPosition = lastCursorPosition !== null ? lastCursorPosition : editor.getLength(); // Default to end if no position
            let firstHalf = editor.getText(0, cursorPosition);
            let secondHalf = { secondHalfText }.secondHalfText;
            if(!(firstHalf == "\n" && secondHalf == null)){
                console.log(firstHalf, secondHalf);
                var newText = firstHalf + value + secondHalf;
                editor.setText(newText);
    
                setLastCursorPosition(lastCursorPosition);
            }
            
        }
    };

   const handleEditorChange = (content, delta, source, editor) => {
        setText(content);
        EditorHandler(content, delta, source, editor);
    };

    const handleEditorFocus = (content, delta, source, editor) => {
        EditorHandler(content, delta, source, editor);
    };

    const EditorHandler = (content, delta, source, editor) => {
        if (quillRef.current) {
            if(source != "api"){
                // const editor = quillRef.current.getEditor();
                let position = (editor.getSelection() == null) ? 0 : editor.getSelection().index;
                let secondHalf = editor.getText(position);
                setSecondHalfText(secondHalf);
                setLastCursorPosition(position); // Update cursor position on focus
            }
        }
    };


    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setLogo(base64.toString());
    }

    const convertBase64 = (file) => {
        console.log('converting');
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = (err) => {
                reject(err);
            }
        })
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        if(!designation.trim() || !text.trim() || !empName.trim() || !joiningDate.trim() || !text.trim())
        alert("Designation, Texat Area, Employee Name, Joining Date  are required!");
        else{
          navigate(`generateletter`,{state:{companyName,subject,logo,designation,text,empName,address,regards, salary}});
        }
    }

    return (
        <div className='d-flex'>
            <div id="editor" className='container col-lg-6 col-md-6 col-sm-12 col-12'>

                <div className="form-group text-center">
                    <div className="logo-cotainer text-center ">
                        <img id="companyLogo" alt='Logo here' width="220px" height="140px" src={logo} />
                    </div>
                    <label for="file" className="upload-log-btn" >Upload Logo</label>
                    <input id="file" type="file" onChange={(e) => uploadImage(e)}></input>
                </div>
                <ReactQuill
                    modules={QuillModules}
                    formats={QuillFormats}
                    theme="snow"
                    value={text}
                    ref={quillRef}
                    placeholder='Enter Content Here'
                    onChange={handleEditorChange}
                    onFocus={handleEditorFocus}
                    />
            </div>

            <div id="fieldContainer" className="col-lg-6 col-md-6 col-sm-12 col-12">

                {/* <div class="form-group">
                    <label for="company">Company Name</label>
                    <input type="text" autoComplete='off' className=".input-text form-control" id="company" placeholder="Enter Company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div> */}

                <div class="form-group">
                    <label for="empName">Candidate Name</label>
                    <input type="text" autoComplete='off' className="form-control" id="empName" placeholder="Enter Employee" value={empName} onChange={(e) => handleInputChange(setEmpName, e.target.value)} />
                </div>
                <div class="form-group">
                    <label for="desg">Designation</label>
                    <input type="text" autoComplete='off' className=".input-text form-control" id="desg" placeholder="Enter Designation" value={designation} onChange={(e) => handleInputChange(setDesignation, e.target.value)} />
                </div>

                <div class="form-group">
                    <label for="salary">Salary</label>
                    <input type="text" autoComplete='off' className=".input-text form-control" id="salary" placeholder="Enter Company" value={salary} onChange={(e) => handleInputChange(setSalary, e.target.value)} />
                </div>

                <div class="form-group">
                    <label for="joiningDate">Joining Date</label>
                    <input type="text" placeholder="dd/mm/yy" autoComplete='off' className="form-control" id="joiningDate" value={joiningDate} onChange={(e) => handleInputChange(setJoiningDate, e.target.value)} />
                </div>

                <div class="form-group">
                    <label for="regards">Regards</label>
                    <input type="text" autoComplete='off' className="form-control" id="regards" placeholder="Enter Regards" value={regards} onChange={(e) => handleInputChange(setRegards, e.target.value)} />
                </div>
                <div class="form-group">
                    <button type="submit" onClick={submitHandler} class="submit-btn">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Home
