import { signIn } from "@/auth";
import { mdiGoogle } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="columns is-centered is-gapless is-mobile">
      <div className="column is-three-quarters-mobile is-half-tablet is-one-quarter-widescreen">
        <div className="card">
          <div className="card-header is-justify-content-center">
            <figure className="image is-128x128">
              <Image
                src="/glimpsee-logo-icon.png"
                alt="Placeholder image"
                width="512"
                height="512"
              />
            </figure>
          </div>

          <div className="card-content">
            <div className="container is-flex is-flex-direction-column is-align-items-center">
              <p className="title has-text-weight-normal has-text-centered">
                Welcome back!
              </p>
              <p className="subtitle has-text-weight-light has-text-centered is-size-7">
                Sign in to continue to Glimpsee
              </p>
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/glimps" });
                }}
              >
                <button className="button is-light">
                  <span>Sign in with</span>
                  <span className="icon">
                    <Icon path={mdiGoogle} />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
