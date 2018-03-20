var proj = app.project;
var comp = proj.activeItem;
var layer = comp.layer("Controller");
var effects = layer.property("Effects");

var keyframeDuration = 1. / 12
var start = Math.max(comp.workAreaStart, layer.inPoint);
var end = Math.min(comp.workAreaStart + comp.workAreaDuration, layer.outPoint);

app.beginUndoGroup("Generate Tracking Keyframes");

for (var i = 1; i <= effects.numProperties; i++) {
    var prop = effects.property(i).property(1);
    if (prop instanceof Property && prop.canVaryOverTime && prop.expressionEnabled) {
        for (var j = 0, t = start; t < end; j++, t = start +  j * keyframeDuration) {
            prop.setValueAtTime(t, prop.valueAtTime(t, false));
            prop.setSelectedAtKey(j + 1, true);
        }
        prop.expressionEnabled = false;
    }
}

app.endUndoGroup();