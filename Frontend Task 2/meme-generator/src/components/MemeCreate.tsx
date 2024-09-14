import { useParams } from "react-router-dom";
import { useState } from "react";
import MemeCreationForm from "./MemeCreationForm";
import MemeCreatedDetails from "./MemeCreatedDetails";

const MemeCreate = () => {
  const { id } = useParams<{ id: string }>();
  const URL_caption_image = "https://api.imgflip.com/caption_image";

  const [text0, setText0] = useState<string>("");
  const [text1, setText1] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [memeData, setMemeData] = useState<any>(null);

  const postMemeDetails = async () => {
    const formData = new FormData();
    formData.append("template_id", id || "");
    formData.append("username", import.meta.env.VITE_TEST_VAR.VITE_IMGFLIP_USERNAME || "");
    formData.append("password", import.meta.env.VITE_TEST_VAR.VITE_IMGFLIP_PASSWORD || "");
    formData.append("text0", text0);
    formData.append("text1", text1);

    try {
      const response = await fetch(URL_caption_image, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setMemeData(responseData.data);
      } else {
        const errorData = await response.json();
        setErrorMessage("Error creating meme: " + errorData.error_message);
      }
    } catch (error: any) {
      setErrorMessage("Error: " + error.message);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text0.trim() === "" || text1.trim() === "") {
      setErrorMessage("Please enter Text Fields!");
    } else {
      postMemeDetails();
    }
  };

  return (
    <div className="row text-center">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="col-5" style={{ textAlign: "left" }}>
        <h3 className="m-3">Enter Text Fields</h3>
        <MemeCreationForm
          handleSubmit={handleSubmit}
          setText0={setText0}
          setText1={setText1}
          text0={text0}
          text1={text1}
        />
      </div>
      <div className="col-7">
        {memeData && <MemeCreatedDetails memeUrl={memeData.url} />}
      </div>
    </div>
  );
};

export default MemeCreate;
