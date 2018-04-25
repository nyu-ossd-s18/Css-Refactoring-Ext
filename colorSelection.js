//File contains code for generating themes.

define(["paletteJS/palette"], function(palette) {

    function testIfLoaded() {
        console.log("Test Worked");
    }
    
    function getSequentialPaletteForIndex(i) {
        return palette("tol-sq", i);
    }
    
    function getMatchingPalette(r, g, b) {
        
    }
    
    //Takes array where first three elements are red-, green-, blue-values of the color.
    function rgbToHex(rgbVector) {
        
        const valToHex = function(c){
            var hexCode = c.toString(16);
            return hexCode.length == 1 ? "0" + hexCode : hexCode;
        }
        
        return "#" + valToHex(rgbVector[0]) + valToHex(rgbVector[1]) + valToHex(rgbVector[2]);
    }
    
    function getRandomPalette() {
        var seq = palette("tol-sq", 10);
        console.log(seq);
    }
    
    return {
        rgbToHex: rgbToHex,
        testIfLoaded: testIfLoaded,
        getRandomPalette: getRandomPalette,
        getSequentialPaletteForIndex: getSequentialPaletteForIndex
    };
})