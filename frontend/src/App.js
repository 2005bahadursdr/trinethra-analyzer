
import React, { useState } from "react";
import data from "./data/transcripts.json";
import "./app.css";

function App() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ transcript })
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: true, raw: err.message });
    }

    setLoading(false);
  };

 return (
  <div className="container">
    <h2 className="title">Supervisor Feedback Analyzer</h2>

    <div className="card">
      <label>Select Sample Transcript</label>
      <select
        value={selected}
        onChange={(e) => {
          const index = e.target.value;
          setSelected(index);
          if (index !== "") {
            setTranscript(data.transcripts[index].transcript);
          }
        }}
      >
        <option value="">-- Select Sample Transcript --</option>
        {data.transcripts.map((t, i) => (
          <option key={i} value={i}>
            {t.fellow.name} - {t.company.name}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Paste transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <button onClick={handleAnalyze}>
        Run Analysis
      </button>

      {loading && <p>⏳ Analyzing... please wait</p>}
    </div>

    {result && !result.error && (
      <div className="card">

        <div className="section">
          <h3>Evidence</h3>
          <ul>
            {result.evidence?.map((e, i) => (
              <li key={i}>
                "{e.quote}" →{" "}
                <span className={`tag ${e.tag}`}>
                  {e.tag}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Score</h3>
          <div className="score-box">
            {result.score?.value} / 10
          </div>
          <p>{result.score?.justification}</p>
        </div>

        <div className="section">
          <h3>KPIs</h3>
          <ul>
            {result.kpis?.map((k, i) => (
              <li key={i}>
                {typeof k === "string" ? k : k.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Gaps</h3>
          <ul>
            {result.gaps?.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
        </div>

        <div className="section">
          <h3>Follow-up Questions</h3>
          <ul>
            {result.questions?.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>

      </div>
    )}

    {result && result.error && (
      <div className="card">
        <h3>Error parsing output</h3>
        <pre>{result.raw}</pre>
      </div>
    )}
  </div>
);

}

export default App;