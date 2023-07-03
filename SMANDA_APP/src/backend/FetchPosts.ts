import WPAPI from "wpapi";
import { MappedPostData } from "../types/PostTypes";

function FetchResourceWP(type: "artikel" | "eksul" | "guru"): Promise<MappedPostData[]> {
    return new Promise(async (resolve, reject) => {
        const smandaWeb = "https://sman2kuningan.sch.id/wp-json";
        const osisWeb = "https://osis-smandakng.org/wp-json";
        const ngambil = type == "artikel" ? smandaWeb : type == "eksul" ? osisWeb : osisWeb;
        const wp = new WPAPI({ endpoint: ngambil });

        try {
            let response: any[];
            if (ngambil == smandaWeb && type == "artikel") {
                response = await wp.posts().perPage(10).embed();
            } else if (ngambil == osisWeb && type == "guru") {
                response = await wp.posts().categories(23).embed();
            } else {
                response = await wp.posts().categories(17).embed();
            }

            if (response) {
                const mappedGood = response.map((item, index) => {
                    // ? Author Variable
                    const authors = item._embedded.author;
                    const lastAuthor = authors[authors.length - 1];
                    const { name, id, link } = lastAuthor;
                    const LinkAdmin = link.replace(/.*?:\/\//g, "");
                    const AuthorName =
                        LinkAdmin === "sman2kuningan.sch.id/author/admin/"
                            ? "Admin SMAN 2 Kuningan"
                            : LinkAdmin === "osis-smandakng.org/author/admin/"
                            ? "Admin OSIS SMAN 2 Kuningan"
                            : name;
                    return {
                        ukid: Number(index),
                        id: item.id,
                        title: item.title.rendered,
                        imageThumbnail: item._embedded["wp:featuredmedia"][item._embedded["wp:featuredmedia"].length - 1].source_url,
                        author: {
                            name: AuthorName,
                            id: lastAuthor.id,
                        },
                        date: item.modified_gmt,
                        local_date: new Date(item.modified_gmt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZoneName: "short",
                        }),
                        slug: item.slug,
                        content: item.content,
                        version: item._links["version-history"],
                        type: item.type,
                        status: item.status,
                        redirect: item.link || item.guid.rendered,
                    };
                });
                resolve(mappedGood);
            } else {
                resolve([]);
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

export default FetchResourceWP;
