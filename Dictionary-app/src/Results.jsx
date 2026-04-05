import React, {useState} from "react";
export default function Results(props) {
    console.log(props.results);
if (props.results) {
    return (
        <div className="Results">
            <h2>{props.results?.word}</h2>
            {props.results.meanings.map(function(meaning, index) {
                return (
                    <div key={index}>
                        <h3>{meaning.partOfSpeech}</h3>
                        <p><strong>Definition:</strong> {meaning.definition}</p>
                        <p><em>Example: {meaning.example}</em></p>
                    </div>
                );
            })}
        </div>
    );
       } else {
            return null;
        }
}