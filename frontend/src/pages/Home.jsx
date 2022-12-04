import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>Behöver du hjälp eller?</h1>
        <img
          src="https://www.meme-arsenal.com/memes/8f0de2d62feed520ca30cda1e9293b82.jpg"
          alt=""
        />
        <p>Var vänlig välj ett av nedan alternativ</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Skapa nytt ärende
      </Link>

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> Mina ärenden
      </Link>
    </>
  );
}

export default Home;
