define(["colorSelection", "require", "exports", "module"], function(colorSelection, require, exports, module) {
   "use strict";
    console.log("Loaded Css Color Refactoring Extension");
   
    
    var CommandManager = brackets.getModule("command/CommandManager"),
    WorkspaceManager = brackets.getModule("view/WorkspaceManager"),
    Menus = brackets.getModule("command/Menus"),
    AppInit = brackets.getModule("utils/AppInit"),
    ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
    colorPalettePath = require.toUrl("colorpicker.jpg");
    console.log("Testing");
    console.log(colorSelection.testIfLoaded());
    
    const modulePath = ExtensionUtils.getModulePath(module);
    
    
    var CSS_COLOR_REFACTORING_INIT = "CSS_COLOR_REFACTORING.extensionInit",
        CSS_COlOR_REFACTORING_PANEL = "CSS_COLOR_REFACTORING.panelID";
    var panel;
    
    function extInit() {
        console.log("Displaying UI");
    }
    
    
    function handleMenuToggle() {
        
        if (panel.isVisible()) {
            panel.hide();
            
            CommandManager.get(CSS_COLOR_REFACTORING_INIT).setChecked(false);
        }
        
        else {
            panel.show();
            
            CommandManager.get(CSS_COLOR_REFACTORING_INIT).setChecked(true);
        }
    }
    
    
    //Main event that registers and initiates the extensions.
    AppInit.extensionsLoaded(function() {
        
        CommandManager.register("Css Color Refactoring", CSS_COLOR_REFACTORING_INIT, handleMenuToggle);
    
        const viewMenu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
        viewMenu.addMenuDivider();
        viewMenu.addMenuItem(CSS_COLOR_REFACTORING_INIT);
        
        
        //function takes a base hexcode and 
        const getComplementaryColors = function(baseColor) {
            
            return ["#008000", "#00FFFF", "#008080", "#0000FF"]
        }
        
        const readHtmlFileError = function(err) {
            console.log(err);        
        }
        
        ExtensionUtils.loadFile(module, "index.html").then(function (fileContents) {
            
            console.log(fileContents);
            panel = WorkspaceManager.createBottomPanel(CSS_COlOR_REFACTORING_PANEL,$(fileContents),200);
            
            const success = function(v) {
                
                console.log("success");
                const colorSelectorDot = $("#CSS_COLOR_REFACTORING_EXTENSION_DOMCONTENT #dot");
                console.log(colorSelectorDot);
                
                //Click handler for handling change of selected color.
                
                const chosenColorCenter = $("#CSS_COLOR_REFACTORING_EXTENSION_DOMCONTENT #chosenColorCenter");
                const colorPaletteElement = $("<img id='colorPalette'>");
                colorPaletteElement.attr("src", colorPalettePath);
            
                chosenColorCenter.append(colorPaletteElement);
                //Sample jquery call.
                const colorBox1 = $("#colorBox1");
                colorBox1[0].style.backgroundColor = "blue";
                //console.log(colorBox1.style("background-color"));
                
            }
    
            const failure = function() {
                console.log("Failed");
            }
            
            ExtensionUtils.loadStyleSheet(module, "main.css").then(success, failure);
        }, readHtmlFileError);
        
    
    });
});