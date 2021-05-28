const notes = require('./19notes.js')
const yargs = require('yargs');
yargs.version('1.1.0')
yargs.command({
    command: 'add',
    describe:'Add a new note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler:function(argv){
        notes.addNote(argv.title,argv.body)
        console.log(argv.title);
    }
})
yargs.command({
    command: 'remove',
    describe:'Remove a new note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler:function(argv){
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'listNotes',
    describe:'List a  note',
    builder:{
    },
    handler:function(){
        notes.listNotes()
    }
})


yargs.parse()
//console.log(yargs.argv);
