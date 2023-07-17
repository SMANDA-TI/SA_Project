import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MappedPostData } from "../../types/PostTypes";
import { FetchResourceWP, FetchSchoolSA } from "../../backend/FetchPosts";
import { useAppSelector } from "../hooks";

type ItemState = {
    artikel: MappedPostData[];
    artikelLatest: MappedPostData[];
    eksul: MappedPostData[];
    s_slides: string[];
    youtube: string[];
    guru: MappedPostData[];
    postingan: MappedPostData[];
    organisasi: MappedPostData[];
    post_penting: MappedPostData[];
};

const initialState: ItemState = {
    artikel: [],
    artikelLatest: [],
    eksul: [],
    s_slides: [],
    youtube: [],
    guru: [],
    postingan: [],
    organisasi: [],
    post_penting: [],
};

export type Setters<T> = {
    [P in keyof T as `set${Capitalize<string & P>}`]: T[P];
};

export type ItemSetters = Setters<ItemState>;

export type ActionsMap = {
    [S in keyof ItemSetters]: {
        action: S;
        value: ItemSetters[S];
    };
};

export type ItemActions = ActionsMap[keyof ActionsMap] | { action: "other" };

export const saveWPGuru = createAsyncThunk("wp_data/populateGuru", async (tipe: "guru") => {
    const data = await FetchResourceWP(tipe);
    return {
        [tipe]: data as any,
    };
});

export const saveWPArtikel = createAsyncThunk(
    "wp_data/populateArtikel",
    async (tipe: "artikel") => {
        const data = await FetchResourceWP(tipe);
        return {
            [tipe]: data as any,
        };
    }
);

export const saveWPEksul = createAsyncThunk("wp_data/populateEksul", async (tipe: "eksul") => {
    const data = await FetchResourceWP(tipe);
    return {
        [tipe]: data as any,
    };
});

export const saveWPArtikelLatest = createAsyncThunk(
    "wp_data/populateArtikelLatest",
    async (tipe: "artikelLatest") => {
        const data = await FetchResourceWP(tipe);
        return {
            [tipe]: data as any,
        };
    }
);

export const saveWPPosts = createAsyncThunk("wp_data/populatePosts", async (tipe: "allPost") => {
    const data = await FetchResourceWP(tipe);
    return {
        [tipe]: data as any,
    };
});

export const saveWPS_slides = createAsyncThunk(
    "wp_data/populateS_slides",
    async (tipe: "s_slides") => {
        const data = await FetchSchoolSA("slides");
        return {
            [tipe]: data as any,
        };
    }
);
export const saveWPYoutube = createAsyncThunk(
    "wp_data/populateYoutube",
    async (tipe: "youtube") => {
        const data = await FetchSchoolSA("youtube");
        return {
            [tipe]: data as any,
        };
    }
);
export const saveWPOrganisasi = createAsyncThunk(
    "wp_data/populateOrganisasi",
    async (tipe: "organisasi") => {
        const data = await FetchResourceWP("organisasi");
        return {
            [tipe]: data as any,
        };
    }
);
export const saveWPPostPenting = createAsyncThunk(
    "wp_data/populatePostPenting",
    async (tipe: "post_penting") => {
        const data = await FetchResourceWP("post_penting");
        return {
            [tipe]: data as any,
        };
    }
);

const WPSlice = createSlice({
    initialState,
    name: "wp_data",
    reducers: {
        // setArtikel: (state, action) => {
        //     state.artikel = action.payload;
        // },
        // setSchoolSlides: (state, action) => {
        //     state.s_slides = action.payload;
        // },
        // setGuru: (state, action) => {
        //     state.guru = action.payload;
        // },
        // setPostingan: (state, action) => {
        //     state.postingan = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(saveWPArtikel.fulfilled, (state, action) => {
            state.artikel = action.payload.artikel;
        });
        builder.addCase(saveWPArtikelLatest.fulfilled, (state, action) => {
            state.artikelLatest = action.payload.artikelLatest;
        });
        builder.addCase(saveWPEksul.fulfilled, (state, action) => {
            state.eksul = action.payload.eksul;
        });
        builder.addCase(saveWPGuru.fulfilled, (state, action) => {
            state.guru = action.payload.guru;
        });
        builder.addCase(saveWPPosts.fulfilled, (state, action) => {
            state.postingan = action.payload.allPost;
        });
        builder.addCase(saveWPS_slides.fulfilled, (state, action) => {
            state.s_slides = action.payload.s_slides;
        });
        builder.addCase(saveWPYoutube.fulfilled, (state, action) => {
            state.youtube = action.payload.youtube;
        });
        builder.addCase(saveWPOrganisasi.fulfilled, (state, action) => {
            state.organisasi = action.payload.organisasi;
        });
        builder.addCase(saveWPPostPenting.fulfilled, (state, action) => {
            state.post_penting = action.payload.post_penting;
        });
    },
});

export default WPSlice.reducer;

export function getArticleLatest() {
    return useAppSelector((state) => state.WPData.artikelLatest);
}
export function getS_slides() {
    return useAppSelector((state) => state.WPData.s_slides);
}
export function getYoutube() {
    return useAppSelector((state) => state.WPData.youtube);
}
export function getArtikel() {
    return useAppSelector((state) => state.WPData.artikel);
}
export function getGuru() {
    return useAppSelector((state) => state.WPData.guru);
}
export function getEksul() {
    return useAppSelector((state) => state.WPData.eksul);
}
export function getPostingan() {
    return useAppSelector((state) => state.WPData.postingan);
}
export function getOrganisasi() {
    return useAppSelector((state) => state.WPData.organisasi);
}
export function getPostPenting() {
    return useAppSelector((state) => state.WPData.post_penting);
}
