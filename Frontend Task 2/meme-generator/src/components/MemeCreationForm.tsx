import React from "react";

interface MemeCreationFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setText0: React.Dispatch<React.SetStateAction<string>>;
  setText1: React.Dispatch<React.SetStateAction<string>>;
  text0: string;
  text1: string;
}

const MemeCreationForm: React.FC<MemeCreationFormProps> = ({
  handleSubmit,
  setText0,
  setText1,
  text0,
  text1,
}) => {
  return (
    <div>
      <form className="m-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="text0" className="form-label">
            Top text for the meme
          </label>
          <input
            type="text"
            className="form-control"
            id="text0"
            value={text0}
            onChange={(e) => setText0(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text1" className="form-label">
            Bottom text for the meme
          </label>
          <input
            type="text"
            className="form-control"
            id="text1"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MemeCreationForm;
