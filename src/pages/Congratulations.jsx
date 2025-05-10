import congratIMG from '../assets/congrats.svg';

function Congratulation(props) {
  return (
    <>
      <div className="congrat-box py-6 px-14 text-center rounded-xl">
        <img src={congratIMG} alt="Congratulation Image" />
        <div className="heading text-3xl">
          Congrats! You completed the quiz.
        </div>
        <div>You answer {props.score}/10 correctly</div>
        <button
          onClick={props.handlePlayAgain}
          type="button"
          className="play-btn cursor-pointer w-5/6 rounded-xl"
        >
          Play again
        </button>
      </div>
    </>
  );
}

export default Congratulation;
