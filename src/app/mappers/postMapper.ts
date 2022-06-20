import Post from "../models/post/post";
import {PostDto} from "../dtos/postDto";
import { upperFirst } from "lodash";
import slugify from "../untils/slugify";

export const postMapperToDto = (post: Post): PostDto => ({
    id: post.id,
    title: upperFirst(post.title),
    slug: slugify(post.title),
    content: post.body,
});
