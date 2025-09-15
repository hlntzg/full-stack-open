## New note diagram

The following exercise represents the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the _Save_ button. The diagram was created with [Mermaid](https://en.wikipedia.org/wiki/Mermaid_(software)#:~:text=Mermaid%20is%20an%20open%2Dsource,with%20proprietary%20software%20file%20formats.) syntaxis - an open-source JavaScript-based diagramming that generates diagrams from text-based descriptions.

1. User action (writing note + clicking save).
2. POST request with form data.
3. Server response with redirect (`302` → `/exampleapp/notes`).
4. Browser reload of /notes, fetching HTML, CSS, JS again.
5. JavaScript execution → fetches updated JSON.
6. Notes rendered again, now including the new note.

---


```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    
    Note right of browser: User writes a note in the text field and clicks "Save"
    Note right of browser: User input is sent to the server with form data (e.g. content="My note")

    
    activate server
    server-->>browser: HTTP 302 Redirect to /exampleapp/notes
    deactivate server

    Note left of server: Server responds with HTTP status code 302

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    Note right of browser: Browser reloads the /exampleapp/notes page after redirect

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    Note right of browser: Browser executes JavaScript that fetches updated notes JSON

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Updated notes JSON including the new note
    deactivate server

    Note right of browser: Browser executes callback function
    Note right of browser: Browser re-renders the note list with the new note
