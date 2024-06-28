import Prompt from "@lib/models/prompt";
import { connectToDB } from "@lib/utils/database";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Corrected the syntax error in the catch block
        return new Response('Failed to fetch the prompts', {
            status: 500,
        });
    }
};