"use client";
import { ButtonPrimary } from "@/components/ui/Button";

export default function Nav() {
    return (
        <>
            <style>
                {`
                :root {
                  --site-px: 52px;
                }

                /* NAV */
                .nav-bar {
                  position: fixed;
                  top: 0; left: 0; right: 0;
                  z-index: 200;
                  padding: 0px var(--site-px);
                  color: #fff;
                }
                .nav-logo img {
                  height: 100px;
                }

                .nav-links { display: flex; gap: 40px; list-style: none; }
                .nav-links a {
                  font-size: 10px;
                  letter-spacing: 3px;
                  text-transform: uppercase;
                  color: #fff;
                  text-decoration: none;
                  opacity: 0.7;
                  transition: opacity 0.25s;
                }
                .nav-links a:hover { opacity: 1; }

                /* Burger in nav — hidden on desktop */
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

                /* ≤1000px: hide links & contact, show burger */
                @media (max-width: 1000px) {
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

            <nav className="nav-bar grid grid-cols-3">
                <div className="nav-logo flex">
                    <img src="/images/logo.png" alt="Logo" />
                </div>

                {/* Center links — hidden ≤1000px */}
                <ul className="nav-links flex items-center justify-center">
                    {["Home", "About", "Services", "Portfolio"].map((l) => (
                        <li key={l}><a href="#">{l}</a></li>
                    ))}
                </ul>

                {/* Right slot */}
                <div className="nav_btn flex items-center justify-end gap-4">
                    {/* Contact — hidden ≤1000px */}
                    <div className="nav-contact-btn">
                        <ButtonPrimary label={"contact us"} color="#ffffff" />
                    </div>
                </div>
            </nav>
        </>
    );
}