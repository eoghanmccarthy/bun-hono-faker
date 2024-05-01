import { Post, Param } from './types'

import { blog } from "./data";

let posts: Post[] = []

export const getPosts = async (type: string = 'blog'): Promise<Post[]> => {
    if (type === 'blog') {
        posts = blog
    }
    return posts
}

export const getPost = async (id: string): Promise<Post | undefined> => {
    const post = posts.find((data) => data.id === Number.parseInt(id))
    if (!post) {
        return
    }
    return post
}

export const createPost = async (param: Param): Promise<Post | undefined> => {
    if (!(param && param.title && param.content)) {
        return
    }
    const id =  posts.length + 1;
    const newPost: Post = { content: param.content, id, title: param.title }
    posts.push(newPost)
    return newPost
}
