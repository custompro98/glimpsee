import Link from "next/link";
import { getServerSession } from "next-auth";

interface Props {
  currentRoute: string;
}

export default async function Navigation({ currentRoute }: Props) {
  const session = await getServerSession();
  const isSignedIn = Boolean(session?.user);

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" href="/">
          <span className="is-size-2 has-text-weight-medium">
            Glimp<span className="has-text-primary">see</span>
          </span>
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar" className="navbar-menu">
        {isSignedIn && (
          <>
            <Link
              className={`navbar-item ${
                currentRoute.startsWith("/glimps")
                  ? "has-text-primary is-underlined"
                  : ""
              }`}
              href="/glimps"
            >
              Glimps
            </Link>
          </>
        )}

        <div className="navbar-start">
          <Link
            className={`navbar-item ${
              currentRoute.startsWith("/pricing")
                ? "has-text-primary is-underlined"
                : ""
            }`}
            href="/pricing"
          >
            Pricing
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {(isSignedIn && (
                <Link className="button is-light" href="/api/auth/signout">
                  <strong>Sign out</strong>
                </Link>
              )) || (
                <Link className="button is-primary" href="/api/auth/signin">
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
