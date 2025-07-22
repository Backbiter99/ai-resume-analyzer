const Details = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div>
            <div>Content Score: {feedback.content.score}</div>
            {feedback.content.tips.map((tip) => (
                <div key={tip.tip}>
                    <div>Type: {tip.type}</div>
                    <div>Tip: {tip.tip}</div>
                    <div>Explanation: {tip.explanation}</div>
                </div>
            ))}

            <div>Skills Score: {feedback.skills.score}</div>
            {feedback.skills.tips.map((tip) => (
                <div key={tip.tip}>
                    <div>Type: {tip.type}</div>
                    <div>Tip: {tip.tip}</div>
                    <div>Explanation: {tip.explanation}</div>
                </div>
            ))}

            <div>Structure Score: {feedback.structure.score}</div>
            {feedback.structure.tips.map((tip) => (
                <div key={tip.tip}>
                    <div>Type: {tip.type}</div>
                    Company Name: {tip.tip}
                    <div>Explanation: {tip.explanation}</div>
                </div>
            ))}

            <div>Tone and Style Score: {feedback.toneAndStyle.score}</div>
            {feedback.toneAndStyle.tips.map((tip) => (
                <div key={tip.tip}>
                    <div>Type: {tip.type}</div>
                    <div>Tip: {tip.tip}</div>
                    <div>Explanation: {tip.explanation}</div>
                </div>
            ))}
        </div>
    );
};

export default Details;
