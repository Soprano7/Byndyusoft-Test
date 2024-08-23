import React, { useState } from 'react';
import './App.css';
import Display from './components/Display';
import ButtonPanel from './components/ButtonPanel';
// import { evaluateExpression } from './utils/evaluateExpression';
import { evaluateExpression } from './utils/evaluateExpressionV2';

const App: React.FC = () => {
    const [expression, setExpression] = useState('');
    const [history, setHistory] = useState<string[]>([]);

    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '(', ')', '.', 'Enter', 'Escape'];

    const handleButtonClick = (value: string) => {
        if (value === '=') {
            const result = evaluateExpression(expression);
            setHistory([`${expression} = ${result}`]);
            setExpression(result);
        } else if (value === 'C') {
            setExpression('');
        } else {
            setExpression((prev) => prev + value);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        const key = e.key;

        if (!allowedKeys.includes(key)) {
            return;
        }

        if (key === 'Enter') {
            const result = evaluateExpression(expression);
            setHistory([`${expression} = ${result}`]);
            setExpression(result);
        } else if (key === 'Escape') {
            setExpression('');
        } else {
            if (key === '.' || allowedKeys.some(k => key.includes(k))) {
                setExpression((prev) => prev + key);
            }
        }
    };

    return (
        <div className="App" onKeyDown={handleKeyPress} tabIndex={0}>
            <div className="Container">
                <Display expression={expression} history={history} />
                <ButtonPanel onClick={handleButtonClick} />
            </div>
        </div>
    );
};

export default App;
