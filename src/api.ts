import { Param } from './types'

import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { createPost, getPost, getPosts } from './model'

const api = new Hono()

api.use('/posts/*', cors({
    origin: (origin) => {
        return origin.startsWith('http://localhost:') ? origin : null
    }
}))

api.get('/posts', async (c) => {
    const posts = await getPosts()
    return c.json({ ok: true, posts })
})

api.get('/posts/:id', async (c) => {
    const { id } = c.req.param()
    const post = await getPost(id)
    if (!post) {
        return c.json({ error: 'Not Found', ok: false }, 404)
    }
    return c.json({ ok: true, post })
})

api.post('/posts', async (c) => {
    const param = await c.req.parseBody() as Param;
    const newPost = await createPost(param as Param)
    if (!newPost) {
        return c.json({ error: 'Can not create new post', ok: false }, 422)
    }
    return c.json({ ok: true, post: newPost }, 201)
})

export default api
