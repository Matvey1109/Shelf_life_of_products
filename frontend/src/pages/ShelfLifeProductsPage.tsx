import React, {useEffect, useState} from 'react';

const ShelfLifeProducts: React.FC = () => {
    const [text, setText] = useState('');
    const [firstSelectValue, setFirstSelectValue] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [secondSelectOptions, setSecondSelectOptions] = useState<string[]>(['Комнатная температура', 'Холодильник', 'Морозильник']);
    const [showRangeInput, setShowRangeInput] = useState(false);
    const [chosenNumber, setChosenNumber] = useState(0);
    const [conditionParam, setConditionParam] = useState('Комнатная температура');
    const [vacuumParam, setVacuumParam] = useState(true);
    const [fetchedData, setFetchedData] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
            setShowRangeInput(false);
        } else if (selectedValue === 'Температура') {
            setShowRangeInput(true);
        }
    };

    const handleRangeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const number = parseInt(event.target.value);
        setChosenNumber(number);
    };

    const handleConditionParamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setConditionParam(selectedValue);
    };

    const handleVacuumChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setVacuumParam(selectedValue === 'Хранение с вакуумом');
    };

    useEffect(() => {
        setText(fetchedData);
    }, [fetchedData]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const productNameInput = document.getElementById('productNameInput') as HTMLInputElement;
        const productName = productNameInput?.value;

        let payload: any = {
            product: productName,
            vacuum: vacuumParam,
        };

        if (firstSelectValue === 'Условие') {
            payload.param = 'Условие';
            payload.condition_param = conditionParam;
        } else if (firstSelectValue === 'Температура') {
            payload.param = 'Температура';
            payload.temperature_param = chosenNumber;
        }

        setIsLoading(true);

        fetch('http://127.0.0.1:5000/get_answer_from_model', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(payload);
                setFetchedData(data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            <div className="mt-4 flex justify-center items-center">
                <div>
                    <textarea
                        value={text}
                        readOnly
                        className="px-2 py-1 border border-gray-300 rounded focus:outline-none w-96 h-20 resize-none"
                        style={{width: '1000px'}}
                    />
                </div>
            </div>
            <div className="mt-4 flex justify-center">
                <form className="flex space-x-4 items-center" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="productNameInput"
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

                    {showRangeInput ? (
                        <>
                            <input
                                type="range"
                                min="-20"
                                max="20"
                                id="myRange"
                                onChange={handleRangeInputChange}
                                defaultValue="0"
                                className="bg-gray-300 appearance-none h-1 thumb-blue-500"
                            />
                            <p>
                                Выбранная температура: <span id="chosenNumber">{chosenNumber}</span>
                            </p>
                        </>
                    ) : null}
                    {firstSelectValue !== 'Температура' && (
                        <select
                            id="mySelect"
                            disabled={!firstSelectValue}
                            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleConditionParamChange}
                            value={conditionParam}
                        >
                            {secondSelectOptions.map((option, index) => (
                                <option key={index}>{option}</option>
                            ))}
                        </select>
                    )}

                    <select
                        id="vacuumSelect"
                        disabled={!firstSelectValue}
                        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleVacuumChange}
                    >
                        <option>Хранение с вакуумом</option>
                        <option>Хранение без вакуума</option>
                    </select>

                    <button
                        type="submit"
                        disabled={!firstSelectValue || isDisabled}
                        onClick={handleSubmit}
                        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${(!firstSelectValue || isDisabled) && 'bg-gray-400 hover:bg-gray-400'
                        }`}
                    >
                        {isLoading ? 'Loading...' : 'Рассчитать'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShelfLifeProducts;
