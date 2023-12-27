import Head from "next/head";

export default function MyHeader(props) {

    return(
        <>
        <Head>
            <h1>{props.title}</h1>
        </Head>
        </>
    )
}