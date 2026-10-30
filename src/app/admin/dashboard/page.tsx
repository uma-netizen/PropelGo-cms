import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import {
  Building2,
  ChartNoAxesCombined,
  FileText,
  Handshake,
  Medal,
  Users,
} from "lucide-react";

import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import LogoutButton from "./logout-button";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AdminRow = {
  name: string;
  email: string;
};

const modules = [
  {
    title: "Banks",
    description: "Manage bank names and logos.",
    href: "/admin/banks",
    icon: Building2,
  },
  {
    title: "Partners",
    description: "Manage partners and their logos.",
    href: "/admin/partners",
    icon: Handshake,
  },
  {
    title: "Accreditations",
    description: "Manage certifications and credentials.",
    href: "/admin/accreditations",
    icon: Medal,
  },
  {
    title: "Statistics",
    description: "Edit the four website statistics.",
    href: "/admin/statistics",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Articles",
    description: "Publish article content and images.",
    href: "/admin/articles",
    icon: FileText,
  },
  {
    title: "Team",
    description: "Manage team profiles and designations.",
    href: "/admin/team",
    icon: Users,
  },
];

export default async function AdminDashboardPage() {
  const session = await requireAdmin();

  const admins = await query<AdminRow[]>(
    `SELECT name, email
     FROM admin_users
     WHERE id = ? AND is_active = TRUE
     LIMIT 1`,
    [session.adminId],
  );

  if (!admins[0]) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <p className="text-slate-700">
          Your admin account is unavailable. Please sign in again.
        </p>
      </main>
    );
  }

  const admin = admins[0];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="min-h-screen lg:grid lg:grid-cols-[270px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-white lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <div className="border-b border-slate-100 px-6 py-6">
            <BrandLogo width={190} />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
              Content studio
            </p>
          </div>

          <nav className="space-y-1 p-4" aria-label="Website content modules">
            <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Website modules
            </p>

            {modules.map((module) => {
              const Icon = module.icon;

              return (
                <Link
                  key={module.href}
                  href={module.href}
                  className="group flex items-start gap-3 rounded-xl px-3 py-3 transition hover:bg-teal-50"
                >
                  <span className="mt-0.5 rounded-lg bg-slate-100 p-2 text-slate-600 transition group-hover:bg-teal-100 group-hover:text-teal-800">
                    <Icon size={18} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-800 group-hover:text-teal-800">
                      {module.title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      {module.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 p-5">
            <div className="mb-4 min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                {admin.name}
              </p>
              <p className="mt-1 break-all text-xs text-slate-500">
                {admin.email}
              </p>
            </div>
            <LogoutButton />
          </div>
        </aside>

        <section className="min-w-0">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                PropelGo / Admin
              </p>
              <h1 className="mt-1 text-lg font-semibold text-slate-900">
                Content management dashboard
              </h1>
            </div>

            <a
              href="https://propelgo.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800"
            >
              View live website ↗
            </a>
          </header>

          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
            <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 right-1/4 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative">
                <p className="text-sm font-medium text-teal-300">
                  Welcome back
                </p>

                <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Good to see you, {admin.name}.
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  Keep PropelGo’s website content consistent and up to date.
                  Choose a module from the left navigation to manage its
                  images, descriptions, records and publication status.
                </p>

                <a
                  href="https://propelgo.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex rounded-xl bg-teal-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-300"
                >
                  Open PropelGo website
                </a>
              </div>
            </section>

            <div className="mt-9 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Website modules
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  All six content sections, organized in one place.
                </p>
              </div>

              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                6 modules
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <Link
                    key={module.href}
                    href={module.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-xl bg-teal-50 p-3 text-teal-800 transition group-hover:bg-teal-100">
                        <Icon size={22} />
                      </span>

                      <span className="text-lg text-slate-300 transition group-hover:translate-x-1 group-hover:text-teal-700">
                        →
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-semibold text-slate-900 group-hover:text-teal-800">
                      {module.title}
                    </h3>

                    <p className="mt-2 min-h-10 text-sm leading-6 text-slate-500">
                      {module.description}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-teal-800">
                      Manage section
                    </p>
                  </Link>
                );
              })}
            </div>

            <p className="mt-8 text-xs leading-5 text-slate-400">
              Changes saved here are stored in your connected database.
              Published website sections must also be connected to the
              corresponding public-facing frontend.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}