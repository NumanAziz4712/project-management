import "./Signup.css";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] =
    useState(null);

  // sign up hook
  const { signup, error, isPending } = useSignup();
  // handleFileChange
  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (selected.size > 200000) {
      setThumbnailError(
        "Image file size must be less than 100kb"
      );
      return;
    }
    // do something
    setThumbnailError(null);
    setThumbnail(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <h2>sign up</h2>
      <label>
        <span>email:</span>
        <input
          required
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          required
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input
          required
          type='file'
          onChange={handleFileChange}
        />

        {thumbnailError && (
          <div className='error'>{thumbnailError}</div>
        )}
      </label>
      <button
        className='btn'
        disabled={isPending ? true : false}
      >
        {isPending ? "loading..." : "Sign up"}
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default Signup;
