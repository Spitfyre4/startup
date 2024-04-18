# Notes
## Github
 - when you try to pull and there is a merge conflict, look in vs code to see the differences
 - when using git commit, make sure to have an -m
    * git commit -m "info about change"
## AWS
- IP address: http://54.162.108.114/
- ssh into website: ssh -i [key pair file] ubuntu@[ip address]
## HTML
- Tips
  * style="font-size: 1.5em;"
     * Use in "< p >" to change font size of text
  * img src="IMAGE_URL" alt="Description of the image" width="300"
     * Uploads image and changes width, put in <>
### HTML Structure
The two major purposes of HTML is to provide structure and content to your web application. Some of the common HTML structural elements include `body`, `header`, `footer`, `main`, `section`, `aside`, `p`, `table`, `ol/ul`, `div`, and `span`. An example is below. It starts with the top level content `body`. The body has three children, a `header`, `main`, and `footer`. Each of the body children then contains other structural content.

The `header` contains a `p`aragraph with a `span`, and a `nav`igation containing multiple `div`isions of sub-content.

The `main` contains multiple `section`s that contain either an unordered list (`ul`) or a `table`. Main also contains an `aside` for content that does not fit the content flow of the sections.

The `footer` has a content division with a single span.

```html
<body>
  <p>Body</p>
  <header>
    <p>Header - <span>Span</span></p>
    <nav>
      Navigation
      <div>Div</div>
      <div>Div</div>
    </nav>
  </header>

  <main>
    <section>
      <p>Section</p>
      <ul>
        <li>List</li>
        <li>List</li>
        <li>List</li>
      </ul>
    </section>
    <section>
      <p>Section</p>
      <table>
        <tr>
          <th>Table</th>
          <th>Table</th>
          <th>Table</th>
        </tr>
        <tr>
          <td>table</td>
          <td>table</td>
          <td>table</td>
        </tr>
      </table>
    </section>
    <aside>
      <p>Aside</p>
    </aside>
  </main>

  <footer>
    <div>Footer - <span>Span</span></div>
  </footer>
</body>
```


### HTML Media
- The HTML elements that represent media include img, audio, video, svg, and canvas. The img, audio, and video elements are all simple references to an external file, but svg and canvas both contain the code to render a visual image that can even be animated.
- Examples(all start with an "<")
  * img alt="mountain landscape" src="https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg" />
  * audio controls src="testAudio.mp3"></audio>
  * video controls width="300" crossorigin="anonymous">
   < source src= https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
   </video>
  * svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="red" fill="red" style="border: 1px solid #000000">
  circle cx="150" cy="100" r="50" />
    </svg>
    - Scalable Vector Graphics(SVG) is an extremely powerful and widely supported way to render graphics inline in your HTML. This is an example of an SVG graphic that draws a black border and a red circle
## CSS
### CSS
- Useful things
   * font-family: Arial;
   * color: white;
   * background-color: gray;
   * border-radius: 15px;
   * padding: 10px;
   * margin-bottom: 20px;
   * border-bottom: solid white thin;
   * text-align: end;
   * border: solid black;
### Flex
#### Flex
- justify-content is very useful
Example:
```
  * {
  font-family: sans-serif;
  box-sizing: border-box;
}
html {
  height: 100%;
}
body {
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}
header {
  flex: 0 50px;
  font-size: 20px;
  background: hsl(223, 57%, 38%);
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
main {
  flex: 1;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
div {
  padding: 0 0.5em;
}
footer {
  flex: 0 50px;
  background: hsl(180, 30%, 15%);
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
```
## Java
### JavaScript in HTML
Example

index.js
```
function sayHello() {
  console.log('hello');
}
```
index.html

```html
<head>
  <script src="javascript.js"></script>
</head>
<body>
  <button onclick="sayHello()">Say Hello</button>
  <button onclick="sayGoodbye()">Say Goodbye</button>
  <script>
    function sayGoodbye() {
      alert('Goodbye');
    }
  </script>
</body>
```

