// frontend/src/components/main.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./sidebar";
import Security from "./Asset/security.png";
import Landing from "./Landing";
import "./land.css";

function Main() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8); // Default password length
  const [userinput, setUserinput] = useState("");
  const [copied, setCopied] = useState("");

  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [inputError, setInputError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("Weak Password");
  const [check, setCheck] = useState("");

  const checkPasswordStrength = (passwordLength) => {
    if (passwordLength <= 4) {
      return "Bad Password";
    } else if (passwordLength <= 11) {
      return "Weak Password";
    } else if (passwordLength >= 11) {
      return "Strong Password";
    } else {
      return "Unknown Strength";
    }
  };

  const handlePasswordLengthChange = (event) => {
    const input = event.target.value;
    setPasswordLength(Number(input));
    const strength = checkPasswordStrength(Number(input));
    setPasswordStrength(strength);
  };
  const hangleUserInput = (event) => {
    const input = event.target.value;
    setUserinput(input);
  };

  const generatePassword = async () => {
    if (
      !includeSpecialChars &&
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers
    ) {
      // None of the options is selected, do not send a request
      return;
    }

    setInputError(false);
    setAlertMessage(""); // Clear the alert message
    // Make a POST request to the Python backend API
    const response = await fetch("http://localhost:5000/generate_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        length: passwordLength,
        userinput: userinput,
        includeSpecialChars,
        includeUppercase,
        includeLowercase,
        includeNumbers,
      }), // Pass the user-specified password length
    });

    const data = await response.json();
    //changing the data comes from backend to string
    let newData = String(data.password);
    setPassword(newData);
    // setPassword(data.password);
    setCheck(data.password.length);
  };

  const copyToClipboard = () => {
    // Create a temporary input field to copy the password to the clipboard
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = password;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // alert("Password copied to clipboard");
    setCopied("Password copied to clipboard");
    setTimeout(() => {
      setCopied("");
    }, 3000); // 3000 milliseconds (3 seconds)
  };

  const getPasswordColor = (passwordStrength) => {
    if (passwordStrength === "Bad Password") {
      return "text-red-500 border-red-600"; // Red color for bad password
    } else if (passwordStrength === "Weak Password") {
      return "text-yellow-500 border-yellow-500"; // Yellow color for weak password
    } else if (passwordStrength === "Strong Password") {
      return "text-green-500 border-green-500"; // Green color for strong password
    } else {
      return "text-white"; // Default color for unknown strength
    }
  };

  useEffect(() => {
    // Call the generatePasswordOnLoad function when the component mounts
    generatePassword();
  }, [includeSpecialChars, includeUppercase, includeLowercase, includeNumbers]);

  return (
    <div className="p-10 border-t-2 border-white">
      <Landing />
      {/* The first and second div starts here  */}
      <div className="flex flex-col-reverse gap-5 lg:flex-row h-screen justify-around items-center">
        {/* First or left-side div */}
        <div className="lg:w-1/2 border-2 border-white p-5 h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-center text-white">
            Test our best Secure Password Generator platform
          </h1>
        </div>
        {/* Second or right-side div */}
        <div className="flex items-start justify-center h-screen bg-gradient-to-t from-[#845ec2] via-[#845ec2] to-[#B199D0] lg:w-1/2 p-3">
          <div className="flex flex-col all">
            <p className="text-center text-white text-3xl lg:text-5xl font-poppins font-bold p-5 capitalize">
              Generated Password:
            </p>
            <div className="main border-2 border-white p-5 w-full rounded text-center z-20">
              <span
                onClick={copyToClipboard}
                className="p-3 overflow-hidden  text-white cursor-pointer font-poppins font-medium z-20"
                style={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {password}
              </span>
            </div>
            <p className="text-red-900 mb-5 z-20 text-center">{copied}</p>
            <div className="flex flex-col justify-center items-center border-2 border-white p-5 rounded">
              <label className="text-white mb-2 mt-2 font-poppins font-medium">
                Password Length:
              </label>
              <input
                id="passwordLength"
                className={`z-20 mb-2 p-3 rounded outline-none ${
                  inputError ? "border-red-500" : "border-[gray-200]"
                } focus:border-2-[#000] w-full`}
                type="range"
                min={2}
                max={30}
                step={1}
                value={passwordLength}
                onChange={handlePasswordLengthChange}
                onClick={generatePassword}
              />
              {inputError && (
                <span className="text-red-500 z-20 text-center">
                  {alertMessage}
                </span>
              )}
              <div className="flex items-center justify-between gap-5">
                <input
                  id="passwordLength"
                  className={`z-20 mb-2 p-3 rounded outline-none text-black font-bold ${
                    inputError ? "border-red-500" : "border-[gray-200]"
                  } focus:border-2-[#000] w-full lg:w-20 mr-auto text-center`}
                  type="number"
                  value={passwordLength}
                  onChange={handlePasswordLengthChange}
                  placeholder="Enter Your Maximum amount"
                />
                <span
                  className={`bg-white text-center flex items-center justify-center w-full lg:w-60 p-2 border-2 h-[50px] font-poppins font-medium ${getPasswordColor(
                    passwordStrength
                  )}`}
                >
                  {passwordStrength}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center border-2 border-white mt-5 p-3 rounded">
              <p className="text-2xl font-poppins font-medium text-white mb-5">
                Settings
              </p>
              <div className="flex justify-center items-center gap-5">
                <div className="flex flex-col z-20">
                  <input
                    type="checkbox"
                    checked={includeSpecialChars}
                    onChange={() =>
                      setIncludeSpecialChars(!includeSpecialChars)
                    }
                  />
                  <label className="text-white">Characters</label>
                </div>
                <div className="flex flex-col z-20">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={() => setIncludeUppercase(!includeUppercase)}
                  />
                  <label className="text-white">Uppercase</label>
                </div>
                <div className="flex flex-col z-20">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={() => setIncludeLowercase(!includeLowercase)}
                  />
                  <label className="text-white">Lowercase</label>
                </div>
                <div className="flex flex-col z-20">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={() => setIncludeNumbers(!includeNumbers)}
                  />
                  <label className="text-white">Numbers</label>
                </div>
              </div>
            </div>
            <div className="flex z-20">{/* Buttons or other content */}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
