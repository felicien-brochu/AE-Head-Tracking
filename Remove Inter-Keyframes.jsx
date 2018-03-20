/*
    This script removes 4 of 5 keyframes resulting in a 12 kps in a 60 fps composition
*/

var proj = app.project; // The Application Object is at the top level followed by the Project Object 
var comp = proj.activeItem;  // Set the comp variable to the active composition 
var layer = comp.selectedLayers[0]; // Set the layer variable to the first layer of the composition object 

var selProperties = layer.selectedProperties;
for (var i = 1; i <= selProperties.length; i++) {
    var prop = selProperties[i];
    if (prop instanceof Property) {
        if (prop.canVaryOverTime && prop.numKeys > 0) {
            for (var j = 2; j < prop.numKeys - 5; j++) {
                prop.removeKey(j);
                prop.removeKey(j);
                prop.removeKey(j);
                prop.removeKey(j);
            }
        }
    }
}