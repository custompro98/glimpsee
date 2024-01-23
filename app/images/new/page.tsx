"use client";

import TextInput from "@/components/TextInput";
import { useState } from "react";
import { create } from "./actions";
import { redirect } from "next/navigation";

export default function New() {
  const [title, setTitle] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [icon, setIcon] = useState("");

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-col space-y-4 w-2/3">
          <TextInput
            label="title"
            name="title"
            placeholder="my really good blog post"
            value={title}
            handleChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextInput
            label="background color"
            name="background"
            placeholder="#FFFFFF"
            value={backgroundColor}
            handleChange={(e) => {
              setBackgroundColor(e.target.value);
            }}
          />
          <TextInput
            label="icon"
            name="icon"
            placeholder="https://exmaple.com/my-public-image.png"
            value={icon}
            handleChange={(e) => {
              setIcon(e.target.value);
            }}
          />
          <button
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
