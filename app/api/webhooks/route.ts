import prisma from "@/app/lib/db";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      const { id, email_addresses, first_name } = evt.data;

      const userExists = await prisma.user.findUnique({
        where: {
          email: email_addresses[0].email_address,
        },
      });

      if (userExists) {
        return new Response("User already exists", { status: 200 });
      }

      try {
        await prisma.user.create({
          data: {
            id,
            email: email_addresses[0].email_address,
            name: first_name,
          },
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Error creating user", { status: 400 });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
