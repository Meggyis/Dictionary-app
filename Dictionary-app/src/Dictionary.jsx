import React, {useState} from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";

export default function Dictionary() {
    const [word, setWord] = useState("");
    const [results, setResults] = useState(null);

    function search(event) {
        event.preventDefault();
        let apiKey = "ta7cf76b03d3d0cfof27fb0472606ea4";
        let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;
        axios.get(apiUrl).then(handleResponse);
    }
    function handleWordChange(event) {
        setWord(event.target.value);
    }
    function handleResponse(response) {
        console.log(response.data);
        setResults(response.data); 
    }
  return (
    <div className="Dictionary">
<form onSubmit={search}>
    <input type="search" className="form-control shadow" onChange={handleWordChange} />
</form>
 <Results results={results} />
    </div>
  );
}