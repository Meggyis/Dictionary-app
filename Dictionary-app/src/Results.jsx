import React from "react";
export default function Results(props) {
   
if (props.results) {
    return (
        <div className="Results">
            <h2>{props.results?.word}</h2>
            {/* Phonetic */}
                {props.phonetic && (
                    <p className="phonetic">🔊 {props.phonetic}</p>
                )}
            {props.results.meanings.map(function(meaning, index) {
                return (
                    <div key={index}>
                        <h3>{meaning.partOfSpeech}</h3>
                        <p><strong>Definition:</strong> {meaning.definition}</p>
                    {meaning.example && (
                            <p><em>Example: {meaning.example}</em></p>
                        )}
                      </div>
                );
            })}
          {/* Synonyms */}
                {props.synonyms?.length > 0 && (
                    <div className="synonyms">
                        <h3>Synonyms</h3>
                        <p>{props.synonyms.join(", ")}</p>
                    </div>
                )}   
        </div>
    );
       } else {
            return null;
        }
}