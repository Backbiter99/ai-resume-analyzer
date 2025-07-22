const ATS = ({
    score,
    suggestions,
}: {
    score: number;
    suggestions: {
        type: "good" | "improve";
        tip: string;
    }[];
}) => {
    return (
        <div>
            <div>ATS score: {score}</div>
            {suggestions.map((tip) => (
                <div key={tip.tip}>
                    <div>Type: {tip.type}</div>
                    <div>Tip: {tip.tip}</div>
                </div>
            ))}
        </div>
    );
};

export default ATS;
