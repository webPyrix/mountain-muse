"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { API_BASE } from "@/libs/api";

const icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  talents: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  team: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 20c0-3.3 2.5-6 5.5-6 2.4 0 4.4 1.7 5.1 4M14.5 14.3c2.6.3 4.6 2.5 4.6 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  contact: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  applications: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

const navItems = [
  { label: "Dashboard", href: "/admin", icon: icons.dashboard, key: "dashboard" },
  { label: "Talents", href: "/admin/talents", icon: icons.talents, key: "talents" },
  { label: "Team", href: "/admin/team", icon: icons.team, key: "team" },
  { label: "Contact Enquiries", href: "/admin/contact", icon: icons.contact, key: "contact" },
  { label: "Model Applications", href: "/admin/applications", icon: icons.applications, key: "applications" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unread, setUnread] = useState({ contact: 0, applications: 0 });
  const [loggingOut, setLoggingOut] = useState(false);

  // The login page must never show the sidebar/topbar chrome
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin-logout", { method: "POST" });
    } catch (err) {
      // even if the request fails, still send them to the login page
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  // Close sidebar automatically whenever the route changes (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Pull unread counts for badges
  useEffect(() => {
    if (isLoginPage) return;
    const fetchUnread = async () => {
      try {
        const [enquiries, applications] = await Promise.all([
          fetch(`${API_BASE}/contact/list.php`).then((r) => r.json()).catch(() => []),
          fetch(`${API_BASE}/applications/list.php`).then((r) => r.json()).catch(() => []),
        ]);
        setUnread({
          contact: Array.isArray(enquiries) ? enquiries.filter((e) => e.is_read === "0" || e.is_read === 0).length : 0,
          applications: Array.isArray(applications) ? applications.filter((a) => a.is_read === "0" || a.is_read === 0).length : 0,
        });
      } catch (err) {
        // silent — badges just won't show
      }
    };
    fetchUnread();
  }, [pathname, isLoginPage]);

  const currentPage = navItems.find(
    (item) => pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
  );

  // Render the login page bare — no sidebar, no topbar
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f5", fontFamily: "Arial, sans-serif" }}>
      <style>{`
        .admin-sidebar {
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .admin-nav-link {
          position: relative;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .admin-nav-link.active::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 8px;
          bottom: 8px;
          width: 3px;
          border-radius: 0 3px 3px 0;
          background: #fff;
        }
        .admin-overlay {
          animation: adminFadeIn 0.2s ease;
        }
        @keyframes adminFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (min-width: 901px) {
          .admin-sidebar { transform: translateX(0) !important; position: sticky !important; top: 0; height: 100vh; }
          .admin-overlay, .admin-hamburger { display: none !important; }
          .admin-main { margin-left: 0; }
        }
        @media (max-width: 900px) {
          .admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            z-index: 1000;
            transform: translateX(-100%);
          }
          .admin-sidebar.open { transform: translateX(0); }
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Mobile overlay backdrop */}
        {sidebarOpen && (
          <div
            className="admin-overlay"
            onClick={() => setSidebarOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999 }}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
          style={{
            width: 250,
            background: "#111",
            color: "#fff",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            padding: "24px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: 1 }}>Mountain Muse</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Admin Panel</div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="admin-hamburger"
              aria-label="Close menu"
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.6)",
                fontSize: 20,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 12px" }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              const badgeCount = unread[item.key];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-link ${isActive ? "active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "11px 14px",
                    borderRadius: 8,
                    textDecoration: "none",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                    background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                    fontSize: 13.5,
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <span style={{ display: "flex", flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {!!badgeCount && (
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        color: "#fff",
                        background: "#2563eb",
                        borderRadius: 999,
                        padding: "1px 7px",
                        flexShrink: 0,
                      }}
                    >
                      {badgeCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div style={{ marginTop: "auto", padding: "16px 24px 0" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
              Mountain Muse Management
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <main className="admin-main" style={{ flex: 1, minWidth: 0 }}>
          {/* Top bar */}
          <div
            style={{
              height: 64,
              borderBottom: "1px solid #e4e4e7",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
              position: "sticky",
              top: 0,
              zIndex: 50,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button
                onClick={() => setSidebarOpen(true)}
                className="admin-hamburger"
                aria-label="Open menu"
                style={{
                  background: "none",
                  border: "1px solid #e4e4e7",
                  borderRadius: 8,
                  width: 36,
                  height: 36,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>
                {currentPage?.label || "Admin"}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 13, color: "#666" }}>Logged in as Pema</span>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 14px",
                  background: "#fff",
                  color: "#dc2626",
                  border: "1px solid #fecaca",
                  borderRadius: 7,
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: loggingOut ? "default" : "pointer",
                  opacity: loggingOut ? 0.6 : 1,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>

          {/* Page content */}
          <div style={{ padding: 32 }}>{children}</div>
        </main>
      </div>
    </div>
  );
}