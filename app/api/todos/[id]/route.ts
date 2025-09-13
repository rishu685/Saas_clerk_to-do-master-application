import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { 
        error: "Unauthorized", 
        message: "Please sign in to update todos",
        code: "AUTH_REQUIRED"
      }, 
      { status: 401 }
    );
  }

  try {
    const { completed } = await req.json();
    const todoId = params.id;

    if (typeof completed !== "boolean") {
      return NextResponse.json(
        { 
          error: "Invalid input", 
          message: "Completed status must be a boolean",
          code: "INVALID_COMPLETED_VALUE"
        },
        { status: 400 }
      );
    }

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return NextResponse.json(
        { 
          error: "Todo not found", 
          message: "The todo you're trying to update could not be found",
          code: "TODO_NOT_FOUND"
        }, 
        { status: 404 }
      );
    }

    if (todo.userId !== userId) {
      return NextResponse.json(
        { 
          error: "Forbidden", 
          message: "You don't have permission to update this todo",
          code: "INSUFFICIENT_PERMISSIONS"
        }, 
        { status: 403 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { completed },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { 
        error: "Internal Server Error", 
        message: "Failed to update todo. Please try again.",
        code: "UPDATE_FAILED"
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { 
        error: "Unauthorized", 
        message: "Please sign in to delete todos",
        code: "AUTH_REQUIRED"
      }, 
      { status: 401 }
    );
  }

  try {
    const todoId = params.id;

    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return NextResponse.json(
        { 
          error: "Todo not found", 
          message: "The todo you're trying to delete could not be found",
          code: "TODO_NOT_FOUND"
        }, 
        { status: 404 }
      );
    }

    if (todo.userId !== userId) {
      return NextResponse.json(
        { 
          error: "Forbidden", 
          message: "You don't have permission to delete this todo",
          code: "INSUFFICIENT_PERMISSIONS"
        }, 
        { status: 403 }
      );
    }

    await prisma.todo.delete({
      where: { id: todoId },
    });

    return NextResponse.json({ 
      message: "Todo deleted successfully",
      success: true 
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { 
        error: "Internal Server Error", 
        message: "Failed to delete todo. Please try again.",
        code: "DELETE_FAILED"
      },
      { status: 500 }
    );
  }
}
