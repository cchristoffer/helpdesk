import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>Behöver du hjälp eller?</h1>
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
