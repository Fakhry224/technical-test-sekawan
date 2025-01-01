import { NextResponse } from "next/server";

export default function GET() {
  return NextResponse().json(
    {
      data: [
        { id: 1, name: "Office 1" },
        { id: 2, name: "Office 2" },
      ],
    },
    { status: 200 }
  );
}
