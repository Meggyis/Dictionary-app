import React, {useState} from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";

export default function Dictionary() {
    const [word, setWord] = useState("");
    const [results, setResults] = useState(null);
    const [phonetic, setPhonetic] = useState(null);
    const [synonyms, setSynonyms] = useState([]);
   
     function handleResponse(response) {
        setResults(response.data); 
    }
    function search(event) {
        event.preventDefault();
        let apiKey = "ta7cf76b03d3d0cfof27fb0472606ea4";
        let shecodesUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;
        let dictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
        axios.get(shecodesUrl).then(handleResponse);
        axios.get(dictionaryUrl).then(handleDictionaryResponse);
    }

    function handleDictionaryResponse(response) {
        console.log(response.data[0].meanings[0].definitions[0]);
        setPhonetic(response.data[0].phonetics[0].text);
        setSynonyms(response.data[0].meanings[0].definitions[0].synonyms);
    }

    function handleWordChange(event) {
        setWord(event.target.value);
    }
 
  return (
    <div className="Dictionary">
<form onSubmit={search}>
    <input type="search" className="form-control shadow" onChange={handleWordChange} />
</form>
   <Results 
    results={results} 
    phonetic={phonetic}
    synonyms={synonyms}
/>
    </div>
  );
}