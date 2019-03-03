function set_polygons_paths1(ssbb) {

    var bordercolor = '#FF0000';
    var stroke_Opacity = 1.0;
    var stroke_Weight = 3;

    poly_sb0 = new google.maps.Polygon({
        path: ssbb[0],
        strokeColor: bordercolor,//'#FF0000',
        strokeOpacity: stroke_Opacity,//1.0,
        strokeWeight: stroke_Weight
    });
    poly_sb1 = new google.maps.Polygon({
        path: ssbb[1],
        strokeColor: bordercolor,//'#FF0000',
        strokeOpacity: stroke_Opacity,//1.0,
        strokeWeight: stroke_Weight
    });
    poly_sb2 = new google.maps.Polygon({
        path: ssbb[2],
        strokeColor: bordercolor,//'#FF0000',
        strokeOpacity: stroke_Opacity,//1.0,
        strokeWeight: stroke_Weight
    });
    poly_sb3 = new google.maps.Polygon({
        path: ssbb[3],
        strokeColor: bordercolor,//'#FF0000',
        strokeOpacity: stroke_Opacity,//1.0,
        strokeWeight: stroke_Weight
    });


}