import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import { BackButton } from "../components/BackButton";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [category, setCategory] = useState("M3");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ category, description, title }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Skapa nytt ärende</h1>
        <p>Var vänlig fyll i formuläret nedan</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Namn</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="name">E-post</label>
          <input type="email" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="category">Kategori</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="M3">M3</option>
              <option value="Drift">Drift</option>
              <option value="M3 drift">M3 drift</option>
              <option value="Nätverk">Nätverk</option>
              <option value="Hårdvara">Hårdvara</option>
              <option value="Annat">Annat</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Rubrik</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Beskrivning av ärende</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Beskrivning"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Skapa ärende</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
