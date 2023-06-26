import {createClient} from "@sanity/client";

export const sanityClient = createClient({
    projectId : "kbgpbmgs",
    dataset : "production",
    apiVersion : "v2021-10-21",
    useCdn : true,
    ignoreBrowserTokenWarning : true,
    token : `skKOaOOsFKtMFE93Q2XLVmzAsLjMQ58D4VsWRqAkcRhDR5rxNxyWkoNl0K2Y6CmIXt5FrWlRrxn58wacuATGy241afTPq3Ik03DQLKfunEv9wx3S1NPpzlZAIOHH3VtV6X3LIbx9NZJXuVkar0ZgmI1vbEDJ3wSyQXHrcDGpulplHMRkj6Re`
})