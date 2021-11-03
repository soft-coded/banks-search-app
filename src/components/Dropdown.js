import { useState, useRef, useEffect } from "react";

export default function Dropdown({ options, onChange }) {
  const [selectedInd, setSelectedInd] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedInd(0);
  }, [options]);

  // close dropdown when clicked outside of it
  useEffect(() => {
    function listener(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        showOptions
      )
        setShowOptions(false);
    }
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [showOptions]);

  function handleSelect(ind) {
    onChange(options[ind]);
    setSelectedInd(ind);
    setShowOptions(false);
  }

  return (
    <div className="dropdown">
      <div className="selected" onClick={() => setShowOptions(!showOptions)}>
        {options[selectedInd]}
        <span>&darr;</span>
      </div>
      {showOptions && (
        <ul className="options" ref={dropdownRef}>
          {options.map((option, i) => (
            <li key={i} onClick={() => handleSelect(i)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
