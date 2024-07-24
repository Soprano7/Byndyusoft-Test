import './Display.css';

interface DisplayProps {
    expression: string;
    history: string[];
}

const Display: React.FC<DisplayProps> = ({ expression, history }) => {
    const lastItem = history[history.length - 1]; // Получаем последний элемент истории

    return (
        <div className="Display">
            <div className="History">
                {lastItem && (
                    <div className="HistoryItem">
                        {lastItem}
                    </div>
                )}
            </div>
            <div className="CurrentExpression">
                {expression}
            </div>
        </div>
    );
};

export default Display;