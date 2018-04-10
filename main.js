define(["refactoring"], function(refactoring) {
    
    
    
    //Brackets Modules
    const AppInit = brackets.getModule("utils/AppInit");
    
    
    setTimeout(function() {
        const documentTextObject = refactoring.getCssDom();
        
        documentTextObject.forEach( (x) => {
            console.log(x.text);
        })
    }, 1000);
    
    
});