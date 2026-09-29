"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE, IMG_HOST } from "@/libs/api";


export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [talents, setTalents] = useState([]);
  const [team, setTeam] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [talentsRes, teamRes, enquiriesRes, applicationsRes] = await Promise.all([
          fetch(`${API_BASE}/talents/list.php`).then((r) => r.json()).catch(() => []),
          fetch(`${API_BASE}/team/list.php`).then((r) => r.json()).catch(() => []),
          fetch(`${API_BASE}/contact/list.php`).then((r) => r.json()).catch(() => []),
          fetch(`${API_BASE}/applications/list.php`).then((r) => r.json()).catch(() => []),
        ]);
        setTalents(Array.isArray(talentsRes) ? talentsRes : []);
        setTeam(Array.isArray(teamRes) ? teamRes : []);
        setEnquiries(Array.isArray(enquiriesRes) ? enquiriesRes : []);
        setApplications(Array.isArray(applicationsRes) ? applicationsRes : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return <div style={{ fontSize: 13, color: "#888" }}>Loading dashboard...</div>;
  }

  const isThisMonth = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  };

  const unreadEnquiries = enquiries.filter((e) => e.is_read === "0" || e.is_read === 0).length;
  const unreadApplications = applications.filter((a) => a.is_read === "0" || a.is_read === 0).length;
  const enquiriesThisMonth = enquiries.filter((e) => isThisMonth(e.created_at)).length;
  const applicationsThisMonth = applications.filter((a) => isThisMonth(a.created_at)).length;

  const recentTalents = [...talents]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const recentTeam = [...team]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const activity = [
    ...enquiries.map((e) => ({
      type: "enquiry",
      id: e.id,
      title: e.name,
      subtitle: e.subject || "General enquiry",
      time: e.created_at,
      unread: e.is_read === "0" || e.is_read === 0,
    })),
    ...applications.map((a) => ({
      type: "application",
      id: a.id,
      title: a.name,
      subtitle: `${a.gender === "female" ? "Female" : "Male"} · ${a.city}`,
      time: a.created_at,
      unread: a.is_read === "0" || a.is_read === 0,
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 8);

  const timeAgo = (dateStr) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  // ── Breakdown helpers ──
  const talentGenderSplit = {
    female: talents.filter((t) => t.gender === "female").length,
    male: talents.filter((t) => t.gender === "male").length,
  };

  const applicationGenderSplit = {
    female: applications.filter((a) => a.gender === "female").length,
    male: applications.filter((a) => a.gender === "male").length,
  };

  const purposeCounts = enquiries.reduce((acc, e) => {
    const key = e.subject || "General";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const purposeBreakdown = Object.entries(purposeCounts).sort((a, b) => b[1] - a[1]);
  const maxPurposeCount = Math.max(1, ...purposeBreakdown.map(([, count]) => count));

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      {/* Header + quick actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#111" }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
            Welcome back — here's what's happening on the site.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/admin/talents/new" style={quickBtnStyle}>+ Add Talent</Link>
          <Link href="/admin/team/new" style={quickBtnStyleOutline}>+ Add Team Member</Link>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard label="Talents" value={talents.length} href="/admin/talents" color="#111" />
        <StatCard label="Team Members" value={team.length} href="/admin/team" color="#111" />
        <StatCard
          label="Contact Enquiries"
          value={enquiries.length}
          badge={unreadEnquiries > 0 ? unreadEnquiries : null}
          sub={`${enquiriesThisMonth} this month`}
          href="/admin/contact"
          color="#2563eb"
        />
        <StatCard
          label="Model Applications"
          value={applications.length}
          badge={unreadApplications > 0 ? unreadApplications : null}
          sub={`${applicationsThisMonth} this month`}
          href="/admin/applications"
          color="#2563eb"
        />
      </div>

      {/* Breakdown row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        <BreakdownCard title="Talent Roster">
          <GenderBar label="Female" count={talentGenderSplit.female} total={talents.length} color="#db2777" />
          <GenderBar label="Male" count={talentGenderSplit.male} total={talents.length} color="#2563eb" />
        </BreakdownCard>

        <BreakdownCard title="Applications by Gender">
          <GenderBar label="Female" count={applicationGenderSplit.female} total={applications.length} color="#db2777" />
          <GenderBar label="Male" count={applicationGenderSplit.male} total={applications.length} color="#2563eb" />
        </BreakdownCard>

        <BreakdownCard title="Enquiries by Purpose">
          {purposeBreakdown.length === 0 ? (
            <p style={{ fontSize: 12.5, color: "#999" }}>No enquiries yet.</p>
          ) : (
            purposeBreakdown.slice(0, 4).map(([label, count]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#555", marginBottom: 4 }}>
                  <span>{label}</span>
                  <span>{count}</span>
                </div>
                <div style={{ height: 5, background: "#f0f0f0", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(count / maxPurposeCount) * 100}%`, background: "#111", borderRadius: 3 }} />
                </div>
              </div>
            ))
          )}
        </BreakdownCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24, marginBottom: 24 }}>
        {/* Recent Talents */}
        <div style={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 10, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>Recent Talents</h2>
            <Link href="/admin/talents" style={{ fontSize: 12, color: "#666", textDecoration: "none" }}>
              View all →
            </Link>
          </div>

          {recentTalents.length === 0 ? (
            <p style={{ fontSize: 13, color: "#999" }}>No talents added yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {recentTalents.map((t) => (
                <RowLink key={t.id} href={`/admin/talents/${t.id}`}>
                  {t.main_image ? (
                    <img
                      src={`${IMG_HOST}${t.main_image}`}
                      alt={t.name}
                      style={{ width: 42, height: 52, objectFit: "cover", borderRadius: 6, border: "1px solid #eee", flexShrink: 0 }}
                    />
                  ) : (
                    <div style={{ width: 42, height: 52, borderRadius: 6, background: "#f0f0f0", flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
                      {t.gender === "female" ? "Female" : "Male"} · {timeAgo(t.created_at)}
                    </div>
                  </div>
                </RowLink>
              ))}
            </div>
          )}
        </div>

        {/* Recent Team Members */}
        <div style={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 10, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>Recent Team Members</h2>
            <Link href="/admin/team" style={{ fontSize: 12, color: "#666", textDecoration: "none" }}>
              View all →
            </Link>
          </div>

          {recentTeam.length === 0 ? (
            <p style={{ fontSize: 13, color: "#999" }}>No team members added yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {recentTeam.map((m) => (
                <RowLink key={m.id} href={`/admin/team/${m.id}`}>
                  {m.image ? (
                    <img
                      src={`${IMG_HOST}${m.image}`}
                      alt={m.name}
                      style={{ width: 42, height: 52, objectFit: "cover", borderRadius: 6, border: "1px solid #eee", flexShrink: 0 }}
                    />
                  ) : (
                    <div style={{ width: 42, height: 52, borderRadius: 6, background: "#f0f0f0", flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {m.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
                      {m.designation} · {timeAgo(m.created_at)}
                    </div>
                  </div>
                </RowLink>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity — enquiries + applications combined */}
      <div style={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 10, padding: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111", marginBottom: 18 }}>Recent Activity</h2>

        {activity.length === 0 ? (
          <p style={{ fontSize: 13, color: "#999" }}>No activity yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {activity.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={item.type === "enquiry" ? "/admin/contact" : "/admin/applications"}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "12px 8px",
                  borderBottom: "1px solid #f5f5f5",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    marginTop: 5,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: item.unread ? "#2563eb" : "#d4d4d8",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: item.unread ? 600 : 500, color: "#111" }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: 11, color: "#aaa", whiteSpace: "nowrap" }}>{timeAgo(item.time)}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
                    {item.type === "enquiry" ? "Contact enquiry" : "Model application"} · {item.subtitle}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, badge, sub, href, color }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        background: "#fff",
        border: "1px solid #e4e4e7",
        borderRadius: 10,
        padding: "20px 22px",
        textDecoration: "none",
        position: "relative",
      }}
    >
      {badge && (
        <span
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            fontSize: 10.5,
            fontWeight: 600,
            color: "#fff",
            background: "#2563eb",
            borderRadius: 999,
            padding: "2px 7px",
          }}
        >
          {badge} new
        </span>
      )}
      <div style={{ fontSize: 28, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 12.5, color: "#888", marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "#bbb", marginTop: 6 }}>{sub}</div>}
    </Link>
  );
}

function BreakdownCard({ title, children }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 10, padding: "20px 22px" }}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 16 }}>{title}</h3>
      {children}
    </div>
  );
}

function GenderBar({ label, count, total, color }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#555", marginBottom: 4 }}>
        <span>{label}</span>
        <span>{count}</span>
      </div>
      <div style={{ height: 6, background: "#f0f0f0", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

function RowLink({ href, children }) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "10px 8px",
        borderRadius: 8,
        textDecoration: "none",
        transition: "background 0.15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </Link>
  );
}

const quickBtnStyle = {
  padding: "10px 18px",
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 500,
};

const quickBtnStyleOutline = {
  padding: "10px 18px",
  background: "#fff",
  color: "#111",
  border: "1px solid #d4d4d8",
  textDecoration: "none",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 500,
};