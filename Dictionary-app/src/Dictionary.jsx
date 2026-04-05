import React, {useState} from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";

export default function Dictionary() {
    const [word, setWord] = useState("");
    const [results, setResults] = useState(null);
    const [phonetic, setPhonetic] = useState(null);
    const [synonyms, setSynonyms] = useState([]);
   
    function reset() {
        setResults(null);
        setPhonetic(null);
        setSynonyms([]);
        setWord("");
}

    function handleResponse(response) {
        setResults(response.data); 
    }
    function search(event) {
        event.preventDefault();
         if (!word.trim()) {
        return;
    }
        let apiKey = "ta7cf76b03d3d0cfof27fb0472606ea4";
        let shecodesUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;
        let dictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        axios.get(shecodesUrl).then(handleResponse);
        axios.get(dictionaryUrl).then(handleDictionaryResponse);
    }

    function handleDictionaryResponse(response) {
        setPhonetic(response.data[0].phonetics[0].text);
        setSynonyms(response.data[0].meanings[0].definitions[0].synonyms);
    }

    function handleWordChange(event) {
        setWord(event.target.value);
    }
   return (
    <div className="Dictionary">
        <form onSubmit={search}>
            <div className="input-group">
            <input 
                type="search" 
                className="form-control shadow" 
                onChange={handleWordChange}
                value={word}
                placeholder="Search a word..."
            />
            <button type="submit" className="btn btn-primary shadow">
                🔍
            </button>
        </div>
        </form>
        {results && (
            <button onClick={reset} className="btn reset-button shadow">
                🔄 Search again
            </button>
        )}
        <Results 
            results={results} 
            phonetic={phonetic}
            synonyms={synonyms}
        />
    </div>
);
}