define(function(require, exports, module) {
   "use strict";
    console.log("Loaded Css Color Refactoring Extension");
    
    
    //var domContent = '<div id="CSS_COLOR_REFACTORING_EXTENSION_DOMCONTENT" class="container bottom-panel"> <div class="chosenColor"> <center> <p>Generate Random Theme</p><p>Chosen Color:</p><span class="dot"></span> <p class="colorHex0">#58355E</p></center> </div><div class="complementaryColors"> <center><p>Four Complementary Colors </p></center> <div class="colors"> <div class="color"> <div class="colorBox1"></div><p class="colorHex1">#E03616</p></div><div class="color"> <div class="colorBox2"></div><p class="colorHex2">#FFF689</p></div><div class="color"> <div class="colorBox3"></div><p class="colorHex3">#CFFFB0</p></div><div class="color"> <div class="colorBox4"></div><p class="colorHex4">#5998C5</p></div></div></div></div>';
    
    var CommandManager = brackets.getModule("command/CommandManager"),
    WorkspaceManager = brackets.getModule("view/WorkspaceManager"),
    Menus = brackets.getModule("command/Menus"),
    AppInit = brackets.getModule("utils/AppInit"),
    ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    
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
    
    AppInit.extensionsLoaded(function() {
        
        CommandManager.register("Css Color Refactoring", CSS_COLOR_REFACTORING_INIT, handleMenuToggle);
    
        const viewMenu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
        viewMenu.addMenuDivider();
        viewMenu.addMenuItem(CSS_COLOR_REFACTORING_INIT);

        const loadDomContent = function(domContent) {
            console.log(domContent);
            console.log(CSS_COlOR_REFACTORING_PANEL);
            
            
            
            console.log(CSS_COlOR_REFACTORING_PANEL);

        }
        
        const readHtmlFileError = function(err) {
            console.log(err);
            
        }
        ExtensionUtils.loadFile(module, "index.html").then(function (fileContents) {
            console.log(fileContents);
            panel = WorkspaceManager.createBottomPanel(CSS_COlOR_REFACTORING_PANEL,$(fileContents),200);
            
            const success = function(v) {
                
                console.log("success");
                const colorSelector = $("#CSS_COLOR_REFACTORING_EXTENSION_DOMCONTENT.colorPicker");
                console.log(colorSelector);
                colorSelector.bind("click", function(evt) {
                    console.log("Clicked", evt);
                });
                
                const colorBox1 = $(".colorBox1");
                console.log(colorBox1[0].style);
                //console.log(colorBox1.style("background-color"));
                
            }
    
            const failure = function() {
                console.log("Failed");
            }
            
            ExtensionUtils.loadStyleSheet(module, "main.css").then(success, failure);
        }, readHtmlFileError);
        
    
    });
});