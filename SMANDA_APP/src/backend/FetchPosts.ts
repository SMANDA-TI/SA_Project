import WPAPI, { WPRequest } from "wpapi";
import { MappedPostData } from "../types/PostTypes";
import flatten from "lodash/flatten";
import concat from "lodash/concat";
import remove from "lodash/remove";
import { decode } from "he";

export function FetchResourceWP(
    type:
        | "artikel"
        | "eksul"
        | "guru"
        | "allPost"
        | "artikelLatest"
        | "organisasi"
        | "post_penting"
        | "Informasi"
): Promise<MappedPostData[]> {
    return new Promise(async (resolve, reject) => {
        const smandaWeb = "https://sman2kuningan.sch.id/wp-json";
        const osisWeb = "https://osis-smandakng.org/wp-json";
        const ngambil =
            type == "artikel" ? smandaWeb : type == "artikelLatest" ? smandaWeb : osisWeb;
        const wp = new WPAPI({ endpoint: ngambil });

        try {
            let response: any[];
            if (ngambil == smandaWeb && type == "artikel") {
                response = await getAll(wp.posts().perPage(100).embed());
                console.log("Artikel Is GOOD :" + ` response.length = ${response.length}`);
            } else if (ngambil == smandaWeb && type == "artikelLatest") {
                response = await wp.posts().perPage(10).embed();
                console.log("artikelLatest Is GOOD :" + ` response.length = ${response.length}`);
            } else if (ngambil == osisWeb && type == "guru") {
                response = await getAll(wp.posts().categories([23, 26]).perPage(100).embed());
                console.log("Pendidik Is GOOD :" + ` response.length = ${response.length}`);
            } else if (ngambil == osisWeb && type == "eksul") {
                response = await wp.posts().categories(17).embed();
                console.log("Eksul Is GOOD :" + ` response.length = ${response.length}`);
            } else if (ngambil == osisWeb && type == "organisasi") {
                response = await wp.posts().categories(181).embed();
                console.log("Organisasi Is GOOD :" + ` response.length = ${response.length}`);
            } else if (ngambil == osisWeb && type == "post_penting") {
                response = await wp.posts().categories([22, 184, 182]).embed();
                console.log("Post Penting Is GOOD :" + ` response.length = ${response.length}`);
            } else if (type == "allPost") {
                const sekolahPost = await getAll(
                    new WPAPI({ endpoint: smandaWeb }).posts().perPage(100).embed()
                );
                const osisPost = await getAll(
                    new WPAPI({ endpoint: osisWeb })
                        .posts()
                        .excludeCategories([23, 26, 17, 179])
                        .perPage(100)
                        .embed()
                );
                response = flatten(concat(sekolahPost, osisPost));
                console.log("allPost Is GOOD :" + ` response.length = ${response.length}`);
            }

            if (response) {
                const mappedGood: MappedPostData[] = remove(response, function (item) {
                    return item.content.protected != true;
                }).map((item, index) => {
                    // ? Author Variable
                    if (item.content.protected) return;
                    const authors = item?._embedded?.author;
                    const lastAuthor = authors[authors?.length - 1];
                    const { name, id, link } = lastAuthor;
                    const LinkUser: string = link.replace(/.*?:\/\//g, "");
                    const { combinedAudioTags, sanitizedText } = extractAudioTagsAndSanitize(
                        item.content.rendered
                    );
                    const AuthorName =
                        LinkUser === "sman2kuningan.sch.id/author/admin/"
                            ? "Admin SMAN 2 Kuningan"
                            : LinkUser === "osis-smandakng.org/author/admin/"
                            ? "Admin OSIS SMAN 2 Kuningan"
                            : name;
                    return {
                        urutan: Number(index + 1),
                        id: item.id,
                        categories: item.categories,
                        title: decode(item.title.rendered),
                        imageThumbnail:
                            item._embedded["wp:featuredmedia"] &&
                            item._embedded["wp:featuredmedia"].length != 0
                                ? item._embedded["wp:featuredmedia"][
                                      item._embedded["wp:featuredmedia"].length - 1
                                  ].source_url
                                : null,
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
                        formatted_date: new Date(item.modified_gmt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }),
                        slug: item.slug,
                        content: item.content,
                        version: item._links["version-history"],
                        type: item.type,
                        status: item.status,
                        from: LinkUser.startsWith("osis-smandakng.org") ? "OSIS" : "SMANDA",
                        redirect: item.link || item.guid.rendered,
                        audio: {
                            exist: combinedAudioTags ? true : false,
                            audioTags: combinedAudioTags,
                            sanitizeHtml: sanitizedText,
                        },
                    };
                });
                resolve(mappedGood);
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}
export async function FetchSchoolSA(type: "slides" | "youtube"): Promise<string[]> {
    const osisWeb = "https://osis-smandakng.org/wp-json";
    const wp = new WPAPI({ endpoint: osisWeb });

    try {
        const response: string[] = (
            await wp
                .posts()
                .id(type === "slides" ? 4583 : 4619)
                .password("smanda_cerds_FJR")
                .embed()
        ).content.rendered
            .match(
                type === "slides"
                    ? /<img[^>]*src="([^"]*)"[^>]*>/g
                    : /<[^>]*>youtubeSA:\/\/([^<\s]+)[^<]*<\/[^>]*>/g
            )
            ?.map(
                (match: string) =>
                    match.match(
                        type === "slides" ? /src="([^"]*)"/ : /youtubeSA:\/\/([^<\s]+)/
                    )?.[1]
            );
        // .filter((match: string | undefined) => match !== undefined); // Filter out any undefined matches

        console.log(
            `${type === "slides" ? "Slides Is GOOD: " : "Youtube Is GOOD: "}response.length = ${
                response?.length
            }`
        );
        return response || [];
    } catch (error) {
        console.error("🚀 ~ file: FetchPosts.ts:85 ~ fetchSchoolSlides ~ error:", error);
        throw error;
    }
}

async function getAll(request: WPRequest) {
    return request.then(function (response) {
        if (!response._paging || !response._paging.next) {
            return response;
        }
        // Request the next page and return both responses as one collection
        return Promise.all([response, getAll(response._paging.next)]).then(function (responses) {
            return flatten(responses);
        });
    });
}

const extractAudioTagsAndSanitize = (
    htmlString: string
): { combinedAudioTags: string; sanitizedText: string } => {
    const audioTagRegex = /<audio.*?<\/audio>/gi;
    const audioTags = htmlString.match(audioTagRegex) || [];
    const combinedAudioTags = audioTags.join(""); // Combine the audio tags into a single string
    const sanitizedText = htmlString.replace(audioTagRegex, ""); // Removes all occurrences of the audio tag

    return {
        combinedAudioTags,
        sanitizedText,
    };
};

// export default FetchResourceWP;
