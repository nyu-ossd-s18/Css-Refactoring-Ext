define(function(require, exports, module) {
   "use strict";
    console.log("Loaded Css Color Refactoring Extension");
   
    
    var CommandManager = brackets.getModule("command/CommandManager"),
    WorkspaceManager = brackets.getModule("view/WorkspaceManager"),
    Menus = brackets.getModule("command/Menus"),
    AppInit = brackets.getModule("utils/AppInit"),
    ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
    colorPalettePath = require.toUrl("colorpicker.jpg");
    
    
    const modulePath = ExtensionUtils.getModulePath(module);
    
    
    var CSS_COLOR_REFACTORING_INIT = "CSS_COLOR_REFACTORING.extensionInit",
        CSS_COlOR_REFACTORING_PANEL = "CSS_COLOR_REFACTORING.panelID";
    var panel;
    
    function extInit() {
        console.log("Displaying UI");
    }
    
    function toggleColorPickerCanvasView() {
        const canvasPickerElement = document.getElementsByClassName("canvas_picker")[0];
        console.log(canvasPickerElement.style);
        console.log(window.getComputedStyle(canvasPickerElement).display);
        if (window.getComputedStyle(canvasPickerElement).display === "none") {
            console.log("Displaying canvas");
            canvasPickerElement.style.display = "block";
        }
        else {
            console.log("hiding canvas");
            canvasPickerElement.style.display = "none";
        }
        
        console.log(window.getComputedStyle(canvasPickerElement).display);
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
                
                const baseColorBoxElement = document.getElementById("baseColorBox");
                baseColorBoxElement.addEventListener("click", function(evt) {
                    console.log(evt);
                    toggleColorPickerCanvasView();
                });
                
                
                const colorPaletteElement = $("<img id='colorPalette'>");
                const canvasElement = document.getElementsByClassName("canvas_picker")[0].getContext("2d");
                console.log(canvasElement);
                var colorPickerImage = new Image();
                
                colorPickerImage.src = colorPalettePath;
                
                $(colorPickerImage).load(function() {
                    canvasElement.drawImage(colorPickerImage, 0, 0);
                })
                $('#canvas_picker').click(function(event){
                    var x = event.pageX - this.offsetLeft;
                    var y = event.pageY - this.offsetTop;
                    var imgData = canvas.getImageData(x, y, 1, 1).data;
                    var R = imgData[0];
                    var G = imgData[1];
                    var B = imgData[2];
                    var rgb = R + ',' + G + ',' + B;
                     //$('#rgb input').val(rgb);
                    var hex = rgbToHex(R,G,B);
                    $('#baseColorHex input').val('#' + hex);
                    
                });
                
                //Sample jquery call.
                const colorBox1 = $("#colorBox1");
                colorBox1[0].style.backgroundColor = "blue";
                //console.log(colorBox1.style("background-color"));
                
            }
            
    
            const failure = function() {
                console.log("Failed");
            }
            function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
            function toHex(n) {
            n = parseInt(n,10);
            if (isNaN(n)) return "00";
            n = Math.max(0,Math.min(n,255));return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
            }
            
            ExtensionUtils.loadStyleSheet(module, "main.css").then(success, failure);
        }, readHtmlFileError);
        
    
    });
});