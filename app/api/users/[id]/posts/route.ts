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

        const prompts = await Prompt.find({
            creator: params.id,
        }).populate('creator');

        return new NextResponse(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse('Failed to fetch the prompts'), {
            status: 500,
        };
    }
};