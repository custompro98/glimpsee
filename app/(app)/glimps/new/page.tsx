import { create } from "./actions";
import Link from "next/link";

export default function New() {
  return (
    <section className="container">
      <form action={create}>
        <div className="field">
          <label htmlFor="title" className="label">
            Title
          </label>
          <input
            className="input"
            type="text"
            name="title"
            placeholder="my really good blog post"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="text" className="label">
            Text color
          </label>
          <input
            className="input"
            type="text"
            name="text"
            placeholder="#000000"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="background" className="label">
            Background color
          </label>
          <input
            className="input"
            type="text"
            name="background"
            placeholder="#FFFFFF"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="icon" className="label">
            Icon
          </label>
          <input
            className="input"
            type="text"
            name="icon"
            placeholder="https://example.com/my-public-image.png"
            required
          />
        </div>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <Link className="button" href="/glimps">
              Cancel
            </Link>
          </div>
          <div className="control">
            <button className="button is-primary">Create</button>
          </div>
        </div>
      </form>
    </section>
  );
}
