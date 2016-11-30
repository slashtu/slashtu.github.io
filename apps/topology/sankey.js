d3.sankey = function() {
  var sankey = {},
      nodeRadius = 10,
      nodePadding = 8,
      size = [1, 1],
      width = 1,
      height = 1,
      nodes = [],
      layout = [],
      links = [];

  sankey.debug = function() {
    console.log('debug')
    console.log(nodes);
  };

  sankey.nodeRadius = function(_) {
    if (!arguments.length) return nodeRadius;
    nodeRadius = +_;
    return sankey;
  };

  sankey.nodePadding = function(_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  };

  sankey.nodes = function(_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return sankey;
  };

  sankey.links = function(_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  };

  sankey.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    width = size[0];
    height = size[1];
    return sankey;
  };

  sankey.layout = function(_) {

    layout = _;

    computeNodeLinks();
 
    // computeNodeValues();
    console.log(links)
    computeNodeBreadths();
    computeNodeDepths();
    // computeNodeDepths(iterations);
    // computeLinkDepths();
    
    return sankey;
  };

  sankey.relayout = function() {
    computeLinkDepths();
    return sankey;
  };

  sankey.link = function() {
    var curvature = .3;

    function link(d) {
      console.log(d)
      var x0 = d.source.x,
          x1 = d.target.x,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y,
          y1 = d.target.y;
      return "M" + x0 + "," + y0
           + "C" + x2 + "," + y0
           + " " + x3 + "," + y1
           + " " + x1 + "," + y1;
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks() {
    // console.log(nodes)
    nodes.forEach(function(node) {
      // console.log(node)
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    links.forEach(function(link) {
      // console.log(link)
      var source = link.source,
          target = link.target;
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues() {
    nodes.forEach(function(node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),
        d3.sum(node.targetLinks, value)
      );
    });
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths() {
    // console.log(nodes)
    // console.log(layout)
    // console.log(width)
    var column = layout.length;
    var breadth = (width - nodeRadius * 2)/(column - 1);

    nodes.forEach(function(node){
      node.x = node.column * breadth + nodeRadius
    });

    // console.log(nodes)
  }

  function moveSourcesRight() {
    nodes.forEach(function(node) {
      if (!node.targetLinks.length) {
        node.x = d3.min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
      }
    });
  }

  function moveSinksRight(x) {
    nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(function(node) {
      node.x *= kx;
    });
  }

  function computeNodeDepths(iterations) {
    var depth = 0;
    // var breadth = (width - nodeRadius * 2)/(column - 1);

    nodes.forEach(function(node){
      var depth = (height) / (layout[node.column] + 1)

       node.y = (node.row + 1) * depth;
    });
  }

  function computeLinkDepths() {
    nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetDepth);
      node.targetLinks.sort(ascendingSourceDepth);
    });
    nodes.forEach(function(node) {
      var sy = 0, ty = 0;
      node.sourceLinks.forEach(function(link) {
        link.sy = sy;
        sy += link.dy;
      });
      node.targetLinks.forEach(function(link) {
        link.ty = ty;
        ty += link.dy;
      });
    });

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y;
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y;
    }
  }

  function center(node) {
    return node.y + node.dy / 2;
  }

  function value(link) {
    return link.value;
  }

  return sankey;
};
