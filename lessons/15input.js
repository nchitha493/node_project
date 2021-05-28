console.log(process.argv);
const command =process.argv[2];
if(command=='add'){
    console.log("add notes");
}else if(command=='remove'){
    console.log("remove notes");
}