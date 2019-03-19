console.log('Starting Notes Application....');

const fs = require('fs');
//const readline = require('readline');
const notes = require('./notes.js');
const yargs = require('yargs');
var cmd= process.argv[2];
  const titleOptions={
    describe: 'Title of a Note',
    demand: true,
    alias:'t'
  };
  const bodyOptions={
    describe:'Enter the Note details',
    demand: true,
    alias:'b'
  }
const argv=yargs
.command('add','Add a new Note',{
  title:titleOptions,
  body:bodyOptions
})
.command('list','List all Notes from DB')
.command('read','Request a Note to read',{
  title:titleOptions
})
.command('remove','Remove a particular Note from DB',{
  title:titleOptions
})
.help()
.argv;
// console.log('Process: ', process.argv);
// console.log('Yargs: ', yargs.argv);
// console.log(cmd);
if(cmd==='add'){
  // console.log('adding new note with the details>>>>>>', yargs.argv.title,'............');
  var note=notes.addNote(argv.title, argv.body);
  if(note==undefined)
    console.log("Failed: note already exists");
  else{
    console.log("Note Created");
    notes.logNote(note);
  }
}
else if (cmd==='list') {
  console.log('listing all notes');
  var allNotes=notes.getAll();
  allNotes.forEach((note)=>notes.logNote(note));
}
else if (cmd==='read') {
  console.log('reading note');
  var note=notes.read(argv.title);
  if(note==undefined)
    console.log("Note not found");
  else{
    console.log("Note:", note);
    notes.logNote(note);
  }
}
else if (cmd==='remove') {
  // console.log('removing note');
  notes.remove(argv.title);
}
else {
  console.log('invalid command');
}
