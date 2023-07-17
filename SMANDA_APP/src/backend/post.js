var WPAPI = require("wpapi");

const wp = new WPAPI({ endpoint: "https://osis-smandakng.org/wp-json" });
// const wp = new WPAPI({ endpoint: "https://sman2kuningan.sch.id/wp-json" });

async function fetchLatestPosts(count) {
    try {
        // const response = await wp.posts().perPage(2).embed();
        // const response = await wp.posts().categories(23).perPage(1).embed();
        const response = await wp.posts().categories(181).embed();
        console.log(response[0]);
        console.log(response[0]._embedded);

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
                categories: item.categories,
                title: item.title.rendered,
                imageThumbnail: item._embedded["wp:featuredmedia"]
                    ? item._embedded["wp:featuredmedia"][
                          item._embedded["wp:featuredmedia"].length - 1
                      ].source_url
                    : null,
                author: {
                    name: AuthorName,
                    id: lastAuthor.id,
                },
                date: item.modified_gmt,
                slug: item.slug,
                content: item.content,
                version: item._links["version-history"],
                type: item.type,
                status: item.status,
                redirect: item.link || item.guid.rendered,
            };
        });

        console.log("Index One: ", mappedGood[0]);
        console.log("GOOD: ", mappedGood);
    } catch (error) {
        console.log("ERROR: ");
        console.log(error);
        return [];
    }
}
async function FetchSchoolSA(type) {
    const osisWeb = "https://osis-smandakng.org/wp-json";
    const wp = new WPAPI({ endpoint: osisWeb });

    try {
        const response = (
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
                (match) =>
                    match.match(
                        type === "slides" ? /src="([^"]*)"/ : /youtubeSA:\/\/([^<\s]+)/
                    )?.[1]
            );
        // .filter((match: string | undefined) => match !== undefined); // Filter out any undefined matches
        console.log(response);
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

var _ = require("lodash");
async function getAll(request) {
    return request.then(function (response) {
        if (!response._paging || !response._paging.next) {
            return response;
        }
        // Request the next page and return both responses as one collection
        return Promise.all([response, getAll(response._paging.next)]).then(function (responses) {
            return _.flatten(responses);
        });
    });
}

fetchLatestPosts();
// "slides" | "youtube";
// FetchSchoolSA("youtube");
