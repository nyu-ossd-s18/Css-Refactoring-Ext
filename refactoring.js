define(["CssParser"], function(cssParser) {
    
    const dm = brackets.getModule("document/DocumentManager");
    
    //Returns all document objects with file path and text.
    const getAllDocumentText = function() {
        
        const openDocs = dm.getAllOpenDocuments();
        const returnObjectArray = [];
        openDocs.forEach( (x) => {
            
        
            
            if (x.file._name.substring(x.file._name.lastIndexOf(".")) === ".css") {
                dm.getDocumentText(x.file).then(function(txt) {
                returnObjectArray.push({text: txt});
            });
                
            }
            
        });
        
        return returnObjectArray;
        
    }
    const getCssDom = function(textObject) {
        const parser = new cssParser.CSSParser();
        const sheet = parser.parse(textObject.text);
        return sheet;
        
        
    }
    
    const getColorValues = function(textObject) {
//        console.log(textObject);
        const textArray = textčObject.text.split(" ");
        console.log(textArray);
        
    }
    
    const getColorRulesArray = function(CSSDomObject) {
        return CSSDomObject.cssRules.map(function(x){
            console.log(x);
            const selectorRuleObject  = {
                selectorText: x.mSelectorText,
                colorRules: []
            };
            
            x.declarations.forEach((x) => {
                if (x.property === "color" || x.property === "background-color") {
                    selectorRuleObject.colorRules.push(x);
                }
            })
            if (selectorRuleObject.colorRules.length > 0) {
                return selectorRuleObject;    
            }
            
            
        });
    }
    
    
    return {getAllDocumentText: getAllDocumentText,
           getCssDom: getCssDom,
           getColorValues: getColorValues,
           getColorRulesArray: getColorRulesArray};
})