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
## CSS
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
- justify-content is very useful

## Kahoot tips
- valid way to include JavaScript in HTML
  * <script>1+1</script>
  * <script src='main.js' />
  * < div onclick='1+1' />
  * (NOT VALID) < javascript>1+1</ javascript>
- Can use this CSS to load fonts
  * @ import url('https://fonts/googleapis.com/css?family=quicksnad');
- Arrow functions
  * const f = y => y++;
    console.log(f(3))
  * is 4? codepen says 3 though
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
    - A
      * Have some host name that you are mapping to an IP address
      * Like having example . c o m mapped to 192.0.2.1
    - SOA
    - TXT
  * DNS Subdomain
    - EX: c260.cs.byu.edu
    - 
- ASYNC functions
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
- 






  
