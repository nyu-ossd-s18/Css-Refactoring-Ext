//File contains code for generating themes.

define(["paletteJS/palette"], function(palette) {

    function testIfLoaded() {
        console.log("Test Worked");
    }
    
    function getSequentialPaletteForIndex(n, i) {
        return palette(["sequential"], n, i);
    }
    
    function hexToRgb(hex) {
	   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	   return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
	   } : null;
    }
    
    
    //Takes Hex String (hex) and (n) number of elements and returns matching palette of length n.
    function getMatchingPalette(rgbVector, range) {
        
        for (let i = 0; i < 18; i++) {
            const testPalette = palette(["sequential"], 9, i);
            
            for (let j = 0; j < testPalette.length; j++) {
                const rgbFromHex = hexToRgb(testPalette[j]);
                if (withinAcceptableRange(rgbVector, rgbFromHex, range)) {
                    return {palette: testPalette,
                            matchingIndex: j}
                }
            }
        
        }
        
        for (let i = 0; i < 10; i++) {
            const testPalette = palette(["diverging"], 9, i);
            for (let j = 0; j < testPalette.length; j++) {
                if (withinAcceptableRange(rgbVector, testPalette[j], range)) {
                    return {palette: testPalette,
                            matchingIndex: j}
                }
            }
        
        }
                
        
        for (let i = 0; i < 10; i++) {
            const testPalette = palette(["diverging"], 9, i);
            for (let j = 0; j < testPalette.length; j++) {
                if (withinAcceptableRange(rgbVector, testPalette[j], range)) {
                    return {palette: testPalette,
                            matchingIndex: j}
                }
            }
        
        }
        return null;
        
    }
       
    function withinAcceptableRange(rgbVector, rgbFromHex, range) {
        let rVal = rgbVector[0];
        let gVal = rgbVector[1];
        let bVal = rgbVector[2];

    
        return      (Math.abs(parseInt(rVal) - rgbFromHex.r) <= range) &&
                    (Math.abs(parseInt(bVal) - rgbFromHex.b) <= range) &&
                    (Math.abs(parseInt(gVal) - rgbFromHex.g) <= range);
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
        getSequentialPaletteForIndex: getSequentialPaletteForIndex,
        getMatchingPalette: getMatchingPalette,
        hexToRgb: hexToRgb
    };
})