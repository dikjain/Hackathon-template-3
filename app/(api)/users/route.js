import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "../../index";
import { usersTable } from "../../db/schema";

export async function POST(request) {
  try {
    const { user } = await request.json();

    if (!user?.primaryEmailAddress?.emailAddress || !user?.fullName) {
      return new NextResponse("Email and name are required", { status: 400 });
    }

    const userData = await db.select().from(usersTable).where(
      eq(usersTable.email, user.primaryEmailAddress.emailAddress)
    );  

    if (userData.length <= 0) {
      const newUser = await db.insert(usersTable).values({
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        age: 0,
      }).returning();

      return NextResponse.json(newUser[0]);
    }

    return NextResponse.json(userData[0]);
  } catch (error) {
    console.error("Error in POST /users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
