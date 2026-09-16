"use client";
import Link from "next/link";
import { poppins } from "@/libs/Fonts";

export default function ModelCard({ name, agency, img, hoverImg, href }) {
  const content = (
    <>
      <img className="mc-img mc-img-base" src={img} alt={name} />
      {hoverImg && (
        <img className="mc-img mc-img-hover" src={hoverImg} alt="" aria-hidden="true" />
      )}
      <div className="mc-info">
        <span className={`mc-name ${poppins.className}`}>{name}</span>
        {agency && <span className={`mc-agency ${poppins.className}`}>{agency}</span>}
      </div>
    </>
  );

  const cardClass = "model-card";

  return (
    <>
      <style>{`
        .model-card {
          position: relative;
          display: block;
          overflow: hidden;
          border-radius: 4px;
          aspect-ratio: 3 / 4;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform;
        }
        .model-card:hover {
          transform: translateY(-12px);
        }

        .mc-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.9s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s ease;
        }
        .mc-img-base { opacity: 1; z-index: 1; }
        .mc-img-hover { opacity: 0; z-index: 2; }

        .model-card:hover .mc-img-base {
          transform: scale(1.08);
          opacity: 0;
        }
        .model-card:hover .mc-img-hover {
          transform: scale(1.08);
          opacity: 1;
        }
        /* When there is no hoverImg, base image still gets the zoom */
        .model-card:hover .mc-img-base:only-child {
          opacity: 1;
        }

        /* Name — slides up from below on hover */
        .mc-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px 24px 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 70%);
          z-index: 3;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1), transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .model-card:hover .mc-info {
          opacity: 1;
          transform: translateY(0);
        }

        .mc-name {
          display: block;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1px;
          color: #fff;
          margin-bottom: 4px;
        }
        .mc-agency {
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.7);
        }
      `}</style>

      {href ? (
        <Link href={href} className={cardClass}>
          {content}
        </Link>
      ) : (
        <div className={cardClass}>{content}</div>
      )}
    </>
  );
}