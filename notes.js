console.log('Starting Helper notes.js...');

const fs = require('fs');
//fetching notes***********************************************************
var fetchNotes=()=>{
  try {
    var strNote=fs.readFileSync('notes-data.json');
    return JSON.parse(strNote);
  } catch (e) {return [];}
}
//saving notes function***************************************************
var saveNotes=(notes)=>{
  // we can use append file sync to avoid fetching notes and appending manually
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}
// adding a note***********************************************************
var addNote=(title, body)=>{
  var notes=fetchNotes();
  var note={
    title, body
  }
  var duplicateNotes=notes.filter((note)=>note.title===title);
  if(duplicateNotes.length==0){
  notes.push(note);
  saveNotes(notes);
  return note;
  }
};
// getting all the nodes from data base************************************
var getAll=()=>{
   return fetchNotes();
};
// reading a particular note***********************************************
var read=(title)=>{
  console.log('reading node....',title);
  var notes=fetchNotes();
  var note=notes.filter((note)=>note.title===title);
  console.log(note);
  if(note.length==1){
  return note[0];
  }
  else{
    console.log('Note not found');
  }
};
// removing a note*******************************************************
var remove=(title)=>{
  // console.log('removing node....',title);
  var notes=fetchNotes();
  var noteFound=notes.filter((note)=>note.title!=title);
  if(noteFound.length!=notes.length){
    console.log('Note Removed');
    saveNotes(noteFound);
    // console.log('new list: ',noteFound);
  }
  else{
    console.log('Note not found');
  }
};
var logNote=(note)=>{
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
  console.log('______________');
};
module.exports={
  addNote,
  getAll,
  read,
  remove,
  logNote
};
