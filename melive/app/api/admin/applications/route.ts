export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getAllApplications, updateApplicationStatus } from "@/lib/sheets";
import type { ApplicationStatus } from "@/types";

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

    let applications = await getAllApplications();

    // Apply filters
    if (status) {
      applications = applications.filter((a) => a.status === status);
    }
    if (platform) {
      applications = applications.filter((a) => a.platform === platform);
    }
    if (followers) {
      applications = applications.filter((a) => a.followers === followers);
    }
    if (search) {
      applications = applications.filter(
        (a) =>
          a.firstName.toLowerCase().includes(search) ||
          a.lastName.toLowerCase().includes(search) ||
          a.email.toLowerCase().includes(search) ||
          a.handle.toLowerCase().includes(search) ||
          a.cityState.toLowerCase().includes(search)
      );
    }

    // Sort newest first
    applications = applications.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // CSV export
    if (exportCsv) {
      const headers = [
        "ID", "Created At", "First Name", "Last Name", "Email", "Phone",
        "City/State", "Platform", "Handle", "Followers", "Categories",
        "Current GMV", "Full-time", "Pitch", "Links", "Status", "Notes",
        "UTM Source", "UTM Medium", "UTM Campaign",
      ];

      const rows = applications.map((a) => [
        a.id,
        a.createdAt,
        a.firstName,
        a.lastName,
        a.email,
        a.phone ?? "",
        a.cityState,
        a.platform,
        a.handle,
        a.followers,
        a.categories.join("; "),
        a.currentGmv ?? "",
        a.fulltime,
        `"${(a.pitch ?? "").replace(/"/g, '""')}"`,
        `"${(a.links ?? "").replace(/"/g, '""')}"`,
        a.status,
        `"${(a.notes ?? "").replace(/"/g, '""')}"`,
        a.utmSource ?? "",
        a.utmMedium ?? "",
        a.utmCampaign ?? "",
      ]);

      const csv = [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="melive-applications-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      });
    }

    // Stats
    const stats = {
      total: applications.length,
      byStatus: {
        new: applications.filter((a) => a.status === "new").length,
        reviewing: applications.filter((a) => a.status === "reviewing").length,
        shortlisted: applications.filter((a) => a.status === "shortlisted").length,
        approved: applications.filter((a) => a.status === "approved").length,
        rejected: applications.filter((a) => a.status === "rejected").length,
        contacted: applications.filter((a) => a.status === "contacted").length,
      },
      byPlatform: {
        TikTok: applications.filter((a) => a.platform === "TikTok").length,
        Instagram: applications.filter((a) => a.platform === "Instagram").length,
        YouTube: applications.filter((a) => a.platform === "YouTube").length,
        "Twitch/Kick": applications.filter((a) => a.platform === "Twitch/Kick").length,
      },
    };

    // Paginate
    const totalCount = applications.length;
    const paginated = applications.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      applications: paginated,
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      stats,
    });
  } catch (err) {
    console.error("[Admin API] Error fetching applications:", err);
    return NextResponse.json(
      { error: "Failed to fetch applications." },
      { status: 500 }
    );
  }
}
