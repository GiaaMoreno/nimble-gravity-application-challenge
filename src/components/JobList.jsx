import JobItem from "./JobItem";

const JobList = ({jobs, candidate}) => {
    return (
        <div>
            {jobs.map((job)=> (
                <JobItem key={job.id} job={job} candidate={candidate}/>
            ))}
        </div>
    );
};

export default JobList;