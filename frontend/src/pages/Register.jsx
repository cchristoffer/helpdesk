import {useState} from 'react'
import {toast} from'react-toastify'
import {FaUser} from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  
  const {name, email, password, password2} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(password != password2) {
      toast.error('Lösenorden matchar ej')
    }
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Registera
        </h1>
        <p>Var vänlig skapa ett konto</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Fyll i ditt namn"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Fyll i din e-post"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Fyll i ditt lösenord"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Bekräfta lösenord"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">
              Skapa konto
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register