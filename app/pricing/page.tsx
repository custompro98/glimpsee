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
              <article className="tile is-child notification is-light">
                <p className="title">Quickstart</p>
                <p className="subtitle">$4.99/mo</p>
                <div className="content">
                  <ul>
                    <li>Up to 5 Glimp generations per month</li>
                    <li>Email support</li>
                  </ul>
                  <Link href="/api/auth/signin">Get started</Link>
                </div>
              </article>
            </div>
            <div className="tile is-parent box">
              <article className="tile is-child notification is-info">
                <p className="title">
                  Growth
                  <span className="icon is-pulled-right">
                    <Icon path={mdiStar} size={1} />
                  </span>
                </p>
                <p className="subtitle">$24.99/mo</p>
                <div className="content">
                  <ul>
                    <li>Up to 30 Glimp generations per month</li>
                    <li>Priority email support</li>
                  </ul>
                  <Link href="/api/auth/signin">Get started</Link>
                </div>
              </article>
            </div>
            <div className="tile is-parent box">
              <article className="tile is-child notification is-light">
                <p className="title">Enterprise</p>
                <p className="subtitle">Let&apos;s talk</p>
                <div className="content">
                  <ul>
                    <li>Unlimited Glimp generations per month</li>
                    <li>Priority email support</li>
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
