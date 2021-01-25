import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "faoq2vbv",
  dataset: "production",
  useCdn: false,
});
