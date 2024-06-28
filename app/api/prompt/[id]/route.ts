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
            return new NextResponse('Prompt not found', {
                status: 404,
            });
        }

        return new NextResponse(JSON.stringify(prompt), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse('Failed to fetch the prompts'), {
            status: 500,
        };
    }
};

export const PATCH = async (req: NextRequest, { params }: IParams) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();

        const data = await Prompt.findByIdAndUpdate(params.id, {
            prompt,
            tag,
        }, {
            new: true,
        });

        if (!data) {
            return new NextResponse('Prompt not found', {
                status: 404,
            });
        }

        return new NextResponse(JSON.stringify(data), {
            status: 200,
        });
    } catch (error) {
        return new NextResponse('Failed to update the prompt', {
            status: 500,
        });
    }
}

export const DELETE = async (req: NextRequest, { params }: IParams) => {
    try {
        await connectToDB();

        const data = await Prompt.findByIdAndDelete(params.id);

        if (!data) {
            return new NextResponse('Prompt not found', {
                status: 404,
            });
        }

        return new NextResponse('Prompt deleted successfully', {
            status: 200,
        });
    } catch (error) {
        return new NextResponse('Failed to delete the prompt', {
            status: 500,
        });
    }
}