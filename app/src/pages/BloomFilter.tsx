import { useEffect, useState } from "react";
import { useBloomFilter } from "../hooks/useBloomFilter";


export default function BloomFilterPage() {
  const { add, contains } = useBloomFilter(50, 3);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleAdd = () => {
    add(input);
    setResult(`Added "${input}"`);
    setInput("");
  };

  const handleCheck = () => {
    const exists = contains(input);
    setResult(
      exists
        ? `"${input}" might exist 🤔`
        : `"${input}" definitely does NOT exist ❌`,
    );
  };

  const handleChange = (e) => { 
    setInput(e.target.value);
  }

  useEffect(()=> {
    handleCheck();
  },[input]);

  return (
    <div>
      <h2>Bloom Filter Demo</h2>

      <input
        value={input}
        onChange={(e) => handleChange(e)}
        placeholder="Enter value"
      />

      <button onClick={handleAdd}>Add</button>
      {/* <button onClick={handleCheck}>Check</button> */}

      {result && <p>{result}</p>}
    </div>
  );
}
