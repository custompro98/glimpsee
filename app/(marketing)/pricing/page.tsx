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
                <p className="title">Whisper</p>
                <p className="subtitle">
                  Great fit for the solo author with growth potential, you have
                  an impact to make.
                </p>
                <div className="content">
                  <ul>
                    <li>5 new Glimps per month</li>
                    <li>150 impressions per month</li>
                  </ul>
                  <Link href="/sign-in">$4.99/mo</Link>
                </div>
              </article>
            </div>
            <div className="tile is-parent box">
              <article className="tile is-child notification is-primary">
                <p className="title">
                  Chatter
                  <span className="icon is-pulled-right">
                    <Icon path={mdiStar} size={1} />
                  </span>
                </p>
                <p className="subtitle">
                  Ideal for authors with influence, people trust you and for
                  good reason.
                </p>
                <div className="content">
                  <ul>
                    <li>30 new Glimps per month</li>
                    <li>1000 impressions per month</li>
                  </ul>
                  <Link href="/sign-in">$24.99/mo</Link>
                </div>
              </article>
            </div>
            <div className="tile is-parent box">
              <article className="tile is-child notification has-background-grey-lightest">
                <p className="title">Buzz</p>
                <p className="subtitle">
                  Best for authors with a team behind them, the whole world
                  knows who you are.
                </p>
                <div className="content">
                  <ul>
                    <li>Unlimited new Glimps per month</li>
                    <li>Unlimited impressions per month</li>
                  </ul>
                  <Link href="/sign-in">Let&apos;s talk</Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
