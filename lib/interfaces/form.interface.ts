import { Dispatch, SetStateAction } from "react";

export interface IForm {
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