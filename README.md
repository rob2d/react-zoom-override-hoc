# Installation

``` 
npm install react-zoom-override-hoc
```

# Usage

Below is an over-simplified example which
illustrates pertinant usage of the HOC.

```
import React from 'react'
import { withZoomOverride } from 'react-zoom-override-hoc';
 
function FancyImageViewer ({ ...props }) {
    return (/* your sparkling masterpiece */)
}

const ZoomableImage = withZoomOverride(FancyImageViewer);

component App extends React.Component {
    /**
     * This type of event will be triggered
     * when the Zoomable Image's outer 
     * container has focus only, and on 
     * detection of user input for zoom
     **/
    onZoomForImage = ({ delta })=> {
        if(delta > 0) {
                // zooming in 
        } else {
                // zooming out
        }
    };
    render () {
        return (
            <div>
                <ZoomableImage 
                    onZoomChange={this.onZoomForImage} 
                />
            </div>
        );
    }
}
```

# `withZoomOverride` Interface Props

**`onZoomChange(options)`** when a zoom event is detected, this is triggered with `delta` in an options argument signifying the level of change in in Y axis for a MouseWheel axis, or default value of `10`/`-10` for up/down key presses. 

[Currently only supports mousewheel/touch pad as component is super early/WIP]

**`zoomContainerClass`** `className` for outer container. Can also accept `classes.zoomContainerClass` if you are already using a JSS interface.

[This may change to simply component's outer child]


# Important Note

This is currently W.I.P. for supporting a new project on my own time. It is placed bere to dogfood it directly from NPM.

Functionality will definitely be expanded upon and better documentation added throughout August as I revisit. Things are currently being tested in Chrome and Firefox on Windows 10. If you are using this or even not satisfied with it, please be amazing and submit any issues/feedback.

Also (with the guidance of common sense/consideration), feel free to PR if you would like to contribute. Contributions always welcome 🙃