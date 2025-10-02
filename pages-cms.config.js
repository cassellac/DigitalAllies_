module.exports = {
  collections: [
    {
      name: "Blog",
      folder: "CMS/blog",
      format: "md",
      fields: [
        { name: "title", type: "string" },
        { name: "date", type: "date" },
        { name: "author", type: "string" },
        { name: "body", type: "markdown" }
      ]
    },
    {
      name: "Blog Assets",
      folder: "CMS/assets",
      format: "file",
      fields: [
        { name: "file", type: "file" },
        { name: "description", type: "string" }
      ]
    },
    {
      name: "Pages",
      folder: "CMS/pages",
      format: "md",
      fields: [
        { name: "title", type: "string" },
        { name: "body", type: "markdown" }
      ]
    },
    {
      name: "Staff",
      folder: "CMS/staff",
      format: "json",
      fields: [
        { name: "name", type: "string" },
        { name: "role", type: "string" },
        { name: "bio", type: "markdown" },
        { name: "photo", type: "file" }
      ]
    }
  ],

  // CMS-style media configuration (per docs)
  media: [
    {
      name: "files",
      label: "Files",
      input: "files/documents",
      output: "/files/documents",
      categories: ["document"]
    },
    {
      name: "images",
      label: "Images",
      input: "images",
      output: "/images",
      extensions: ["png", "webp"]
    }
  ]
}
