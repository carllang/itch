class RunningDisplay {
    constructor () {
        this.RUNNING_DISPLAY_WIDTH = 860;
        this.RUNNING_DISPLAY_HALF_WIDTH = RUNNING_DISPLAY_WIDTH/2;
        this.RUNNING_DISPLAY_HEIGHT = 80;
        this.RUNNING_DISPLAY_HALF_HEIGHT = RUNNING_DISPLAY_HEIGHT/2;
        this.SECONDS_OF_RUNNING_DISPLAY = 2.0;
    }
   

    draw ( context, cache, centerInSeconds ) {
        let center = Math.floor( centerInSeconds * RUNNING_DISPLAY_WIDTH / SECONDS_OF_RUNNING_DISPLAY );
    //    var centerOffset = RUNNING_DISPLAY_HALF_WIDTH - center;
        let left = center - RUNNING_DISPLAY_HALF_WIDTH;

        let leftEdgeIndex = Math.floor((center - RUNNING_DISPLAY_HALF_WIDTH)/MAX_CANVAS_WIDTH);
        if (leftEdgeIndex<0)
            leftEdgeIndex=0;
        let rightEdgeIndex = Math.floor((center + RUNNING_DISPLAY_HALF_WIDTH)/MAX_CANVAS_WIDTH);
        if (rightEdgeIndex>=cache.length)
            rightEdgeIndex = cache.length - 1;

    //    if (center!=0)
    //        console.log("draw: " + leftEdgeIndex + ":" + rightEdgeIndex);
        for (let i = leftEdgeIndex; i<=rightEdgeIndex; i++) {
            context.drawImage( cache[i], RUNNING_DISPLAY_HALF_WIDTH - center + (MAX_CANVAS_WIDTH*i), 0 );
    //        if (center!=0)
    //            console.log("cache " + i + " offset " + (RUNNING_DISPLAY_HALF_WIDTH - center + (MAX_CANVAS_WIDTH*i)));
        }
    }
}