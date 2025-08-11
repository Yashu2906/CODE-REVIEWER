import React, { useEffect, useState } from "react";
import prism from "prismjs";
import axios from "axios";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "https://esm.sh/rehype-highlight@6";
import "highlight.js/styles/github-dark.css";
import "./app.css";

const App = () => {
  const [code, setCode] = useState(`function sum(){
    return 1+1}`);
  const [review, setReview] = useState("");
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setReviewing(true); // Show loading state
    try {
      const response = await axios.post("http://localhost:3000/review-code", {
        code,
      });
      setReview(response.data.review);
    } catch (error) {
      console.error("Error fetching review:", error);
    } finally {
      setReviewing(false);
    }
  } // Runs when `code` changes

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code","Fire Mono",monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                height: "100%",
                width: "100%",
                borderRadius: "5px",
              }}
            ></Editor>
          </div>
          <button className="review" onClick={reviewCode}>
            Review
          </button>
        </div>

        <div className="right">
          {reviewing ? (
            <h2 className="reviewing">Reviewing...</h2>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
