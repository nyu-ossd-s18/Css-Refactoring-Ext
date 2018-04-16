define(["cssRefactoringExtension", "refactoring"], function(cssRefactoringExt, rf) {
    
    
    
    setTimeout(function() {
        const documentTextObject = rf.getAllDocumentText();
        console.log(documentTextObject);
        
        documentTextObject.forEach( (x) => {
            const DomObj =  rf.getCssDom(x);
            
            console.log(rf.getColorRulesArray(DomObj));
        });
    }, 1000);
    
    
});