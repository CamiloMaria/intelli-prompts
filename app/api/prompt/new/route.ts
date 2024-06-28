import Prompt from "@lib/models/prompt";
import { connectToDB } from "@lib/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        });

        await newPrompt.save();

        return new NextResponse(JSON.stringify({ message: "Prompt created successfully" }), {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Prompt creation failed" }), {
            status: 500,
        });
    }
};