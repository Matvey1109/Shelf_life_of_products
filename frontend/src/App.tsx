import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [firstSelectValue, setFirstSelectValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/docs')
      .then(response => response.text())
      .then(data => setText(data))
      .catch(error => console.log(error));
  }, []);

  const handleFirstSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFirstSelectValue(selectedValue);
    setIsDisabled(false);

    if (selectedValue === 'Condition' || selectedValue === 'Temperature') {
      const selectElement = document.getElementById('mySelect') as HTMLSelectElement;
      const optionToRemove = selectElement.querySelector('option[value=""]');
      if (optionToRemove) {
        selectElement.removeChild(optionToRemove);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div>
      <header className="bg-blue-500 text-white p-7 flex justify-between items-center">
        <button className="text-4xl font-bold focus:outline-none pl-4">Shelf Life Products</button>
        <button className="text-xl focus:outline-none pr-4">Примечания</button>
      </header>
      <div>
        <input type="text" value={text} readOnly />
      </div>
      <div className="mt-4 flex justify-center">
        <form className="flex space-x-4 items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            id="mySelect"
            value={firstSelectValue}
            onChange={handleFirstSelectChange}
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose an option</option>
            <option>Condition</option>
            <option>Temperature</option>
          </select>

          <select
            disabled={!firstSelectValue}
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>

          <select
            disabled={!firstSelectValue}
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Option 1</option>
            <option>Option 2</option>
          </select>

          <button
            type="submit"
            disabled={!firstSelectValue || isDisabled}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
            ${(!firstSelectValue || isDisabled) && 'bg-gray-400 hover:bg-gray-400'
              }`}
          >
            Get Result
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
