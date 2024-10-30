import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faArtstation, faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";


export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link legacyBehavior href="/">
          <a>
            <h1>
              <span>Anec</span>
              <span>Productions</span>
            </h1>
            <h2>VFX-Artist</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">{children}</div>

      <footer>
        <p>Copyright 2024</p>
        <a class="Icons-Social" href="https://artstation.com"><FontAwesomeIcon icon={faArtstation} /></a>
        <a class="Icons-Social" href="https://x.com"><FontAwesomeIcon icon={faSquareXTwitter} /></a>
      </footer>
    </div>
  );
}
