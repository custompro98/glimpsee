import { mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section className="container">
      <div className="columns is-centered">
        <div className="column">
          <div className="card">
            <div className="card-content">
              <p className="title">Whisper</p>
              <p className="subtitle">
                Great fit for the solo author with growth potential, you have an
                impact to make.
              </p>
              <div className="content">
                <ul>
                  <li>5 new Glimps per month</li>
                  <li>150 impressions per month</li>
                </ul>
                <Link className="button is-link is-outlined" href="/sign-in">
                  $4.99/mo
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card has-background-primary-light">
            <div className="card-content">
              <p className="title">
                Chatter
                <span className="icon is-pulled-right">
                  <Icon path={mdiStar} size={1} />
                </span>
              </p>
              <p className="subtitle">
                Ideal for authors with influence, people trust you and for good
                reason.
              </p>
              <div className="content">
                <ul>
                  <li>30 new Glimps per month</li>
                  <li>1000 impressions per month</li>
                </ul>
                <Link className="button is-link" href="/sign-in">
                  $24.99/mo
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="card-content">
              <p className="title">Buzz</p>
              <p className="subtitle">
                Best for authors with a team behind them, the whole world knows
                you.
              </p>
              <div className="content">
                <ul>
                  <li>Unlimited new Glimps per month</li>
                  <li>Unlimited impressions per month</li>
                </ul>
                <div className="container">
                  <Link className="button is-link is-outlined" href="/sign-in">
                    Let&apos;s talk
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
