const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(postsDir);

files.forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Check if front matter has valid tags format
    if (content.includes('tags:')) {
      // If tags: exists but is not in array format, convert it
      if (!content.match(/tags:\s*\n\s*-/)) {
        // Fix tags format where tags: exists but doesn't have proper list format
        const tagMatch = content.match(/tags:\s*(.*?)(\n|$)/);
        if (tagMatch && tagMatch[1].trim() && !tagMatch[1].trim().startsWith('-')) {
          // Has inline tags that need to be converted to list format
          const tags = tagMatch[1].trim().split(/\s*,\s*/);
          const tagsList = tags.map(tag => `  - ${tag}`).join('\n');
          content = content.replace(/tags:\s*(.*?)(\n|$)/, `tags:\n${tagsList}\n`);
          modified = true;
        } else if (!tagMatch || !tagMatch[1].trim()) {
          // Empty tags, add a placeholder tag
          content = content.replace(/tags:\s*(\n|$)/, 'tags:\n  - blog\n');
          modified = true;
        }
      }
    } else {
      // If no tags section exists, add it
      if (content.includes('categories:')) {
        content = content.replace(
          /(categories:.*?\n)/,
          '$1tags:\n  - blog\n'
        );
      } else {
        content = content.replace(
          /(title:.*?\n)/,
          '$1tags:\n  - blog\n'
        );
      }
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed tags in ${file}`);
    }
  }
});

console.log('Done fixing tags in files!'); 