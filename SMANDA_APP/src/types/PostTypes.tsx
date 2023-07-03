export type Post = {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
        protected: boolean;
    };
    excerpt: {
        rendered: string;
        protected: boolean;
    };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: any[]; // Replace 'any' with a more specific type if available
    categories: number[];
    tags: any[]; // Replace 'any' with a more specific type if available
    _links: {
        self: any[]; // Replace 'any' with a more specific type if available
        collection: any[]; // Replace 'any' with a more specific type if available
        about: any[]; // Replace 'any' with a more specific type if available
        author: any[]; // Replace 'any' with a more specific type if available
        replies: any[]; // Replace 'any' with a more specific type if available
        "version-history": any[]; // Replace 'any' with a more specific type if available
        "predecessor-version": any[]; // Replace 'any' with a more specific type if available
        "wp:featuredmedia": any[]; // Replace 'any' with a more specific type if available
        "wp:attachment": any[]; // Replace 'any' with a more specific type if available
        "wp:term": any[]; // Replace 'any' with a more specific type if available
        curies: any[]; // Replace 'any' with a more specific type if available
    };
};

export type PagedPosts = {
    posts: Post[];
    _paging: {
        total: number;
        totalPages: number;
        links: {
            next: string;
        };
        //   next: WPRequest; // Replace 'WPRequest' with the appropriate type if available
    };
};

export interface MappedPostData {
    ukid: number;
    id: number;
    title: string;
    imageThumbnail: string;
    author: { name: string; id: number };
    date: string;
    slug: string;
    content: { rendered: string; protected: boolean };
    version: { count: number; href: string }[];
    type: string;
    status: string;
    redirect: string;
    local_date: string;
}
