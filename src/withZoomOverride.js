import React from 'react'
import addMouseWheelEvent from 'mouse-wheel'

const KeyCodes = {
    CTRL  : 17
};

const withZoomControl = (WrappedComponent)=> {
    return class ZoomControlledComponent extends WrappedComponent {
        constructor () {

            super();

            // create namespaces for container
            // if they don't already exist
            
            /**
             * R is namespace for all 
             * references in our component 
             * to track
             */
            this.R = this.R || {};
            this.R.zoomContainer = undefined;

            /**
             * Unofficial state variables;
             * these are for callbacks we
             * want to react to instantaneously
             * without necessarily re-rendering
             * and also avoiding the overhead of
             * setState; use sparingly
             */
            this.S = {
                hasFocus      : true,
                isCtrlKeyDown : true,
                wheelListener : undefined
            };
        }

        onFocus = (e) => {
            this.S.hasFocus = true;
        };

        onUnfocus = () => {
            this.S.hasFocus = false;

            // if user re-focuses, he must
            // begin to hold control again
            // to get zoom function (for the
            // sake of not ruining other
            // unrelated functionality in 
            // user programmer's web app)

            //this.S.isCtrlKeyDown = false;
        };

        onKeyDown = (e) => {
            switch(e.keyCode) {
                case KeyCodes.CTRL : 
                    if(this.S.hasFocus) {
                        this.S.isCtrlKeyDown = true;
                    }
                    break;
                default :
                    break;
            }
        };

        onKeyUp = (e) => {
            switch(e.keyCode) {
                case KeyCodes.CTRL :
                    this.S.isCtrlKeyDown = false;
                    break;
                default : 
                    break;
            }
        };

        onMouseWheel = (dx, dy, dz, e) => {
            if(this.S.isCtrlKeyDown) {
                e.preventDefault();
                this.props.onZoomChange({ delta : dy });
            }
        };
        
        componentDidMount () {
            super.componentDidMount && super.componentDidMount();
            
            this.R.zoomContainer.addEventListener('focusin', this.onFocus);
            this.R.zoomContainer.addEventListener('focusout', this.onUnfocus);
        
            document.addEventListener('keydown', this.onKeyDown);
            document.addEventListener('keyup', this.onKeyUp);

            this.S.wheelListener = addMouseWheelEvent(
                document, this.onMouseWheel, false
            );
        }

        componentWillUnmount() {
            this.R.zoomContainer.removeEventListener('focusin', this.onFocus);
            this.R.zoomContainer.removeEventListener('focusout', this.onUnfocus);
        
            document.removeEventListener('keydown', this.onKeyDown);
            document.removeEventListener('keyup', this.onKeyUp);
            document.removeEventListener('mousewheel', this.onMouseWheel);
            document.removeEventListener('wheel', this.S.wheelListener);
        }

        render () {
            /**
             * Outer container className; defined
             * either via JSS in "classes" or
             * custom as "zoomContainerClass" prop.
             * by default will be a blank div
             */
            let zoomContainerClass = this.props.classes.zoomContainerClass || 
                                        this.props.zoomContainerClass || '';
            
            return (
                <div 
                    ref = { c => this.R.zoomContainer = c } 
                    className = { zoomContainerClass }
                > { super.render() }
                </div>
            );
        }
    }
};

export default withZoomControl