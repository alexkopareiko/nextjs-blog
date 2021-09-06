import Layout, { siteTitle } from '../components/layout'
import useSWR from 'swr'
import { getSortedPostsData } from '../lib/posts'
import PropertyCard from "../components/propertyCard";

// const fetcher = (url) => fetch(url).then((res) => res.json())

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}


export default function Home({ allPostsData, children, home }) {
  // const { data, error } = useSWR('/api/houses', fetcher)
  // if (error) return <div>Failed to load</div>
  // if (!data) return <div>Loading...</div>
  return (
    <Layout {...home}>
      {/* {data.map((h, i) => (
         <PropertyCard house={h} key={h.id} />
       
      ))} */}
    </Layout>
  )
}