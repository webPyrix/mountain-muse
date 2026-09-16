"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ButtonPrimary } from "@/components/ui/Button";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Models", href: "/models" },
    { label: "Line Production", href: "/line-production" },
    { label: "Creative Studio", href: "/creative-studio" },
    { label: "About M3", href: "/about" },
];

export default function Nav() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const threshold = 80;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentY = window.scrollY;

                    setHidden(currentY >= threshold);

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <style>
                {`
                :root {
                  --site-px: 52px;
                }

                .nav-bar {
                  position: fixed;
                  top: 0; left: 0; right: 0;
                  z-index: 200;
                  padding: 0px var(--site-px);
                  color: #fff;
                  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.35s ease;
                }
                .nav-bar.nav-hidden {
                  transform: translateY(-100%);
                  opacity: 0;
                  pointer-events: none;
                }
                .nav-logo img {
                  height: 100px;
                }

                .nav-links { display: flex; gap: 32px; list-style: none; }
                .nav-links a {
                  font-size: 10px;
                  letter-spacing: 3px;
                  text-transform: uppercase;
                  color: #fff;
                  text-decoration: none;
                  opacity: 0.7;
                  transition: opacity 0.25s;
                  white-space: nowrap;
                }
                .nav-links a:hover { opacity: 1; }

                .nav-burger-btn {
                  display: none;
                  flex-direction: column;
                  gap: 5px;
                  background: none;
                  border: none;
                  cursor: pointer;
                  padding: 4px;
                }
                .nav-burger-btn span {
                  display: block;
                  height: 1.5px;
                  background: #fff;
                  transition: width 0.35s cubic-bezier(0.23,1,0.32,1);
                }
                .nav-burger-btn span:nth-child(1) { width: 24px; }
                .nav-burger-btn span:nth-child(2) { width: 16px; }
                .nav-burger-btn:hover span:nth-child(2) { width: 24px; }

                @media (max-width: 1100px) {
                  :root { --site-px: 36px; }
                  .nav-links        { display: none; }
                  .nav-contact-btn  { display: none; }
                  .nav-burger-btn   { display: flex; }
                  .nav-logo img     { height: 80px; }
                }

                @media (max-width: 768px) {
                  :root { --site-px: 20px; }
                  .nav-logo img { height: 64px; }
                }
                `}
            </style>

            <nav className={`nav-bar grid grid-cols-3 ${hidden ? "nav-hidden" : ""}`}>
                <div className="nav-logo flex">
                    <img src="/images/logo.png" alt="Logo" />
                </div>

                <ul className="nav-links flex items-center justify-center">
                    {navLinks.map((l) => (
                        <li key={l.label}>
                            <Link href={l.href}>{l.label}</Link>
                        </li>
                    ))}
                </ul>

                <div className="nav_btn flex items-center justify-end gap-4">
                    <div className="nav-contact-btn">
                        <ButtonPrimary label={"contact us"} color="#ffffff" href="/contact" />
                    </div>
                </div>
            </nav>
        </>
    );
}