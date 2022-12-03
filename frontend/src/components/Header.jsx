import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>FräschService</Link>
        </div>
        <ul>
            <li>
                <Link to='/login'>
                    <FaSignInAlt /> Logga in
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser /> Registrera konto
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header