import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section className="container">
      <div className="hero">
        <div className="hero-body">
          <div className="tile is-ancestor is-vertical">
            <div className="tile is-parent box">
              <article className="tile is-child notification has-background-grey-lightest">
                <p className="title">Quickstart</p>
                <p className="subtitle">$4.99/mo</p>
                <div className="content">
                  <ul>
                    <li>Up to 5 new Glimps per month</li>
                  </ul>
                  <Link href="/api/auth/signin">Get started</Link>
                </div>
              </article>
            </div>
            <div className="tile is-parent box">
              <article className="tile is-child notification is-primary">
                <p className="title">
                  Growth
                  <span className="icon is-pulled-right">
                    <Icon path={mdiStar} size={1} />
                  </span>
                </p>
                <p className="subtitle">$24.99/mo</p>
                <div className="content">
                  <ul>
                    <li>Up to 30 new Glimps per month</li>
                  </ul>
                  <Link href="/api/auth/signin">Get started</Link>
                </div>
              </article>
            </div>
            <div className="tile is-parent box">
              <article className="tile is-child notification has-background-grey-lightest">
                <p className="title">Enterprise</p>
                <p className="subtitle">Let&apos;s talk</p>
                <div className="content">
                  <ul>
                    <li>Unlimited new Glimps per month</li>
                  </ul>
                  <Link href="/api/auth/signin">Get in touch</Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
