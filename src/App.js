import axios from "axios";
import { useState } from "react";
import * as XLSX from "xlsx";
import {Link} from "react-router-dom";
function App() {
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState(false);
  const [emailList, setEmailList] = useState([]);   // ✅ FIXED
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  function handlemsg(e) {
    setMsg(e.target.value);
  }

  function handlefile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: "A" });

      const emails = jsonData
        .map(item => item.A)
        .filter(email => email && email.includes("@"));

      setEmailList(emails);
      setCount(emails.length);
      setError("");
    };

    reader.readAsBinaryString(file);
  }

  function send() {
    if (!msg || count === 0) {
      setError("Please enter message and upload Excel");
      return;
    }

    setStatus(true);

    axios
      .post("https://bulkmail-backend-9e3h.onrender.com/sendemail", {
        msg,
        emailList
      })
      .then(res => {
        if (res.data === true) {
          alert("Email Sent Successfully");
          setMsg("");
          setCount(0);
          setEmailList([]);   // ✅ FIXED
        } else {
          alert("Failed to send email");
        }
        setStatus(false);
      })
      .catch(err => {
        console.log(err);
        alert("Server Error");
        setStatus(false);
      });
  }

  return (
    <div>
      <div className="bg-blue-950 text-white text-center">
        <h1 className="text-2xl font-medium px-5 py-3">BulkMail</h1>
      </div>

      <div className="bg-blue-800 text-white text-center">
        <h1 className="font-medium px-5 py-3">
          We can help your business with sending multiple emails
        </h1>
      </div>

      <div className="bg-blue-600 text-white text-center">
        <h1 className="font-medium px-5 py-3">Drag and Drop</h1>
      </div>

      <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-6">
        <textarea
          value={msg}
          onChange={handlemsg}
          className="w-[80%] h-32 py-2 outline-none px-2 border border-black rounded-md"
          placeholder="Enter the email text..."
        />

        <input
          type="file"
          onChange={handlefile}
          className="border-4 border-dashed py-4 px-4 mt-5 mb-3"
        />

        <p className="font-medium">
          Total Emails in the file: {count}
        </p>

        <button
          onClick={send}
          disabled={status}
          className="mt-3 bg-blue-950 py-2 px-4 text-white font-medium rounded-md"
        >
          {status ? "Sending..." : "Send"}
        </button>

        {error && (
          <p className="text-red-700 mt-2 font-medium">
            ❌ {error}
          </p>
        )}

        

        <Link to="/history" className="mt-4 text-blue-900 underline font-medium">
          View Email History
        </Link>

      </div>

      <div className="bg-blue-300 p-6"></div>
      <div className="bg-blue-200 p-6"></div>
    </div>
  );
}

export default App;
