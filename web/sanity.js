import sanityClient from "@sanity/client";

export default sanityClient({
    projectId: "",// add project id
    dataset: "unil",
    useCdn: true,
    apiVersion: "2021-03-25"
});