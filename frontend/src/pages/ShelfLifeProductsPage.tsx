import React, { useEffect, useState } from 'react';

const ShelfLifeProducts: React.FC = () => {
    const [text, setText] = useState('');
    const [firstSelectValue, setFirstSelectValue] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [secondSelectOptions, setSecondSelectOptions] = useState<string[]>(['Комнатная температура']);

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
        const selectElement = document.getElementById('mySelect') as HTMLSelectElement;
        const optionToRemove = selectElement.querySelector('option[value=""]');
        if (optionToRemove) {
            selectElement.removeChild(optionToRemove);
        }

        if (selectedValue === 'Условие') {
            setSecondSelectOptions(['Комнатная температура', 'Холодильник', 'Морозильник']);
        } else {
            setSecondSelectOptions(['Option 3', 'Option 4']);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission here
    };

    return (
        <div>
            <div>
                <input type="text" value={text} readOnly />
            </div>
            <div className="mt-4 flex justify-center">
                <form className="flex space-x-4 items-center" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Название продукта"
                        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        id="mySelect"
                        value={firstSelectValue}
                        onChange={handleFirstSelectChange}
                        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Выберите параметр</option>
                        <option>Условие</option>
                        <option>Температура</option>
                    </select>

                    <select
                        disabled={!firstSelectValue}
                        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {secondSelectOptions.map((option, index) => (
                            <option key={index}>{option}</option>
                        ))}
                    </select>

                    <select
                        disabled={!firstSelectValue}
                        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>Хранение с вакуумом</option>
                        <option>Хранение без вакуума</option>
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
            </div >
        </div >
    );
};

export default ShelfLifeProducts;
