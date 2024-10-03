import React from "react";
import Button from "react-bootstrap/Button";
import successImage from "./success.jpg";

const QuestionsComponent = ({ questions }) => {
    const handleSpeechOutput = (text) => {
        let speech = new SpeechSynthesisUtterance();
        speech.voice = window.speechSynthesis.getVoices()[5];
        speech.text = text.slice(3);
        window.speechSynthesis.speak(speech);
    };

    return (
        <>
            <h3 className="my-3" style={{ color: "#297fff" }}>
                Answer the following questions:
            </h3>

            {questions.map((question, index) => (
                <div key={index}>
                    <div className="my-3" style={{ display: "flex" }}>
                        <div className="py-4 px-2">
                            <i
                                className="fa-solid fa-volume-high fa-xl"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleSpeechOutput(question)}
                            />
                        </div>
                        <textarea
                            className="form-control dark"
                            id={`exampleFormControlTextarea${index}`}
                            rows="3"
                            placeholder={question}
                        />
                    </div>
                </div>
            ))}

            {/* Modal Button */}
            <Button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ width: "100%" }}
            >
                Submit
            </Button>

            {/* Modal */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Success!
                            </h1>
                            <Button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></Button>
                        </div>
                        <div className="modal-body">
                            Congrats! You have successfully submitted your{" "}
                            <b>Online Interview</b>
                            <img
                                src={successImage}
                                className="pt-3"
                                width={"100%"}
                            />
                        </div>
                        <div className="modal-footer">
                            <Button
                                type="button"
                                className="btn"
                                data-bs-dismiss="modal"
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuestionsComponent;
