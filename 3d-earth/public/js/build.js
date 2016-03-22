function addTrack(start_lat, start_lng, end_lat, end_lng, radius, hue) {
      var num_control_points = 8;
      var max_altitude = 500 + Math.random() * 1200;

      var points = [];
      var i;
      for (i = 0; i < num_control_points + 1; i++) {
        var arc_angle = i * 180.0 / num_control_points;

        var arc_radius = radius + (Math.sin(latlngDeg2rad(arc_angle))) * max_altitude;
        
        

        var latlng = latlngInterPoint(start_lat, start_lng, end_lat, end_lng, i / num_control_points);
        var pos = latlngPosFromLatLng(latlng.lat, latlng.lng, arc_radius);

        console.log(arc_angle)

        points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
      }

      var spline = new THREE.SplineCurve3(points);

      addTrackLine(spline, hue);
    }