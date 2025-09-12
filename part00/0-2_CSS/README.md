# Basic CSS

**CSS (Cascading Style Sheets) = code that styles web content**
CSS is used to style HTML elements; it is a style sheet language.

## Key Concepts & Syntax

### CSS & Ruleset
- A ruleset consists of a selector + declarations (properties + values) that apply styles.

### Selectors
- Ways to pick which elements to style. 
- tag selectors (e.g. `p`, `h1`)
- class selectors (`.my-class`)
- id selectors (`#my-id`), etc

### Adding the stylesheet
Create a CSS file (e.g. `style.css`), link in HTML head via `<link href="styles/style.css" rel="stylesheet">`

### Inheritance & Global Styles
Some styles inherited, e.g. font‑family set high (on `<html>` or `<body>`) will apply to child elements.

## Styling Details

### Fonts & text
- Google Fonts (or other) with link tags in `<head>`
- Set base font size & family on `<html>` so that everything inherits. Example:
```
html {
  font-size: 10px;
  font-family: "Roboto", sans-serif;
}
```
- Style headings, paragraphs, list items: adjust `font-size`, `line-height`, `letter-spacing`, `text-align`

### Box model, layout & color
- Background color on `<html>` (page) & `<body>` (content area).
- Set `width` on body, center it with `margin: 0 auto`. Add `padding`, `border`. Example:
```
body {
  width: 600px;
  margin: 0 auto;
  background-color: #ff9500;
  padding: 0 20px 20px 20px;
  border: 5px solid black;
}
```

### Heading tweaks
- Reset default margin (e.g. `margin:0`) on `<h1>` to remove unexpected gap. 
- Add `padding`, `color`, `text-shadow`, etc. Example:
```
h1 {
  margin: 0;
  padding: 20px 0;
  color: #00539f;
  text-shadow: 3px 3px 1px black;
}
```

### Image centering & responsiveness
- Images are inline by default; margin auto centering works only when the element is block level. So you use `display: block; margin: 0 auto;`.
- Limit image width with `max-width: 100%`; so large images scale down

### CSS is all about boxes!


## Quick‑Reference style
```
/* Global settings */
html {
  font-size: 10px;
  font-family: "Your Chosen Font", sans-serif;
  background-color: /* your page background */;
}

body {
  width: 600px;
  margin: 0 auto;
  background-color: /* content background */;
  padding: 20px;
  border: 5px solid /* color */;
}

/* Headings */
h1 {
  margin: 0;
  padding: 20px 0;
  color: /* heading color */;
  text-align: center;
  text-shadow: 2px 2px 2px /* shadow color */;
}

/* Paragraphs and lists */
p, li {
  font-size: 1.6rem;    /* or some px value */
  line-height: 2;
  letter-spacing: 1px;
}

/* Images */
img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}
```

---
### Reference: 
[MDN - CSS tutorial](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content)