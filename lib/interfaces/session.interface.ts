import { Session } from "next-auth"

export interface ISession {
    session?: Session & {
        user?: {
            id?: string
        }
    }
}
