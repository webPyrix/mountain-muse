"use client";
import { useState, useRef } from "react";

/* ─────────────────────────────────────────────
   BUTTON 1 — Slide-fill with magnetic arrow
   Clean outline, white fill slides up on hover,
   arrow rotates 45° (diagonal = forward motion)
───────────────────────────────────────────── */
export function ButtonPrimary({
  label = "View Work",
  href = "#",
  onClick,
  color = "#fff",
}) {
  const hoverTextColor =
    color === "#000" ||
    color === "#000000" ||
    color === "black"
      ? "#fff"
      : "#0e0e0e";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 11px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          text-decoration: none;
          background: transparent;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.45s cubic-bezier(0.23,1,0.32,1),
                      border-color 0.45s;
          white-space: nowrap;
        }

        .btn-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateY(101%);
          transition: transform 0.45s cubic-bezier(0.23,1,0.32,1);
          z-index: 0;
        }

        .btn-primary:hover::before {
          transform: translateY(0);
        }

        .btn-primary .btn-label {
          position: relative;
          z-index: 1;
        }

        .btn-primary .btn-icon {
          position: relative;
          z-index: 1;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            border-color 0.45s,
            transform 0.45s cubic-bezier(0.23,1,0.32,1),
            background 0.45s;
          flex-shrink: 0;
        }

        .btn-primary:hover .btn-icon {
          transform: rotate(45deg);
        }

        .btn-primary .btn-icon svg {
          width: 8px;
          height: 8px;
          stroke: currentColor;
          fill: none;
          transition: stroke 0.45s;
        }
      `}</style>

      <a
        className="btn-primary"
        href={href}
        onClick={onClick}
        style={{
          color,
          border: `1px solid ${color}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = hoverTextColor;

          const icon = e.currentTarget.querySelector(".btn-icon");

          if (icon) {
            icon.style.borderColor =
              color === "#000" ||
              color === "#000000" ||
              color === "black"
                ? "rgba(255,255,255,0.35)"
                : "rgba(14,14,14,0.25)";
          }
        }}

        onMouseLeave={(e) => {
          e.currentTarget.style.color = color;

          const icon = e.currentTarget.querySelector(".btn-icon");

          if (icon) {
            icon.style.borderColor = color;
          }
        }}
      >
        <span
          className="btn-label"
        >
          {label}
        </span>

        <span
          className="btn-icon"
          style={{
            border: `1px solid ${color}`,
          }}
        >
          <svg viewBox="0 0 10 10" strokeWidth="1.5">
            <line x1="1" y1="9" x2="9" y2="1" />
            <polyline points="3,1 9,1 9,7" />
          </svg>
        </span>

        <style jsx>{`
          .btn-primary::before {
            background: ${color};
          }
        `}</style>
      </a>
    </>
  );
}


/* ─────────────────────────────────────────────
   BUTTON 2 — Underline morph with ticker arrow
   No border at rest — just text + a ruled line
   that stretches on hover. Arrow shifts right.
   Works perfectly inside nav on dark backgrounds.
───────────────────────────────────────────── */
export function ButtonGhost({
  label = "Explore",
  href = "#",
  onClick,
  color = "#fff",
}) {

  const hoverColor =
    color === "#000" ||
    color === "#000000" ||
    color === "black"
      ? "#000"
      : "#fff";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .btn-ghost {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.4s;
          white-space: nowrap;
        }

        /* the ruled underline */
        .btn-ghost::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 0%;
          transition: width 0.5s cubic-bezier(0.23,1,0.32,1);
        }

        .btn-ghost:hover::after {
          width: 100%;
        }

        .btn-ghost .ghost-label {
          position: relative;
        }

        /* long dash that becomes arrow */
        .btn-ghost .ghost-icon {
          display: flex;
          align-items: center;
          overflow: hidden;
          width: 24px;
          transition: width 0.4s cubic-bezier(0.23,1,0.32,1);
        }

        .btn-ghost:hover .ghost-icon {
          width: 32px;
        }

        .btn-ghost .ghost-icon svg {
          width: 28px;
          height: 10px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1;
          flex-shrink: 0;
          transform: translateX(-6px);
          transition:
            transform 0.45s cubic-bezier(0.23,1,0.32,1),
            stroke 0.4s;
        }

        .btn-ghost:hover .ghost-icon svg {
          transform: translateX(0);
        }
      `}</style>

      <a
        className="btn-ghost"
        href={href}
        onClick={onClick}
        style={{
          color,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = hoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = color;
        }}
      >
        <span className="ghost-label">{label}</span>

        <span className="ghost-icon">
          <svg viewBox="0 0 28 10">
            <line x1="0" y1="5" x2="22" y2="5" />
            <polyline points="17,1 23,5 17,9" />
          </svg>
        </span>

        <style jsx>{`
          .btn-ghost::after {
            background: ${color};
          }
        `}</style>
      </a>
    </>
  );
}