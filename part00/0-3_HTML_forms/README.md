# Web form

A web form's HTML is made up of one or more **form controls** (sometimes called widgets), plus some additional elements to help structure the overall form — they are often referred to as HTML forms. The controls can be _single_ or _multi-line text fields_, _dropdown boxes_, _buttons_, _checkboxes_, or _radio buttons_, and are mostly created using the `<input>` element.

## Implementing the form in HTML
- Use `<form>` with `action` and `method` attributes to define where to send the data and how (GET or POST). 
MDN Web Docs
- Use `<label>` elements associated (via `for` + `id`) with form controls, so that clicking label focuses/activates the control, and for accessibility. 
- Use `<input>` (various `type`s: text, email…), and `<textarea>` for multi-line input. 
- Add a `<button>` of `type="submit"` to trigger form submission. Reset and generic “button” types are also possible but have different behavior.

### Basic form structure
```
<form action="https://example.com/form-handler" method="post">
  <!-- Form controls go here -->
</form>
```
- `action`: URL to send form data to
- `method`: HTTP method: `get` or `post`

### Labels & Inputs
```
<label for="name">Name:</label>
<input type="text" id="name" name="user_name" required>
```
- Use `<label for="...">` and `id="..."` on inputs to link them.
- Include the `name` attribute — it's the **key** sent with the form data.

### Inputs types
| Input Type | Use Case               |
| ---------- | ---------------------- |
| `text`     | Single-line text       |
| `email`    | Validates email format |
| `password` | Obscured input         |
| `checkbox` | True/false             |
| `radio`    | Select one of many     |
| `submit`   | Button to submit form  |

### Good practice
- Use `required` for fields that must be filled
- Keep labels short & clear
- Use `placeholder` for hints
- Sanitize/validate data on the server (client-side validation isn’t enough)

## Example
```
<form action="/send" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="user_name" required>

  <label for="email">Email:</label>
  <input type="email" id="email" name="user_email" required>

  <label for="message">Message:</label>
  <textarea id="message" name="user_message" rows="5"></textarea>

  <button type="submit">Send</button>
</form>
```

---
### Reference: 
[MDN - Your first form](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/)