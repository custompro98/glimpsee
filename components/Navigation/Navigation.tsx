import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

interface Props {}

export default async function Navigation({}: Props) {
  const session = await auth();
  const isSignedIn = Boolean(session?.user);

  const currentRoute = "";

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" href="/">
          <figure className="image is-64x64">
            <Image
              alt="glimpsee logo of an eye peering through a keyhole"
              src="/glimpsee-logo-icon.png"
              width="512"
              height="512"
              className="is-rounded"
            />
          </figure>
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
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button className="button is-small is-light">
                    <strong>Sign out</strong>
                  </button>
                </form>
              )) || (
                <Link className="button is-primary" href="/sign-in">
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
