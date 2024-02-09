import Head from "next/head";
import React from "react";
import styles from "./Layouts.module.scss";
import utilStyles from "../styles/utils.module.scss";
import { Children } from "react";

export const siteTitle = "ECsite Repos";

// export default function Layouts({ children }) {
//     return (
//         <div className={styles.container}>
//             <Head>
//                 <link rel="icon" href="/favicon.ico" />
//             </Head>
//             <header className={styles.header}>
//                 <img src="/logo.png" />
//                 <h1 className={utilStyles.headerText}>共通レイアウト</h1>
//             </header>
//             <main>{children}</main>
//         </div>
//     );
// }

function Layouts({ children }) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>ECsite Repos</title>
            </Head>
            <main>{children}</main>
        </div>
    );
}

export default Layouts;