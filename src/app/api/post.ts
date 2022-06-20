import HttpClient from "../services/HttpClient";

const fetchPosts = (page: number, limit: number = 12) => {
    return HttpClient.get(`/posts?_page=${page}&_limit=${limit}`);
}

const fetchPost = (id: number) => {
    return HttpClient.get(`/posts/${id}`);
}

const createPost = (data: object) => {
    return HttpClient.post('/posts', data);
}

export {
    fetchPosts,
    fetchPost,
    createPost,
}
