import Prompt from "@lib/models/prompt";
import { connectToDB } from "@lib/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');

        return new NextResponse(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse( 'Failed to fetch the prompts'), {
            status: 500,
        };
    }
};