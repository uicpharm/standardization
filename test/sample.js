const content = 'My name is Josh. Your name is Bob.';
const regex = /name is (\w+)/gi;
let match;

console.log(content);
while ((match = regex.exec(content))) {
   console.log(`Hello, ${match[1]}!`);
}
