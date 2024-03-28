import Head from "next/head";
import React from "react";
import styles from "./Layouts.module.scss";
import utilStyles from "../styles/utils.module.scss";
import { Children } from "react";

export const siteTitle = "ECsite Repos";

function Layouts({ children }) {
    return (
        <div>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <title>ECsite Repos</title>
            </Head>
            <main>{children}</main>
        </div>
    );
}

export default Layouts;