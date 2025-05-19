const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'source', '_posts');
const files = fs.readdirSync(postsDir);

files.forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if categories already exist
    if (!content.includes('categories:')) {
      // Add categories after title
      content = content.replace(
        /---\s+title:(.*?)(\s+date:|tags:|---)/s,
        '---\ntitle:$1\ncategories: Programming$2'
      );
      
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
});

console.log('Done updating files!'); 