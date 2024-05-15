import React from "react";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import "./Letter.css";
import parse from 'html-react-parser';

function LetterPdf() {
    const {
        companyName,
        logo,
        designation,
        text,
        empName,
        address,
        joiningDate,
        regards,
        subject
    } = useLocation().state;

//     var temp1 = `
// Subject line: Congratulations! Job Offer from FreedyGo

// Dear [Candidate's Name],
    
// We are pleased to offer you the position of [Job Title] at [Company Name]. After careful consideration, 
// we're confident that you possess the skills and experience necessary to excel in this role.
// As the [Job Title], you will be responsible for [brief mention of job responsibilities]. 
// You will be reporting to [Supervisor/Manager Name and Title] and your tentative start date will be [Start Date].
    
    
// The details of your compensation and benefits package are as follows:
    
// • Salary: [Amount]
    
// We're excited to have you join our team and look forward to working together.
    
// Congratulations once again, and welcome to [Company Name]!
    
    
// Kind regards,
    
// [Your Name and Job Title]`;

//     const temp = {
//         subject: "Offer Letter",
//         companyName : "Google",
//         logo : "data:image/png;base64,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",
//         designation: "Software Developer",
//         text: temp1,
//         empName: "Aakash Tupe",
//         address: "Jalna",
//         joiningDate: "15/05/2024",
//         regards: "Dhaval Shah"
//     };

//     const {
//             subject,
//             companyName,
//             logo,
//             designation,
//             text,
//             empName,
//             address,
//             joiningDate,
//             regards
//         } = temp;


    const generatePDF = () => {
        const doc = new jsPDF("p", "pt", "a4");
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0");
        let yyyy = today.getFullYear();
        today = dd + "-" + mm + "-" + yyyy;
        let pname = empName.split(" ").join('-');
        let filename = pname + '-' + today
        
        doc.html(document.getElementById("pdf-div"), {
            callback: function (pdf) {
                pdf.save(`${filename}.pdf`);
            },
        });

        // doc.setFont("Calibri", "nomal");
        // doc.setFontSize(14);
        // let y = 80;
        // let x = 40;
        // let offerLetterTextWidth = doc.getTextWidth(subject);
        // let center = (doc.internal.pageSize.width/2)- (offerLetterTextWidth/2);
        // doc.addImage(logo, "png", 10, 10, 120, 60);
        // y += 20;
        // doc.text(subject, center,y);
        // y += 20;
        // doc.text("Date: "+today, x, y);
        // y += 40;
        // const parser = new DOMParser();
        // var wrappedText = parser.parseFromString(text, "text/html");
        // wrappedText = doc.splitTextToSize(text, 500);

        // doc.text(wrappedText, x, y);
       
        // doc.save("test.pdf");


    };

    return (
        <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "#111827",
      }}
    >
      <div className="container">
        <div className="row">

        <h1 className='heading text-center' style={{color:'#24134d' }}>Preview</h1>

          <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-2" id="pdf-div" style={{backgroundColor:'white'}}>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex flex-row mt-2">
              <img
                src={logo}
                alt=""
                className="col-lg-2 col-md-2 col-sm-4 col-4 ms-3"
              />
            </div>
            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex flex-column mt-4 ms-3">
              <h5>{empName}</h5>
              {address && <h6>{address}</h6>}
              {designation && <h6>Designation: {designation}</h6>}
              {joiningDate && <h6>Joining Date: {joiningDate}</h6>}
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex flex-column mt-2 text-center">
              <h4 className="me-5"><u>{companyName}</u></h4>
            </div> */}
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 px-5 mt-2">
              <p className="me-5">
                <h2 className="text-center">Offer Letter</h2> 
                {parse(text)}
              </p>
            </div>
            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-12 d-flex flex-column mt-4 ms-3">
              <h6>Thanks and Regards,</h6>
              {regards && <h6>{regards}</h6>}
            </div> */}
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-content-center align-items-center text-center">
            <button
              className="btn btn-primary mb-2 mt-1 mybtn"
              onClick={generatePDF}
            >
              Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterPdf