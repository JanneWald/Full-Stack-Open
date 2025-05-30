## Tips
- If you want to concatonate string, do so with commas:
```js
console.log('props value is', props)
```
- Use VSCode snippets
	- https://code.visualstudio.com/docs/editing/userdefinedsnippets#_creating-your-own-snippets
## Rendering a collection
- Important to know array operators of Js
	- Find - returns first element that passes test
	- Filter - makes new array w/ only elements that pass the test
	- Map - makes a new array with a given foreach method
- Can use map for easy lists
```js
<ul>
  {notes.map(note => <li>{note.content}</li>)}
</ul>
```
or for "readability"
```js
<ul>
{notes.map(note => 
	<li>            
		{note.content}
	</li>
)}
</ul>
```
- Will cause warning because of missing `Key-attribute`
- Fix w/:
```js
<li key={note.id}>
	{note.content}
</li>
```
- React uses key to help with virtual DOM rendering
- You can get array index with second param of map:
	- `notes.map((note, i) => ...)`
	- NOT RECOMMENDED:
		- https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/
