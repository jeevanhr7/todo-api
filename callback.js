downloadPhoto('http://coolcats.com/cat.gif', handlePhoto);

function downloadPhoto(photo, maincallback) {
    setTimeout(function(){
        var photo = "JeevanPhoto";
        downloadFile("ChethanFile",handlefile);
        maincallback(null,photo); 
    }, 6000);
    
}

function downloadFile(file, innnercallback) {
    setTimeout(function () {
       console.log( innnercallback.toString());
        var file = "JeevanFile";
        innnercallback(null,file);
    },3000)
   
}


function handlefile(error, file) {
    console.log("File Downloadded")
    console.log("Coming to the File Download Funtion")
    if (error) console.error('Download error!', error)
    else console.log('Download FILE:', file)
}



function handlePhoto(error, photo) {
    console.log("Photo Downloadded")
    console.log("Coming to the Photo Download Function")
    if (error) console.error('Download error!', error)
    else console.log('Download PHOTO:', photo)
}

console.log('Download started');
