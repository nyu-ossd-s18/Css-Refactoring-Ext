


define(function() {
    const dm = brackets.getModule("document/DocumentManager");
    
    //Returns all document objects with file path and text.
    const getAllDocumentText = function() {
        const openDocs = dm.getAllOpenDocuments();
        const returnObjectArray = [];
        
        openDocs.forEach( (x) => {
            
            dm.getDocumentText(x.file).then(function(txt) {
                returnObjectArray.push({text: txt});
            });
            
        });
        
        return returnObjectArray;
        
    }
    
    return {getAllDocumentText: getAllDocumentText}
})