import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const catDirectory = path.join(process.cwd(), "products");

// mdファイルのデータを取り出す
export function getCatsData() {
    const fileNames = fs.readdirSync(catDirectory);
    const allCatData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, ""); //ファイル名（id）

        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(catDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        //idとデータを返す
        return {
            id,
            ...matterResult.data,
        };
    });
    return allCatData;
}

// getStaticPathでreturnで使うpathを取得する
export function getAllCatIds() {
    const fileNames = fs.readdirSync(catDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
    /* getAllCatIds関数でreturnされるもの
        [
            {
                params: {
                    id: "cat01sofa"
                }
            },
            {
                params: {
                    id: "cat02table"
                }
            }
        ]
    */
}

// id（ファイル名）に基づいてカテゴリデータを返す関数を作成
export async function getCatData(id) {
    const fullPath = path.join(catDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);

    const catContent = await remark().use(html).process(matterResult.content);

    const catContentHTML = catContent.toString();

    return {
        id,
        catContentHTML,
        ...matterResult.data,
    };
}