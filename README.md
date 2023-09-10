# obsidian-tree-view
Obsidian Dataviewjs view for rendering hierarchical trees

## Usage
Consider we have an `Items` folder with pages linked using `Parent` [metadata field](https://blacksmithgu.github.io/obsidian-dataview/annotation/add-metadata/).

### Render the whole tree
````
```dataviewjs

const groups = dv.pages('"Items"').groupBy(page => page.Parent?.path || '');
await dv.view('views/tree', { groups, rootKey: '' });
```
````

### Render current page’s descendants

```dataviewjs

const groups = dv.pages('"Items"').groupBy(page => page.Parent?.path || '');
await dv.view('views/tree', { groups, rootKey: dv.current().file.path });
```