### Anonymous functions
Example:
```
  // Function that takes a function as a parameter
function doMath(operation, a, b) {
  return operation(a, b);
}
// Anonymous function assigned to a variable
const add = function (a, b) {
  return a + b;
};
console.log(doMath(add, 5, 3));
// OUTPUT: 8
// Anonymous function assigned to a parameter
console.log(
  doMath(
    function (a, b) {
      return a - b;
    },
    5,
    3
  )
);
// OUTPUT: 2
```
### Regular Expressions
The string class has several functions that accept regular expressions. This includes match, replace, search, and split. For a quick test to see if there is a match you can use the regular expression object's test function.
### Arrow Functions
Example
```
const a = [1, 2, 3, 4];
// standard function syntax
a.sort(function (v1, v2) {
  return v1 - v2;
});
// arrow function syntax
a.sort((v1, v2) => v1 - v2);
```
#### Return Example
```
() => 3;
// RETURNS: 3
() => {
  3;
};
// RETURNS: undefined
() => {
  return 3;
};
// RETURNS: 3
```

Example:
```
const petRegex = /(dog)|(cat)|(bird)/gim;
const text = 'Both cats and dogs are pets, but not rocks.';
text.match(petRegex);
// RETURNS: ['cat', 'dog']
text.replace(petRegex, 'animal');
// RETURNS: Both animals and animals are pets, but not rocks.
petRegex.test(text);
// RETURNS: true
```

## Kahoot tips
- valid way to include JavaScript in HTML
  ```
   <script>1+1</script>
   <script src='main.js' />
   < div onclick='1+1' />
   /*(NOT VALID)*/ < javascript>1+1</ javascript>
  ```
- Can use this CSS to load fonts
  * @ import url('https://fonts/googleapis.com/css?family=quicksnad');
- Java functions
  * Arrow functions
    - const f = y => y++;
    - console.log(f(3))
      * is 4? codepen says 3 though
  * Other valid Functions
    - function f(x) {}
    - const f = function(x) {}
    - const f = (x) => {}
    - (NOT VALID) function f(x) = {}



- Order of the CSS Box Model, outside going in
  * Margin, border, padding, content
- Padding
  * p {
     padding: 1em;
   }
  * Puts space around the content of selected elements
- HTML tags
  * < ul> -> unordered list
  * < ol> -> ordered list
  * < li> -> List item; must be in an ordered list, unordered list, or a menu
  * < dt> -> data type or description term; used in a description list< dl> to define a single term
- Command that makes a script executable
  * STUDY CONSOLE COMMANDS
  * chmod +x deploy.sh
- DNS
  * 
  * DNS Record Types
    - CNAME
      * To point to another DNS Record, use the CNAME DNS record type
      * An alias
      * I have this hostname and i want it to alias to this hostname over here
      * Not redirects, just aliases
    - A
      * Have some host name that you are mapping to an IP address
      * Like having example . com mapped to 192.0.2.1
    - SOA
      * Start of Authority
      * Telling you how you link about your DNS records with someone else
    - TXT
      * Just storing some txt thing on a host name so someone can
      * Makes example . com have/return some text
  * DNS Subdomain
    - EX: c260.cs.byu.edu
    - 
- ASYNC functions
  * Await
    - Wait to put the await result there
    - Maybe put the examples
- Promises
- JavaScript
  * Regular expressions
    - Denoted by / (Content) /
    - used often with match
    - EX: v.match(/A|f/i)
      * i makes it case-insensitive, so just looking for anything with an a or an f
  * Object
    - Valid JavaScript Object
      * { n:1}
      * Equals is not proper notation for declaring an object, it's a colon
- < div>
  * division element
- DOM
  * TextContent
    - Sets the child text of the element
    - 
- HTML to create a valid hyperlink
  * < a href = 'ht***://c.com'>x</a>
- JSON
  * j
  * EX: {"x":3}
    - Only supports double quotes
    - Can't be undefined
    - You are declaring the data, so you have to declare what it is
- Turning Header blue with CSS
  ```html
  <div>other< /div>
  <div class ="header">BYU< /div>
  ```
  How do you turn just header text BYU blue?
  ```
  div.header {color:blue;}
  ```
  
