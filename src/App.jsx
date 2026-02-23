import { useState, useEffect } from 'react'
import { getCandidateByEmail, getJobs } from './services/api'
import JobList from "./components/JobList"
//import './App.css'

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = "gianinamoreno92@gmail.com"

  useEffect(() => {
    const fetchData = async () => {  
      try {
        const candidateData = await getCandidateByEmail(email);
        //console.log("Candidate: ", candidateData);

        const jobsData = await getJobs();
        //console.log("Jobs: ", jobsData);

        setCandidate(candidateData);
        setJobs(jobsData);
     
      } catch (err) {
        //console.error("Error fetching candidate:", err);
        
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  if(loading) return <p> Loading candidate data... </p>;
  if(error) return <p> Error: {error}</p>;
  
  return(
    <div style={{padding: "2rem"}}>

      {candidate && (
        <div
          style={{marginBottom: "2rem", padding:"1rem", backgroundColor:"#f5f5f5", borderRadius:"8px"}}
        > 
          <h2>
            Applying as: {candidate.firstName} {candidate.lastName}
          </h2>
          <p>{candidate.email}</p>
          <p>ID: {candidate.candidateId} </p>
          <p>UUID: {candidate.uuid}</p>
        </div>
      )}


      <h1> Available Positions </h1>

      <JobList jobs={jobs} candidate={candidate}/>
        
    </div>
  
          
  );
}

export default App;
