const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(postsDir);

files.forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the "categories: Programmingtags:" issue
    if (content.includes('categories: Programmingtags:')) {
      content = content.replace(
        'categories: Programmingtags:',
        'categories: Programming\ntags:'
      );
      fs.writeFileSync(filePath, content);
      console.log(`Fixed ${file}`);
    }
    // Add categories if missing entirely
    else if (!content.includes('categories:')) {
      // Add categories after title
      content = content.replace(
        /^(title:.*?)(\r?\n)/m,
        '$1$2categories: Programming$2'
      );
      fs.writeFileSync(filePath, content);
      console.log(`Added categories to ${file}`);
    }
  }
});

console.log('Done fixing files!'); 