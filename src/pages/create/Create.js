import React from "react";
import "./Create.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollections";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

// categories

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];
const Create = () => {
  const { documents } = useCollection("users");
  const { user } = useAuthContext();
  const { addDocument, response } =
    useFirestore("projects");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // form field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  // useEffect
  useEffect(() => {
    if (documents) {
      const options = documents.filter((user) => {
        return user.online === false;
      });
      // setUsers(options);
      const filteredOpt = options.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(filteredOpt);
    }
  }, [documents]);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // reset the errors before submitting the form
    setFormError(null);

    // we cant add required to the custom select
    // so we manually add them here
    if (!category) {
      setFormError("Please select a project category");
      return;
    }

    // we cant use !assignedUsers, cause empty [] is still
    // a value and it failt to check
    if (assignedUsers.length < 1) {
      setFormError(
        "Please assign the project to at least 1 user"
      );
      return;
    }

    // we need few properties from user

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    // assignedUsersList
    // we dont need label and value so ..
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    // project object
    const project = {
      name,
      details,
      category: category.value,
      // this create a time stamp for us
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    // this will await the data
    // it wont fire the below code before the addDoc func returns sth
    await addDocument(project);
    if (!response.error) {
      navigate("/");
    }
  };
  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type='date'
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <button className='btn'>
          {response.isPending ? "Adding..." : "Add Project"}
        </button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
