import React from "react";
import Button from "react-bootstrap/Button";
import QuestionsComponent from "./QuestionsComponent";
import { GoogleGenerativeAI } from "@google/generative-ai";

const FormComponent = () => {
    const [questions, setQuestions] = React.useState([]);
    let result;
    let response;
    let text;

    const handleSubmitButton = async () => {
        try {
            const genAI = new GoogleGenerativeAI(
                "AIzaSyAs0EUuGx5Po4e5EE_2_aFV7df6y38AQRc"
            );
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });

            const prompt = `
Full Name: ${document.getElementsByClassName("fullname")[0].value}
What Position are you applying for: ${
                document.getElementsByClassName("position")[0].value
            }
Salary Expectation: ₹${document.getElementsByClassName("salary")[0].value}
Previous Job Titles / Employment History: ${
                document.getElementsByClassName("previousjobs")[0].value
            }
Highest Level of Education / Degree and Education: ${
                document.getElementsByClassName("education")[0].value
            }
Technical Skills: ${document.getElementsByClassName("skills")[0].value}

These are the details of a candidate who has applied for an interview.
Generate 5 interview questions for this candidate.
Don't give any extra text.
Give me only questions in this format:
1. Question
2. Question
...
      `;

            result = await model.generateContent(prompt);
            response = result.response;

            document.getElementsByClassName("fullname")[0]        .setAttribute("disabled", "true");
            document.getElementsByClassName("phonenumber")[0]     .setAttribute("disabled", "true");
            document.getElementsByClassName("email")[0]           .setAttribute("disabled", "true");
            document.getElementsByClassName("position")[0]        .setAttribute("disabled", "true");
            document.getElementsByClassName("salary")[0]          .setAttribute("disabled", "true");
            document.getElementsByClassName("previousjobs")[0]    .setAttribute("disabled", "true");
            document.getElementsByClassName("education")[0]       .setAttribute("disabled", "true");
            document.getElementsByClassName("skills")[0]          .setAttribute("disabled", "true");
            document.getElementsByClassName("formsubmitbutton")[0].setAttribute("disabled", "true");
            document.getElementsByClassName("fullname")[0]        .style.cursor = "not-allowed";
            document.getElementsByClassName("phonenumber")[0]     .style.cursor = "not-allowed";
            document.getElementsByClassName("email")[0]           .style.cursor = "not-allowed";
            document.getElementsByClassName("position")[0]        .style.cursor = "not-allowed";
            document.getElementsByClassName("salary")[0]          .style.cursor = "not-allowed";
            document.getElementsByClassName("previousjobs")[0]    .style.cursor = "not-allowed";
            document.getElementsByClassName("education")[0]       .style.cursor = "not-allowed";
            document.getElementsByClassName("skills")[0]          .style.cursor = "not-allowed";
            document.getElementsByClassName("formsubmitbutton")[0].style.cursor = "not-allowed";

            if (response && response.text) {
                text = response.text();
                const questionsArray = text
                    .split("\n")
                    .filter((q) => q.trim() !== "");
                setQuestions(questionsArray);
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    };

    return (
        <>
            <div style={{ display: "flex", boxSizing: "border-box" }}>
                <div
                    className="form container-fluid mx-2"
                    style={{ width: "50vw" }}
                >
                    <h3 className="my-3" style={{ color: "#297fff" }}>
                        Please enter your details:
                    </h3>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="fullname form-control"
                            placeholder="Full Name"
                            aria-label="full-name"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="number"
                            className="phonenumber form-control"
                            placeholder="Phone Number"
                            aria-label="phone-number"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="email"
                            className="email form-control"
                            placeholder="Email"
                            aria-label="email"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="position form-control"
                            placeholder="What Position are you applying for"
                            aria-label="position"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            ₹
                        </span>
                        <input
                            type="number"
                            className="salary form-control"
                            placeholder="Salary Expectation"
                            aria-label="salary"
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="previousjobs form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Previous Job Titles / Employment History"
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="education form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Highest Level of Education / Degree and Education"
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="skills form-control"
                            id="exampleFormControlTextarea1"
                            rows="1"
                            placeholder="Technical Skills"
                        />
                    </div>
                    <Button
                        className="formsubmitbutton"
                        onClick={handleSubmitButton}
                        style={{ width: "100%" }}
                    >
                        Submit
                    </Button>
                </div>

                <div
                    className="interview-questions mx-3"
                    style={{
                        width: "50vw",
                        paddingLeft: "0px",
                        marginLeft: "0px",
                    }}
                >
                    {questions.length > 0 && (
                        <QuestionsComponent questions={questions} />
                    )}
                </div>
            </div>
        </>
    );
};

export default FormComponent;
