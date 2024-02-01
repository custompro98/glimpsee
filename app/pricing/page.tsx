import Link from "next/link";

export default function Pricing() {
  return (
    <div>
      <div>
        <h1>Pricing</h1>
        <p>
          Generate beautiful social media preview images for your website or
          blog posts. Choose a plan that fits your needs.
        </p>
      </div>
      <div>
        <div>
          <h2>Hobby</h2>
          <ul>
            <li>Up to 5 image generations per month</li>
            <li>Email support</li>
          </ul>
          <p>$4.99/mo</p>
        </div>
        <div>
          <h2>Pro</h2>
          <ul>
            <li>Up to 20 image generations per month</li>
            <li>Priority email support</li>
          </ul>
          <p>$24.99/mo</p>
        </div>
        <div>
          <h2>Enterprise</h2>
          <ul>
            <li>Unlimited image generations per month</li>
            <li>Priority email support</li>
          </ul>
          <Link href="/contact">Get in touch</Link>
        </div>
      </div>
      <Link href="/api/auth/signin">Get Started</Link>
    </div>
  );
}
