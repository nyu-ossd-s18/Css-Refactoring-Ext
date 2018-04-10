define(["refactoring"], function(refactoring) {
    
    
    
    //Brackets Modules
    const AppInit = brackets.getModule("utils/AppInit");
    
    
    console.log(AppInit);
    
    setTimeout(function() {
        const documentTextObject = refactoring.getAllDocumentText();
        
        documentTextObject.forEach( (x) => {
            console.log(x.text);
        })
    }, 1000);
    
    
});