import Model from "../base";

interface Post extends Model {
    userId: number;
    title: string;
    body: string;
}

export default Post;
