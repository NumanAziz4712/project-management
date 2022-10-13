import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import "./Project.css";
import ProjectComments from "./ProjectComments";
import ProjectSummary from "./ProjectSummary";

const Project = () => {
  const { id } = useParams();
  const { error, document } = useDocument("projects", id);

  if (error) {
    return <div className='error'>{error}</div>;
  }
  if (!document) {
    return <div className='loading'>Loading...</div>;
  }
  return (
    <div className='project-details'>
      {document && <ProjectSummary project={document} />}
      <ProjectComments project={document && document} />
    </div>
  );
};

export default Project;
