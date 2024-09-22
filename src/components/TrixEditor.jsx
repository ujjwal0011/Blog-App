import React, { useEffect } from "react";
import "trix";
import "trix/dist/trix.css";

const TrixEditor = ({ value, onChange }) => {
  useEffect(() => {
    const element = document.querySelector("trix-editor");
    const handleChange = (event) => {
      onChange(event.target.value);
    };
    element.addEventListener("trix-change", handleChange);

    return () => {
      element.removeEventListener("trix-change", handleChange);
    };
  }, [onChange]);

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-2">
      <input id="x" type="hidden" value={value} />
      <trix-editor input="x" className="w-full border-none bg-white" />
    </div>
  );
};

export default TrixEditor;
