import { auth } from "@/auth";
import Link from "next/link";

interface Props {}

export default async function Navigation({}: Props) {
  const session = await auth();
  const isSignedIn = Boolean(session?.user);

  const currentRoute = "";

  return (
    <nav
      className="navbar is-transparent is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" href="/">
          <img src={`${process.env.NEXT_PUBLIC_HOSTNAME}/glimpsee-logo.jpeg`} />
          <span className="is-size-2 has-text-grey-dark has-text-weight-medium">
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
                currentRoute.startsWith("/glimps") ? "is-underlined" : ""
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
              currentRoute.startsWith("/pricing") ? "is-underlined" : ""
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
                <Link
                  className="button is-small is-light"
                  href="/api/auth/signout"
                >
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
