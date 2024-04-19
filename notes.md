# Notes
# *Final*
## Express
HTTP endpoints are implemented in Express by defining routes that call a function based upon an HTTP path. The Express app object supports all of the HTTP verbs as functions on the object.
if you want to have a route function that handles an HTTP GET request for the URL path /store/provo you would call the get method on the app.
```javascript
app.get('/store/provo', (req, res, next) => {
  res.send({name: 'provo'});
});
```
### Express Middleware
A middleware function looks very similar to a routing function. That is because routing functions are also middleware functions. The only difference is that routing functions are only called if the associated pattern matches. Middleware functions are always called for every HTTP request unless a preceding middleware function does not call next

As an example of writing your own middleware, you can create a function that logs out the URL of the request and then passes on processing to the next middleware function.
```javascript
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
```
Built in Middleware may look like
```javascript
app.use(express.static('public'));
```
### Random Notes
- Injecting this handler that matches a pattern, then it will run that code when finding pattern
- Goes in order from top down
- Next() calls it to call the following middleware
- App.use is always called
- Express doesn’t know when you finish if you don’t say it
  * Need to use res.send
  * 
## Fetch
The basic usage of fetch takes a URL and returns a promise. The promise then function takes a callback function that is asynchronously called when the requested URL content is obtained. If the returned content is of type application/json you can use the json function on the response object to convert it to a JavaScript object.

The following example makes a fetch request to get and display an inspirational quote. If the request method is unspecified, it defaults to GET.
```javascript
fetch('https://api.quotable.io/random')
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```
Response
```javascript
{
  content: 'Never put off till tomorrow what you can do today.',
  author: 'Thomas Jefferson',
};
```
To do a POST request you populate the options parameter with the HTTP method and headers.
```javascript
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'test title',
    body: 'test body',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```
### Random Notes
- Can use in front end and back end code
- Fetch is actually an api, so you can make a network request
- Backend is in case you need to send a network request to somewhere else and then filter the request when it comes in
  * Like a weather report or something
 
## React
React abstracts HTML into a JavaScript variant called JSX. JSX is converted into valid HTML and JavaScript using a preprocessor called Babel.
### React Router
A web framework router provides essential functionality for single-page applications. With a multiple-webpage application the headers, footers, navigation, and common components must be either duplicated in each HTML page, or injected before the server sends the page to the browser. With a single page application, the browser only loads one HTML page and then JavaScript is used to manipulate the DOM and give it the appearance of multiple pages. The router defines the routes a user can take through the application, and automatically manipulates the DOM to display the appropriate framework components.

A basic implementation of the router consists of a BrowserRouter component that encapsulates the entire application and controls the routing action. The Link, or NavLink, component captures user navigation events and modifies what is rendered by the Routes component by matching up the to and path attributes.
```javascript
// Inject the router into the application root DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // BrowserRouter component that controls what is rendered
  // NavLink component captures user navigation requests
  // Routes component defines what component is routed to
  <BrowserRouter>
    <div className='app'>
      <nav>
        <NavLink to='/'>Home</Link>
        <NavLink to='/about'>About</Link>
        <NavLink to='/users'>Users</Link>
      </nav>

      <main>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/about' element={<About />} />
          <Route path='/users' element={<Users />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
```
### React Hooks
React hooks allow React function style components to be able to do everything that a class style component can do and more. Additionally, as new features are added to React they are including them as hooks. This makes function style components the preferred way of doing things in React. 

The useState hook is used to declare and update state in a function component.
```javascript
function Clicker({initialCount}) {
  const [count, updateCount] = React.useState(initialCount);
  return <div onClick={() => updateCount(count + 1)}>Click count: {count}</div>;
}
ReactDOM.render(<Clicker initialCount={3} />, document.getElementById('root'));
```

The useEffect hook allows you to represent lifecycle events. For example, if you want to run a function every time the component completes rendering, you could do the following.
```javascript
function UseEffectHookDemo() {
  React.useEffect(() => {
    console.log('rendered');
  });

  return <div>useEffectExample</div>;
}

ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
```
#### Hook dependencies
You can control what triggers a useEffect hook by specifying its dependencies. In the following example we have two state variables, but we only want the useEffect hook to be called when the component is initially called and when the first variable is clicked. To accomplish this you pass an array of dependencies as a second parameter to the useEffect call.
```javascript
function UseEffectHookDemo() {
  const [count1, updateCount1] = React.useState(0);
  const [count2, updateCount2] = React.useState(0);

  React.useEffect(() => {
    console.log(`count1 effect triggered ${count1}`);
  }, [count1]);

  return (
    <ol>
      <li onClick={() => updateCount1(count1 + 1)}>Item 1 - {count1}</li>
      <li onClick={() => updateCount2(count2 + 1)}>Item 2 - {count2}</li>
    </ol>
  );
}

ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
```
If you specify an empty array [] as the hook dependency then it is only called when the component is first rendered.

Note that hooks can only be used in function style components and must be called at the top scope of the function. That means a hook cannot be called inside of a loop or conditional. This restriction ensures that hooks are always called in the same order when a component is rendered.

## HTTP Headers
### Cookie
Data represented with a cookie
### Content-type
- Sending a certain content type in a request
- Audio file, video file, html page, etc
### Host
- Who am I talking to, the domain
- The domain that is hosting the request
  * The one that made the request from
  * 
## JSX
- Componentize your html
- Decomposing your application into different components
- To render html from javascript
- To allow for composability of your html
  * Composing different components
### Not a purpose of JSX
To combine CSS, HTML, and javascript

## Linux Daemon	
- Something that runs on you computer without a user
- PM2 is an example
- Running your services
- Log out of computer in VA and it is still running
- Makes certain things run in the background all the time
- Primary use is to fork other processes
- 
## Websocket
JavaScript running on a browser can initiate a WebSocket connection with the browser's WebSocket API. First you create a WebSocket object by specifying the port you want to communicate on.

You can then send messages with the send function, and register a callback using the onmessage function to receive messages.
```javascript
const socket = new WebSocket('ws://localhost:9900');

socket.onmessage = (event) => {
  console.log('received: ', event.data);
};

socket.send('I am listening');
```
The server uses the ws package to create a WebSocketServer that is listening on the same port the browser is using. By specifying a port when you create the WebSocketServer, you are telling the server to listen for HTTP connections on that port and to automatically upgrade them to a WebSocket connection if the request has a connection: Upgrade header.

When a connection is detected it calls the server's on connection callback. The server can then send messages with the send function, and register a callback using the on message function to receive messages.
```javascript
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 9900 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const msg = String.fromCharCode(...data);
    console.log('received: %s', msg);

    ws.send(`I heard you say "${msg}"`);
  });

  ws.send('Hello webSocket');
});
```
### What value does WebSocket add to HTTP
Uses peer to peer instead of client to server

## Cookies
Allow the server to store data on the client
## React

## MongoDB
### Query

## Kahoot tips
### What does npm install do?
- Locks the version of the package for your application
  * If produce makes future version, won’t update it automatically
- Adds the source code to your node_modules directory
- Adds a dependency to your package.json?
### HTTP Status Codes
- 200
  * Success
- 300
  * Redirects or caching
- 400
  * Client error, front end made a bad request
- 500
  * Server error
### Ports
- Port 80
 * Reserved for HTTP
 * Unsecure version of transfer protocol
- Port 443
  * Reserved for HTTPS
- Port 22
  * Reserved for SSH
# *Midterm*
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
  
