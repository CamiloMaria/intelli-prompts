import { Profile } from "next-auth";

export interface IProfile {
    profile?: Profile & {
        picture?: string
    };
}