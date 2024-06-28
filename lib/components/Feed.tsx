"use client"

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagclick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagclick={handleTagclick}
                />
            ))}
        </div>
    )
}

export default function Feed() {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

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
                    value={search}
                    onChange={handleSearch}
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