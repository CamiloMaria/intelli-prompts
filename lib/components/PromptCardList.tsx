import { IPost } from "@lib/interfaces"
import PromptCard from "./PromptCard"

const PromptCardList = (
    { data, handleTagclick }: Readonly<{
        data: IPost[],
        handleTagclick: (tag: string) => void
    }>
) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagclick}
                />
            ))}
        </div>
    )
}

export default PromptCardList