function Question(props) {
  function bgImg(option) {
    if (!props.selectedAnswer) return '';
    if (option === props.correctAnswer)
      return <img src="Check_round_fill.svg" alt="CheckImg" />;
    if (props.selectedAnswer === option && option !== props.correctAnswer)
      return <img src="Close_round_fill.svg" alt="Close Img" />;
    return null;
  }
  return (
    <>
      <div className="container my-10">
        <div className="flex justify-between mb-7">
          <div className="heading">Country Quiz</div>
          <div className="grad-color px-5 py-1.5 rounded-full">
            🏆 {props.currentQuestion}/{props.questionLength} Points
          </div>
        </div>

        <div className="box rounded-xl">
          <div className="flex flex-wrap justify-center space-y-3 mb-4">
            <div>
              {Array.from({ length: props.questionLength }).map((_, index) => (
                <button
                  key={index + 1}
                  type="button"
                  className="mx-2 p-2 rounded-full cursor-pointer"
                  value="1"
                  onClick={() => props.handleNavBtn(index + 1)}
                  style={{
                    backgroundImage:
                      props.userAnswer[index] !== ''
                        ? 'linear-gradient(#e65895, #bc6be8)'
                        : null,
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center heading">{props.question}</div>
          {props.questionType === 'flag' && props.flagUrl && (
            <img
              className="mx-auto mt-4"
              src={props.flagUrl}
              alt="Country Flag"
            />
          )}

          <div className="grid lg:grid-cols-2 gap-3 mt-8">
            {props.options.map((option, index) => (
              <div key={index}>
                <button
                  className={`ans-btn py-2 px-6 w-full rounded-xl cursor-pointer ${props.selectedAnswer === option ? 'grad-color' : null}`}
                  type="button"
                  onClick={() => props.onAnswerSelect(option)}
                >
                  {option}
                  <span>{bgImg(option)}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;
