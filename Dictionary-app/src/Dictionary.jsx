import React, {useState} from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";

export default function Dictionary() {
    const [word, setWord] = useState("");
    const [results, setResults] = useState(null);
    const [phonetic, setPhonetic] = useState(null);
    const [synonyms, setSynonyms] = useState([]);
    const [images, setImages] = useState([]);
    const [searched, setSearched] = useState(false);  
    function reset() {
        setResults(null);
        setPhonetic(null);
        setSynonyms([]);
        setImages([]);
        setWord("");
        setSearched(false);
}
    function handleResponse(response) {
      if (response.data && response.data.meanings) {
        setResults(response.data);
    } else {
        setResults(null);
    }
    }
    function search(event) {
        event.preventDefault();
         if (!word.trim()) {
        return;
    }
        setSearched(true);
        let apiKey = "ta7cf76b03d3d0cfof27fb0472606ea4";
        let shecodesUrl = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;
        let dictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        axios.get(shecodesUrl).then(handleResponse).catch(() => {
            setResults(null);
            setPhonetic(null);
        setSynonyms([]);
        setImages([]);
        setSearched(true);
        });
        axios.get(dictionaryUrl).then(handleDictionaryResponse).catch(() => {
            setPhonetic(null);
            setSynonyms([]);
        });
        let pexelsApiKey = "g4wVBiWvctAk23Wv10DJ2F2uFsDxlW4N5ZFjWXnDWOwF9yPbTESE5Ubs";
        let pexelsUrl =`https://api.pexels.com/v1/search?query=${word}&per_page=9`;
        let headers = { Authorization: ` ${pexelsApiKey}` };
        axios.get(pexelsUrl, { headers: headers}).then(handlePexelsResponse).catch(() => {
            setImages([]);
        });
    }
    function handlePexelsResponse(response) {
        console.log(response.data);
        setImages(response.data.photos);
    }
    function handleDictionaryResponse(response) {
     try {
        setPhonetic(response.data[0].phonetics[0].text);
        setSynonyms(response.data[0].meanings[0].definitions[0].synonyms);
    } catch (e) {
        setPhonetic(null);
        setSynonyms([]);
    }
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
        {searched && !results && word && (
        <p className="text-danger mt-3">Word not found, please try again!</p>
    )}
        <Results 
            results={results} 
            phonetic={phonetic}
            synonyms={synonyms}
        />
        {results && images.length > 0 && (
            <section className="gallery">
                <div className="row">
                    {images.map((image, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4">
                            <img 
                                src={image.src.medium} 
                                alt={image.alt}
                                className="img-fluid rounded mb-3"
                            />
                        </div>
                    ))}
                </div>
            </section>
        )}
    </div>
);
}