import React, {FunctionComponent, useEffect, useState} from 'react';
import {PostApi} from "../../app/api";
import {Card, List} from "antd";
import Props from "../base";
import Post from "../../app/models/post/post";

interface PostComponent extends FunctionComponent<Props> {
}

const Posts: PostComponent = () => {
    const [initLoading, setInitLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(12);

    useEffect(() => {
        PostApi
            .fetchPosts(page, limit)
            .then(res => {
                const total = parseInt(res.headers['x-total-count']);
                const posts = res.data;

                setTotalPage(total);
                setPosts(posts);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setInitLoading(false);
            })
    }, [page, limit]);

    return (
        <>
            <List
                size="small"
                grid={{ gutter: 16, column: 4 }}
                loading={initLoading}
                dataSource={posts}
                itemLayout="vertical"
                pagination={{
                    onChange: (page, limit) => {
                        setPage(page);
                        setLimit(limit);
                    },
                    pageSize: limit,
                    total: totalPage
                }}
                renderItem={post => (
                    <List.Item
                    >
                        <Card title={post.title}>
                            {post.body}
                        </Card>
                    </List.Item>
                )}
            />
        </>
    );
}

export default Posts;
