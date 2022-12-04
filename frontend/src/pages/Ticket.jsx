import { useSelector, useDispatch } from "react-redux";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = params;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Något gick fel, var vänlig kontakta en administratör</h3>;
  }

  //Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ärendet stängt");
    navigate("/tickets");
  };

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ärende Id: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Ärende skapat: {new Date(ticket.createdAt).toLocaleString("sv-SE")}
        </h3>
        <h3>Kategori: {ticket.category}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== "Stängd" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Stäng ärende
        </button>
      )}
    </div>
  );
}

export default Ticket;
