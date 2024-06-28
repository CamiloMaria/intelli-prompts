'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Form } from "@lib/components"

const EditPrompt = () => {
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const fetchPromptDetails = async () => {
        const res = await fetch(`/api/prompt/${promptId}`);
        const data = await res.json();
        setPost({
            prompt: data.prompt,
            tag: data.tag
        });
    }

    useEffect(() => {
        if (promptId) fetchPromptDetails();
    }, [promptId])

    const UpdatePrompt = async () => {
        if (!promptId) return;

        setSubmitting(true)

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={(e) => {
                e.preventDefault()
                UpdatePrompt()
            }}
        />
    )
}

export default EditPrompt