import { useState } from "react";
import { applyToJob } from "../services/api";

const JobItem = ({ job, candidate}) => {
    const [repoUrl, setRepoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        setMessage("");

        if (!repoUrl.startsWith("https://github.com/")) {
            setMessage("Please enter a valid repository URL");
            setLoading(false);
            return;
        }
        
        try {
            const response = await applyToJob({
                uuid: candidate.uuid,
                jobId: job.id,
                candidateId: candidate.candidateId,
                repoUrl: repoUrl,
            });

            if (response.ok) {
                setMessage("Application submitted successfully!");
            }
        } catch (error) {
            setMessage("Error submitting application");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="job-card">

            <h3>{job.title}</h3>

         <input
            type="text"
            placeholder="Enter GitHub repository URL"
            value= {repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            style={{width: "100%", marginBottom: "0.5rem"}}

         />

         <button onClick={handleSubmit}  disabled={loading || !repoUrl}>
            {loading ? "Submitting..." : "Submit"}
         </button>

        {message && <p>{message}</p>}
        </div>
    );
};

export default JobItem;