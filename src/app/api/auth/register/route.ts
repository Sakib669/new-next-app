import { connecttoDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    await connecttoDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User Already Registered" },
        { status: 400 },
      );
    }

    await User.create({ email, password });

    return NextResponse.json(
      {
        message: "User registration successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Registration error");
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 400 },
    );
  }
};
