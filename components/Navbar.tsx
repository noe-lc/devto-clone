import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';

import { UserContext } from '../lib/context';

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link passHref href="/">
            <button className="btn-logo">FEED</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <Link passHref href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link passHref href={`/${username}`}>
                <Image
                  src={user?.photoURL || '/'}
                  alt="user avatar"
                  width={35}
                  height={35}
                />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link passHref href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}

        {/* {user && <button onClick={() => auth.signOut()}>Sign Out</button>} */}
      </ul>
    </nav>
  );
}
