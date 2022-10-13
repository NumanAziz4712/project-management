import React from "react";
import { Link } from "react-router-dom";
import "./ProjectList.css";
import Avatar from "./Avatar";
const ProjectList = ({ projects }) => {
  if (projects.length === 0) {
    return <p>No Projects yet</p>;
  }
  return (
    <div className='project-list'>
      {projects.map((project) => (
        <Link
          to={`/projects/${project.id}`}
          key={project.id}
        >
          <h4>{project.name}</h4>
          {/* we need to conver it into js date and then string to to output in the browser */}
          <p>
            Due by {project.dueDate.toDate().toDateString()}
          </p>
          <div className='assigned-to'>
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
