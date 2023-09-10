/**
 * @file Obsidian Dataviewjs view for rendering hierarchical trees
 * @see {@link https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/#dvviewpath-input}
 * @param {Object} input - View params.
 * @param {Object[]} input.groups - Result of dv.pages(...).groupBy() method call.
 * @param {String} input.rootKey - The key to start from.
 */

const pagesByParent = new Map(input.groups.map(group => [group.key, group.rows]));

/**
 * @param {String} path - Full file path.
 * @param {Element} container - Parent html container.
 */
function writeList(path, container) {
    const pages = pagesByParent.get(path);

    if (!pages) {
        return 0;
    }

    // break circular reference
    pagesByParent.delete(path);

    const list = dv.el('ul', '', { container });
    let count = pages.length;

    pages.forEach(page => {
        const item = dv.el('li', '', { container: list });
        dv.el('span', page.file.link, { container: item });

        const childrenCount = writeList(page.file.path, list);
        if (childrenCount) {
            dv.span(' ' + (1 + childrenCount), { cls: 'tree-item-count', container: item });
            count += childrenCount;
        }
    });

    return count;
}

if (!writeList(input.rootKey)) {
    dv.paragraph('No data');
}
