import React, { useState } from "react";

// list of categories
const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

// practice

const ProjectFilter = ({ currentFilter, changeFilter }) => {
  // handleClick
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };
  return (
    <div className='project-filter'>
      <nav>
        <p>Filter by:</p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            className={
              currentFilter === f ? "active" : "fff"
            }
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProjectFilter;
