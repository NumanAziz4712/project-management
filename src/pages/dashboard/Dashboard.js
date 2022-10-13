import { useState } from "react";
// styles
import { useCollection } from "../../hooks/useCollections";
import "./Dashboard.css";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";

const Dashboard = () => {
  const [currentFilter, setCurrentFilter] = useState("all");
  const { documents, error, loading } = useCollection(
    "projects",
    null,
    ["createdAt", "desc"]
  );
  const { user } = useAuthContext();

  // handle filter
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  // filteredArray
  const projects =
    documents &&
    documents.filter((document) => {
      switch (currentFilter) {
        case "all":
          return true;
        // -----------
        // case mine
        // -----------
        case "mine":
          let assigndToMe = false;
          document.assignedUsersList.forEach((u) => {
            if (user.uid === u.id) {
              assigndToMe = true;
            }
          });

          return assigndToMe;

        case "development":
        case "design":
        case "marketing":
        case "sales":
          return document.category === currentFilter;
        default:
          return true;
      }
    });
  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {loading ? (
        <p style={{ textAlign: "center" }}>
          Fetching Projects
        </p>
      ) : (
        documents && <ProjectList projects={projects} />
      )}
    </div>
  );
};

export default Dashboard;
