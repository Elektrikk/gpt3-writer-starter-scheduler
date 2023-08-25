import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import buildspaceLogo from "../assets/buildspace-logo.png";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  // const [userInput2, setUserInput2] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  // const onUserChangedText2 = (event) => {
  //   console.log(event.target.value);
  //   setUserInput2(event.target.value);
  // };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Streamline Your Daily Schedule</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Automate Your Schedule and Free Up Time for What Matters With the
              Help of ChatGPT3.
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="Give us some details fo your day to help us generate a better schedule for you! The more the details the better it is."
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          ;
        </div>
        {/* <div className="prompt-container">
          <textarea
            placeholder="What kind of anime do you like?"
            className="prompt-box-2"
            value={userInput2}
            onChange={onUserChangedText}
          />
          ;
        </div> */}
        <div className="prompt-buttons">
          <a className={ isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
            <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
