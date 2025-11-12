import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { api } from "@/lib/api"; // або "@/lib/api/api"
import { logErrorResponse } from "@/lib/utils/logErrorResponse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type RouteCtx = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: RouteCtx) {
  try {
    const cookieHeader = cookies().toString();
    const { id } = params;

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { data, status } = await api.get(`/notes/${id}`, {
      headers: { Cookie: cookieHeader },
    });

    return NextResponse.json(data, { status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteCtx) {
  try {
    const cookieHeader = cookies().toString();
    const { id } = params;

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { data, status } = await api.delete(`/notes/${id}`, {
      headers: { Cookie: cookieHeader },
    });

    return NextResponse.json(data, { status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: RouteCtx) {
  try {
    const cookieHeader = cookies().toString();
    const { id } = params;

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const body = await req.json();

    const { data, status } = await api.patch(`/notes/${id}`, body, {
      headers: { Cookie: cookieHeader },
    });

    return NextResponse.json(data, { status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
