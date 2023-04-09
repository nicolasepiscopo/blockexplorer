import logo from './logo.avif';

import './Header.css'
import { Link } from 'react-router-dom';

/**
 * A component that renders a header with a logo and navigation.
 */
export function Header () {
  return (
    <div className="Header">
      <Link to="/" className="Header__Logo">
        <img src={logo} alt="Block Explorer" /> <h1 className='Header__Logo__Title'>Block Explorer <small>powered by Alchemy, React Query & React Router</small></h1>
      </Link>
      <nav className='Header__Nav'>
        <Link to="/nft">
          Nft
        </Link>
        <Link to="/accounts">
          Accounts
        </Link>
      </nav>
    </div>
  )
}