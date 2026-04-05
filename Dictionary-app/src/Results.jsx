import React from "react";
export default function Results(props) {
    function listen() {
    let speech = new SpeechSynthesisUtterance(props.results.word);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}
   
if (props.results) {
    return (
        <div className="Results">
            <section>
            <h2>{props.results?.word}</h2>
<button onClick={listen} className="btn listen-button">
    🔊 Listen
</button>
            {/* phonetic */}
                {props.phonetic && (
                    <p className="phonetic">📖 {props.phonetic}</p>
                )}
                </section>
                {props.results.meanings.map(function(meaning, index) {
                return (
                    <section key={index}>
                        <h3>{meaning.partOfSpeech}</h3>
                        <p>Definition: {meaning.definition}</p>
                        {meaning.example && (
                        <p><em>Example: {meaning.example}</em></p>
                        )}
                      </section>
                );
            })}
            {/* synonyms */}
                {props.synonyms?.length > 0 && (
                    <section>
                    <div className="synonyms">
                        <h3>Synonyms</h3>
                        <p>{props.synonyms.join(", ")}</p>
                    </div>
                </section>
             )}        
        </div>

    );
       } else {
            return null;
        }
}