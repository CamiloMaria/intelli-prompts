import Prompt from "@lib/models/prompt";
import { connectToDB } from "@lib/utils/database";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    params: {
        id: string;
    };
}

export const GET = async (req: NextRequest, { params }: IParams) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) {
            return new Response('Prompt not found', {
                status: 404,
            });
        }

        return new Response(JSON.stringify(prompt), {
            status: 200,

        });
    } catch (error) {
        return new Response('Failed to fetch the prompts', {
            status: 500,
        });
    }
};