import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import Title from "../../components/Layout/Title";
import Layouts from "../../components/Layouts";
import Login from "../../components/Form/Login";
import utilStyles from "../../styles/utils.module.scss";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Page() {

    return (
        <Layouts>
        <Header searchQuery={undefined} />
        <div className={utilStyles.body}>
            <Title
                contentTitle={'ログイン'}
                subTitle={'Login'}
            />
            <div className={utilStyles.inner}>
                <Login />
            </div>
        </div>
        <Footer />
      </Layouts>
    )
};