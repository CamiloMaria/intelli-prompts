'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Profile } from "@lib/components"
import { ISession } from "@lib/interfaces/session.interface"
import { IPost } from "@lib/interfaces"

const MyProfile = () => {
    const { data } = useSession();
    const session = data as ISession["session"];
    const [posts, setPosts] = useState<IPost[]>([]);
    const router = useRouter();

    const handleEdit = (post: IPost) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = () => {
    }

    const fetchPosts = async () => {
        if (!session) return;

        const res = await fetch(`/api/users/${session.user?.id}/posts`);
        const data = await res.json();
        setPosts(data);
    }

    useEffect(() => {
        if (session && session.user?.id) fetchPosts();
    }, []);

    return (
        <Profile
            name="My"
            desc="This is my profile."
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile