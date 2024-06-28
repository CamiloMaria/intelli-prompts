import Prompt from "@lib/models/prompt";
import { connectToDB } from "@lib/utils/database";
import { NextRequest } from "next/server";

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
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response('Failed to fetch the prompts', {
            status: 500,
        });
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
            return new Response('Prompt not found', {
                status: 404,
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response('Failed to update the prompt', {
            status: 500,
        });
    }
}

export const DELETE = async (req: NextRequest, { params }: IParams) => {
    try {
        await connectToDB();

        const data = await Prompt.findByIdAndDelete(params.id);

        if (!data) {
            return new Response('Prompt not found', {
                status: 404,
            });
        }

        return new Response('Prompt deleted successfully', {
            status: 200,
        });
    } catch (error) {
        return new Response('Failed to delete the prompt', {
            status: 500,
        });
    }
}