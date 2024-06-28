"use client"

import { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";
import { IPost } from "@lib/interfaces";
import { useDebouncedCallback } from "use-debounce";

export default function Feed() {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState<IPost[]>([]);

    const handleSearch = useDebouncedCallback((term: string) => {
        setSearch(term);
    }, 300);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/prompt`);
            const data = await res.json();
            setPosts(data);
        }

        fetchPosts();
    }, []);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or username"
                    onChange={(e) => handleSearch(e.target.value)}
                    required
                    className="search_input peer"
                />
            </form>

            <PromptCardList
                data={posts}
                handleTagclick={() => { }}
            />
        </section>
    )
}