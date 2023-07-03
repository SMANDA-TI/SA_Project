var WPAPI = require("wpapi");

const wp = new WPAPI({ endpoint: "https://osis-smandakng.org/wp-json" });
// const wp = new WPAPI({ endpoint: "https://sman2kuningan.sch.id/wp-json" });

async function fetchLatestPosts(count) {
    try {
        const response = await wp.posts().perPage(2).embed();
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
                title: item.title.rendered,
                imageThumbnail: item._embedded["wp:featuredmedia"][item._embedded["wp:featuredmedia"].length - 1].source_url,
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
fetchLatestPosts();
