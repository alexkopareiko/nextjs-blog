import useSWR from "swr";

export async function getSortedPostsData() {
    const fetcher = (url) => fetch(url).then((res) => res.json())

    const { data, error } = useSWR('api/products/list', fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    // Sort posts by date
    return data.sort(({ createdAt: a }, { createdAt: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}
