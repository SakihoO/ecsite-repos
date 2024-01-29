import Layouts from "../../components/Layouts";
import { getAllCatIds, getCatData } from "../../lib/category";
import utilStyles from "../../styles/utils.module.scss";



export async function getStaticPaths() {
    const paths = getAllCatIds();

    // fallbackプロパティをfalseにする：パスに含まれていない他のパスはアクセスすると404NOTFOUNDになる
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const catsData = await getCatData(params.id);

    return {
        props: {
            catsData,
        },
    };
}

export default function Post({ catsData }) {
    return (
        <Layouts>
            <div className={utilStyles.body}>
                {catsData.title}
                
                <div dangerouslySetInnerHTML={{ __html: catsData.catContentHTML }}/>
            </div>
        </Layouts>
    );
}