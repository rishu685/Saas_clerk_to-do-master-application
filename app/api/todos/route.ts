import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const ITEMS_PER_PAGE = 10;

export async function GET(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { 
        error: "Unauthorized", 
        message: "Please sign in to access your todos",
        code: "AUTH_REQUIRED"
      }, 
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";

  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId,
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      orderBy: { createdAt: "desc" },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    });

    const totalItems = await prisma.todo.count({
      where: {
        userId,
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return NextResponse.json({
      todos,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { 
        error: "Internal Server Error", 
        message: "Failed to fetch your todos. Please try again.",
        code: "FETCH_FAILED"
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { 
        error: "Unauthorized", 
        message: "Please sign in to create todos",
        code: "AUTH_REQUIRED"
      }, 
      { status: 401 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { todos: true },
    });

    if (!user) {
      return NextResponse.json(
        { 
          error: "User not found", 
          message: "Your account could not be found",
          code: "USER_NOT_FOUND"
        }, 
        { status: 404 }
      );
    }

    if (!user.isSubscribed && user.todos.length >= 3) {
      return NextResponse.json(
        {
          error: "Subscription required",
          message: "Free users can only create up to 3 todos. Please subscribe for more.",
          code: "SUBSCRIPTION_REQUIRED",
          upgradeUrl: "/subscribe"
        },
        { status: 403 }
      );
    }

    const { title } = await req.json();

    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { 
          error: "Invalid input", 
          message: "Todo title is required",
          code: "TITLE_REQUIRED"
        },
        { status: 400 }
      );
    }

    if (title.trim().length > 255) {
      return NextResponse.json(
        { 
          error: "Invalid input", 
          message: "Todo title must be less than 255 characters",
          code: "TITLE_TOO_LONG"
        },
        { status: 400 }
      );
    }

    const todo = await prisma.todo.create({
      data: { title: title.trim(), userId },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { 
        error: "Internal Server Error", 
        message: "Failed to create todo. Please try again.",
        code: "CREATE_FAILED"
      },
      { status: 500 }
    );
  }
}
