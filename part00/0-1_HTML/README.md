# Basic HTML Structure

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Website</title>
</head>
<body>

  <!-- The content goes here -->

</body>
</html>
```

## Images
```
<img src="images/cat.jpg" alt="A cute cat">
```
- `src`: path to the image
- `alt`: description (important for accessibility!)

## Headings
```
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
```
- Use one `<h1>` per page.
- Don't skip heading levels (e.g., no `<h4>` before `<h2>`).

## Paragraphs
```
<p>This is a paragraph of text.</p>
```
- Wrap blocks of text in `<p>` tags.

## Links
```
<a href="https://example.com">Visit Example</a>
```
- `href`: link URL
- Links can point to other pages, files, sections of the page, or external sites.

## Lists
### Unordered List (bulleted)
```
<ul>
  <li>Apples</li>
  <li>Oranges</li>
  <li>Bananas</li>
</ul>
```
### Ordered List (numbered)
```
<ol>
  <li>Step one</li>
  <li>Step two</li>
</ol>
```

---
### Reference: 
[MDN - HTML tutorial](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content)