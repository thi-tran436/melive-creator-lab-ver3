export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getAllApplications } from "@/lib/sheets";
import type { Application } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") ?? "";
    const platform = searchParams.get("platform") ?? "";
    const search = searchParams.get("search")?.toLowerCase() ?? "";
    const followers = searchParams.get("followers") ?? "";
    const exportCsv = searchParams.get("export") === "true";
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "25");

    let apps = await getAllApplications();

    if (status) apps = apps.filter(a => a.status === status);
    if (platform) apps = apps.filter(a => a.platform === platform);
    if (followers) apps = apps.filter(a => a.followers === followers);
    if (search) apps = apps.filter(a =>
      [a.firstName, a.lastName, a.email, a.handle, a.cityState].some(f => f?.toLowerCase().includes(search))
    );

    apps = apps.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (exportCsv) {
      const headers = ["ID","Created","First Name","Last Name","Email","Phone","City/State","Platform","Handle","Followers","Categories","GMV","Full-time","Status","Notes","UTM Source"];
      const rows = apps.map(a => [a.id, a.createdAt, a.firstName, a.lastName, a.email, a.phone ?? "", a.cityState, a.platform, a.handle, a.followers, a.categories.join("; "), a.currentGmv ?? "", a.fulltime, a.status, `"${(a.notes ?? "").replace(/"/g,'""')}"`, a.utmSource ?? ""]);
      const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
      return new NextResponse(csv, { headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="melive-applications-${new Date().toISOString().split("T")[0]}.csv"` } });
    }

    const stats = {
      total: apps.length,
      byStatus: { new: 0, reviewing: 0, shortlisted: 0, approved: 0, rejected: 0, contacted: 0 } as Record<string, number>,
      byPlatform: { TikTok: 0, Instagram: 0, YouTube: 0, "Twitch/Kick": 0 } as Record<string, number>,
    };
    apps.forEach(a => { if (a.status in stats.byStatus) stats.byStatus[a.status]++; if (a.platform in stats.byPlatform) stats.byPlatform[a.platform]++; });

    const total = apps.length;
    const paginated = apps.slice((page - 1) * limit, page * limit);

    return NextResponse.json({ applications: paginated, total, page, limit, totalPages: Math.ceil(total / limit), stats });
  } catch (e) {
    console.error("[Admin API] Error fetching applications:", e);
    return NextResponse.json({ error: "Failed to fetch applications." }, { status: 500 });
  }
}
