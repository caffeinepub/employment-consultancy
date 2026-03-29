import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Eye,
  LogOut,
  ShieldCheck,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useGetAllConsultations,
  useGetPageVisitCount,
  useUpdateConsultationStatus,
} from "./hooks/useQueries";

// ─── Credentials ────────────────────────────────────────────────────────────
const ADMINS: Record<string, string> = {
  hassan: "Hassan@2024",
  dipti: "Dipti@2024",
};

// ─── Status config ──────────────────────────────────────────────────────────
type Status = "new" | "contacted" | "in_progress" | "closed";

const STATUS_LABELS: Record<Status, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In Progress",
  closed: "Closed",
};

const STATUS_CLASSES: Record<Status, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-amber-100 text-amber-700 border-amber-200",
  in_progress: "bg-purple-100 text-purple-700 border-purple-200",
  closed: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4"];

// ─── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (user: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (ADMINS[username.toLowerCase()] === password) {
      sessionStorage.setItem("adminLoggedIn", "true");
      sessionStorage.setItem("adminUser", username);
      onLogin(username);
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "oklch(0.14 0.03 255)" }}
    >
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div
          className="rounded-2xl p-8 shadow-2xl border"
          style={{
            background: "oklch(0.18 0.03 255)",
            borderColor: "oklch(0.28 0.05 255)",
          }}
        >
          <div className="flex flex-col items-center gap-3 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "oklch(0.52 0.18 255)" }}
            >
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div className="text-center">
              <h1
                className="text-xl font-bold tracking-tight"
                style={{ color: "oklch(0.95 0.01 255)" }}
              >
                USWTS Admin
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.6 0.05 255)" }}
              >
                Dashboard Portal
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="admin-username"
                className="text-sm font-medium"
                style={{ color: "oklch(0.75 0.05 255)" }}
              >
                Username
              </Label>
              <Input
                id="admin-username"
                data-ocid="admin.login.input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="hassan or dipti"
                autoComplete="username"
                className="border text-white placeholder:opacity-40"
                style={{
                  background: "oklch(0.22 0.04 255)",
                  borderColor: "oklch(0.32 0.06 255)",
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="admin-password"
                className="text-sm font-medium"
                style={{ color: "oklch(0.75 0.05 255)" }}
              >
                Password
              </Label>
              <Input
                id="admin-password"
                data-ocid="admin.password.input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="border text-white placeholder:opacity-40"
                style={{
                  background: "oklch(0.22 0.04 255)",
                  borderColor: "oklch(0.32 0.06 255)",
                }}
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs py-2 px-3 rounded-lg border"
                  style={{
                    color: "oklch(0.75 0.18 25)",
                    background: "oklch(0.22 0.06 25 / 0.3)",
                    borderColor: "oklch(0.4 0.1 25)",
                  }}
                  data-ocid="admin.login.error_state"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              className="w-full font-semibold text-white mt-2"
              style={{ background: "oklch(0.52 0.18 255)" }}
              data-ocid="admin.login.submit_button"
            >
              Sign In
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Consultation Row ────────────────────────────────────────────────────────
interface Consultation {
  id: bigint;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  timestamp: bigint;
}

function ConsultationRow({
  item,
  index,
  onStatusUpdate,
}: {
  item: Consultation;
  index: number;
  onStatusUpdate: (id: bigint, status: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const status = (item.status || "new") as Status;
  const date = new Date(Number(item.timestamp / BigInt(1_000_000)));
  const dateStr = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  function toggleExpanded() {
    setExpanded((v) => !v);
  }

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="border-b last:border-0"
      style={{ borderColor: "oklch(0.24 0.04 255)" }}
      data-ocid={`consultations.item.${index + 1}`}
    >
      <td className="py-4 px-4">
        <div
          className="font-semibold text-sm"
          style={{ color: "oklch(0.92 0.02 255)" }}
        >
          {item.name}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="text-sm" style={{ color: "oklch(0.7 0.05 255)" }}>
          <div>{item.email}</div>
          {item.phone && (
            <div
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.55 0.05 255)" }}
            >
              {item.phone}
            </div>
          )}
        </div>
      </td>
      <td className="py-4 px-4 max-w-xs">
        <button
          type="button"
          className="text-sm cursor-pointer text-left w-full bg-transparent border-0 p-0"
          style={{ color: "oklch(0.7 0.05 255)" }}
          onClick={toggleExpanded}
          data-ocid={`consultations.row.${index + 1}`}
        >
          {expanded ? (
            <span>{item.message}</span>
          ) : (
            <span>
              {item.message.length > 80
                ? `${item.message.slice(0, 80)}…`
                : item.message}
            </span>
          )}
          {item.message.length > 80 && (
            <span
              className="ml-1 inline-flex items-center gap-0.5 text-xs"
              style={{ color: "oklch(0.6 0.12 255)" }}
            >
              {expanded ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </span>
          )}
        </button>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="text-sm" style={{ color: "oklch(0.65 0.04 255)" }}>
          {dateStr}
        </div>
        <div className="text-xs" style={{ color: "oklch(0.48 0.04 255)" }}>
          {timeStr}
        </div>
      </td>
      <td className="py-4 px-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            STATUS_CLASSES[status] || STATUS_CLASSES.new
          }`}
        >
          {STATUS_LABELS[status] || status}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="flex gap-1.5 flex-wrap">
          {(["contacted", "in_progress", "closed"] as Status[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onStatusUpdate(item.id, s)}
              disabled={status === s}
              data-ocid={`consultations.${s}.button`}
              className="text-xs px-2.5 py-1 rounded-lg border font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
              style={{
                background:
                  status === s
                    ? "oklch(0.28 0.06 255)"
                    : "oklch(0.22 0.04 255)",
                borderColor: "oklch(0.32 0.06 255)",
                color: "oklch(0.75 0.08 255)",
              }}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </td>
    </motion.tr>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function Dashboard({ user, onLogout }: { user: string; onLogout: () => void }) {
  const [filter, setFilter] = useState<"all" | Status>("all");
  const { data: consultations, isLoading } = useGetAllConsultations();
  const { data: visitCount } = useGetPageVisitCount();
  const updateStatus = useUpdateConsultationStatus();
  const queryClient = useQueryClient();

  const items = (consultations ?? []) as Consultation[];
  const newCount = items.filter((c) => !c.status || c.status === "new").length;
  const filtered =
    filter === "all"
      ? items
      : items.filter((c) => (c.status || "new") === filter);

  function handleStatusUpdate(id: bigint, status: string) {
    updateStatus.mutate(
      { id, status },
      {
        onSuccess: () => {
          toast.success("Status updated");
          queryClient.invalidateQueries({ queryKey: ["consultations"] });
        },
        onError: () => toast.error("Failed to update status"),
      },
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.14 0.03 255)" }}
    >
      <Toaster />

      {/* Header */}
      <header
        className="border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10"
        style={{
          background: "oklch(0.16 0.03 255)",
          borderColor: "oklch(0.22 0.04 255)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "oklch(0.52 0.18 255)" }}
          >
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span
              className="text-sm font-bold tracking-tight"
              style={{ color: "oklch(0.92 0.02 255)" }}
            >
              USWTS Admin
            </span>
            <span
              className="ml-2 text-xs"
              style={{ color: "oklch(0.52 0.06 255)" }}
            >
              Logged in as{" "}
              <strong style={{ color: "oklch(0.72 0.1 255)" }}>{user}</strong>
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          data-ocid="admin.logout.button"
          className="gap-2 text-sm"
          style={{ color: "oklch(0.6 0.05 255)" }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <ClipboardList className="w-5 h-5" />,
              label: "Total Submissions",
              value: isLoading ? "—" : items.length,
              color: "oklch(0.52 0.18 255)",
              ocid: "admin.total.card",
            },
            {
              icon: <Bell className="w-5 h-5" />,
              label: "New / Unread",
              value: isLoading ? "—" : newCount,
              color: "oklch(0.68 0.18 145)",
              ocid: "admin.new.card",
            },
            {
              icon: <Eye className="w-5 h-5" />,
              label: "Page Visits",
              value:
                visitCount !== undefined
                  ? Number(visitCount).toLocaleString()
                  : "—",
              color: "oklch(0.65 0.18 55)",
              ocid: "admin.visits.card",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              data-ocid={stat.ocid}
            >
              <Card
                className="border"
                style={{
                  background: "oklch(0.18 0.04 255)",
                  borderColor: "oklch(0.26 0.05 255)",
                }}
              >
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: "oklch(0.55 0.05 255)" }}
                      >
                        {stat.label}
                      </p>
                      <p
                        className="text-3xl font-bold mt-1"
                        style={{ color: "oklch(0.92 0.02 255)" }}
                      >
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
                      style={{ background: stat.color }}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Table */}
        <Card
          className="border"
          style={{
            background: "oklch(0.18 0.04 255)",
            borderColor: "oklch(0.26 0.05 255)",
          }}
        >
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle
                className="text-base font-semibold"
                style={{ color: "oklch(0.92 0.02 255)" }}
              >
                Consultation Submissions
              </CardTitle>

              <div
                className="flex gap-1.5 flex-wrap"
                data-ocid="admin.filter.tab"
              >
                {(
                  ["all", "new", "contacted", "in_progress", "closed"] as const
                ).map((f) => {
                  const labels: Record<string, string> = {
                    all: "All",
                    new: "New",
                    contacted: "Contacted",
                    in_progress: "In Progress",
                    closed: "Closed",
                  };
                  const isActive = filter === f;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className="text-xs px-3 py-1.5 rounded-lg border font-medium transition-all"
                      style={{
                        background: isActive
                          ? "oklch(0.52 0.18 255)"
                          : "oklch(0.22 0.04 255)",
                        borderColor: isActive
                          ? "oklch(0.52 0.18 255)"
                          : "oklch(0.30 0.05 255)",
                        color: isActive ? "white" : "oklch(0.65 0.05 255)",
                      }}
                    >
                      {labels[f]}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-3" data-ocid="admin.loading_state">
                {SKELETON_KEYS.map((k) => (
                  <Skeleton
                    key={k}
                    className="h-12 w-full rounded-lg"
                    style={{ background: "oklch(0.22 0.04 255)" }}
                  />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="py-16 text-center"
                data-ocid="consultations.empty_state"
              >
                <Users
                  className="w-10 h-10 mx-auto mb-3"
                  style={{ color: "oklch(0.38 0.05 255)" }}
                />
                <p className="text-sm" style={{ color: "oklch(0.5 0.05 255)" }}>
                  No submissions found
                </p>
              </div>
            ) : (
              <ScrollArea className="w-full">
                <div className="min-w-[800px]">
                  <table className="w-full">
                    <thead>
                      <tr
                        className="border-b"
                        style={{ borderColor: "oklch(0.24 0.04 255)" }}
                      >
                        {[
                          "Name",
                          "Contact",
                          "Message",
                          "Date",
                          "Status",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider"
                            style={{ color: "oklch(0.52 0.06 255)" }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item, i) => (
                        <ConsultationRow
                          key={String(item.id)}
                          item={item}
                          index={i}
                          onStatusUpdate={handleStatusUpdate}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const stored = sessionStorage.getItem("adminLoggedIn") === "true";
  const storedUser = sessionStorage.getItem("adminUser") ?? "";
  const [loggedIn, setLoggedIn] = useState(stored);
  const [user, setUser] = useState(storedUser);

  function handleLogin(username: string) {
    setLoggedIn(true);
    setUser(username);
  }

  function handleLogout() {
    sessionStorage.removeItem("adminLoggedIn");
    sessionStorage.removeItem("adminUser");
    setLoggedIn(false);
    setUser("");
  }

  if (!loggedIn) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard user={user} onLogout={handleLogout} />;
}
