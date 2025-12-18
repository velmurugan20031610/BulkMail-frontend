import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/history")
      .then(res => setMails(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-blue-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Email History
      </h1>

      <table className="w-full bg-white rounded-lg shadow">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-3">Message</th>
            <th className="p-3">Emails Count</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {mails.map((mail, index) => (
            <tr key={index} className="text-center border-b">
              <td className="p-3">{mail.message}</td>
              <td className="p-3">{mail.emailList.length}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded text-white ${
                    mail.status === "Sent"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {mail.status}
                </span>
              </td>
              <td className="p-3">
                {new Date(mail.date).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
