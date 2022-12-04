import { Link } from "react-router-dom";

function TicketItem({ ticket }) {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("sv-se")}</div>
      <div>{ticket.title}</div>
      <div>{ticket.category}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/tickets/${ticket._id}`} className="btn btn-reverse btn-sm">
        Visa
      </Link>
    </div>
  );
}

export default TicketItem;
