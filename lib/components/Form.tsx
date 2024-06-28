import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface FormProps {
    type: string;
    post: {
        prompt: string;
        tag: string;
    };
    setPost: Dispatch<SetStateAction<{
        prompt: string;
        tag: string;
    }>>;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({
    type,
    post,
    setPost,
    submitting,
    handleSubmit
}: Readonly<FormProps>) => {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">
                    {type} Post
                </span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} a prompt to share with the community.
            </p>

            <form
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
                onSubmit={handleSubmit}
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Yout AI Prompt
                    </span>

                    <textarea
                        value={post.prompt}
                        onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                        placeholder="Write your AI Prompt here..."
                        required
                        className="form_textarea"
                    />
                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag {` `}
                        <span className="font-normal">
                            (#website, #game, #other)
                        </span>
                    </span>

                    <input
                        value={post.tag}
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                        placeholder="#tag"
                        required
                        className="form_input"
                    />
                </label>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        {submitting ? `Submitting...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form