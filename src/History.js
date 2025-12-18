import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://bulkmail-backend-9e3h.onrender.com/history")
      .then(res => {
        setMails(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-blue-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Email History
      </h1>

      {loading ? (
        <p className="text-center font-medium">Loading...</p>
      ) : mails.length === 0 ? (
        <p className="text-center font-medium">No email history found</p>
      ) : (
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
                <td className="p-3">
                  {mail.message || "No message"}
                </td>

                <td className="p-3">
                  {mail.emailList ? mail.emailList.length : 0}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      mail.status === "Sent"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {mail.status || "Unknown"}
                  </span>
                </td>

                <td className="p-3">
                  {mail.date
                    ? new Date(mail.date).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
