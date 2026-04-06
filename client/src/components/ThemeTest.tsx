import React from "react";

export function ThemeTest() {
  return (
    <div className="card w-full max-w-2xl bg-base-100 shadow-xl mx-auto my-8">
      <div className="card-body">
        <h2 className="font-heading text-4xl font-bold mb-4">
          TalkTaktika Theme Test
        </h2>

        <div className="flex gap-4 p-8">
          {/* Add 'clay-btn' to instantly make it 3D */}
          <button className="btn btn-primary clay-btn text-lg h-14 px-8 rounded-2xl">
            Primary Action
          </button>

          <button className="btn btn-secondary clay-btn text-lg h-14 px-8 rounded-2xl">
            Secondary
          </button>

          <button className="btn btn-accent clay-btn text-lg h-14 px-8 rounded-2xl">
            Tertiary
          </button>
        </div>

        <p className="font-sans text-base mb-6">
          This is a test paragraph using the "Be Vietnam Pro" body font. The
          heading above should be using "Plus Jakarta Sans". The colors for the
          buttons below map to the new custom theme: Primary (Blue), Secondary
          (Red), and Accent (Yellow).
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="btn btn-primary">Primary Button</button>
          <button className="btn btn-secondary">Secondary Button</button>
          <button className="btn btn-accent">Accent/Tertiary Button</button>
          <button className="btn btn-outline btn-primary">
            Primary Outline
          </button>
        </div>
      </div>
    </div>
  );
}
