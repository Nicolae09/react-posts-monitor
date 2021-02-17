import {gql, useLazyQuery} from "@apollo/client";

const FetchPosts = () => {


    const GET_ALL_POSTS = gql`
        {
            allPosts(count: 500) {
                id,
                title,
                body,
                published,
                createdAt,
                author {
                    id,
                    firstName,
                    lastName,
                    email,
                    avatar
                }
                likelyTopics {
                    label,
                    likelihood
                }
          }
        }
    `;

    const [loadAllPosts, {called, loading, error, data}] = useLazyQuery(GET_ALL_POSTS);

    return {
        loadAllPosts,
        called,
        loading,
        error,
        data
    }
};

export default FetchPosts;
