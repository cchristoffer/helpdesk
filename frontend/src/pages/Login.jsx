import {useState} from 'react'
import {toast} from'react-toastify'
import {FaSign, FaSignInAlt} from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const {email, password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Logga in
        </h1>
        <p>Var vänlig logga in för fräsch service</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>

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
            <button className="btn btn-block">
              Logga in
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login