const fs = require("fs");
const juice = require("juice");

const html = fs.readFileSync(
    "./reset_password_email.html",
    "utf8"
);

const css = fs.readFileSync(
    "./output.css",
    "utf8"
);

const htmlWithCss = html.replace(
    "</head>",
    `<style>${css}</style></head>`
);

const inlinedHtml = juice.default
    ? juice.default(htmlWithCss)
    : juice(htmlWithCss);

fs.writeFileSync(
    "./reset_password_email_inline.html",
    inlinedHtml
);

console.log("Email CSS successfully inlined!");