import {createClient} from "@sanity/client";

export const sanityClient = createClient({
    projectId : process.env.NEXT_PUBLIC_SANITY_PROJECTID,
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion : process.env.NEXT_PUBLIC_SANITY_APIVERSION,
    useCdn : true,
    ignoreBrowserTokenWarning : true,
    token : process.env.NEXT_PUBLIC_SANITY_TOKEN
})