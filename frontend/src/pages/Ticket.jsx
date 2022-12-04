import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import {
  getNotes,
  createNote,
  reset as notesReset,
} from "../features/notes/noteSlice";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";
import { toast } from "react-toastify";

// const customStyles = {
//   content: {
//     width: "50%",
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     position: "relative",
//   },
// };

Modal.setAppElement("#root");

function Ticket() {
  const [isOpen, setIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
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
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  if (isLoading || notesIsLoading) {
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

  //Create note
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  //Open/close modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
        <h2>Kommentarer</h2>
      </header>

      {ticket.status !== "Stängd" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Lägg till kommentar
        </button>
      )}

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="Modal"
        contentLabel="Kommentar"
      >
        <h2>Skriv kommentar</h2>
        <button className="btn-close" onClick={closeModal}>
          &#10006;
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              class="form-control"
              placeholder="Skriv här..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Lägg till
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== "Stängd" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Stäng ärende
        </button>
      )}
    </div>
  );
}

export default Ticket;
