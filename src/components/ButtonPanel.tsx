
import Button from './Button';
import './ButtonPanel.css';

interface ButtonPanelProps {
    onClick: (value: string) => void;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({ onClick }) => {
    const buttons = [
        ['C', '%', '√', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['00', '0', '.', '=']
    ];

    return (
        <div className="ButtonPanel">
            {buttons.map((row, rowIndex) => (
                <div key={rowIndex} className="ButtonRow">
                    {row.map((btn, btnIndex) => (
                        <Button
                            key={btnIndex}
                            value={btn}
                            onClick={onClick}
                            className={btn === '-' ? 'ButtonSpecial' : ( btn === '=') ? 'special' : ''}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ButtonPanel;
