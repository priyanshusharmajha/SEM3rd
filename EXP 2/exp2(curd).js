const fs=require('fs');
//create
fs.writeFile('message.txt','Hello world', (err) => {
    if(err) throw err;
    console.log('File created ');
//read
    fs.readFile('message.txt', 'utf8', (err, data) => {
        console.log('file content:', data);
    }); 

});

//updated

fs.writeFile('message.txt','this is the updated content', (err) => {
    if(err) throw err;
    console.log('File overwritten(updated)!');
});
fs.appendFile('message.txt','\nthis line is added', (err) => {
    if(err) throw err;
    console.log('File updated(append)!');
});
fs.unlink('message.txt', (err) => {
    if(err) throw err;
    console.log('File deleted!');
});