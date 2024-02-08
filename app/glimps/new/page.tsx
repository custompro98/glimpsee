"use client";

import { useState } from "react";
import { create } from "./actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function New() {
  const [title, setTitle] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [icon, setIcon] = useState("");

  return (
    <section className="container">
      <div className="field">
        <label className="label">Title</label>
        <input
          className="input"
          type="text"
          name="title"
          placeholder="my really good blog post"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label className="label">Background color</label>
        <input
          className="input"
          type="text"
          name="background"
          placeholder="#FFFFFF"
          value={backgroundColor}
          onChange={(e) => {
            setBackgroundColor(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label className="label">Icon</label>
        <input
          className="input"
          type="text"
          name="icon"
          placeholder="https://example.com/my-public-image.png"
          value={icon}
          onChange={(e) => {
            setIcon(e.target.value);
          }}
        />
      </div>
      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <Link className="button" href="/glimps">
            Cancel
          </Link>
        </div>
        <div className="control">
          <button
            className="button is-primary"
            onClick={() => {
              create({ title, backgroundColor, icon });

              redirect("/");
            }}
          >
            Create
          </button>
        </div>
      </div>
    </section>
  );
}
