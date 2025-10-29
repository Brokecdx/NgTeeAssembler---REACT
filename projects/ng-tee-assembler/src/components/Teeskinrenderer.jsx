import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

// 1. Import the logic and types we copied
import { Tee, TeeConfig } from '../utils/teeAssembler/Tee';
import { isDigit } from '../utils/teeAssembler/Color';

// 2. Create the styled-component wrapper
// I've copied all the CSS from 'ng-tee-assembler.component.css' here
const TeeWrapper = styled.div`
  /*
    TeeAssembler 3.0
    Made by Aleksandar Blažić
    And converted to typescript by Samuele Radici (kio)
    Discord: Alexander_#6686
    Discord: everestkio
  */

  /* The original .tee class is now the base for this component.
    The default size from the original CSS is used as a fallback.
  */
  font-size: 1px;
  position: relative;
  width: 80px;
  height: 80px;

  /* Handle dynamic size from props */
  ${props => props.dynamicSize && `
    font-size: ${props.dynamicSize / 100}px;
    height: ${props.dynamicSize}px;
    width: ${props.dynamicSize}px;
  `}

  /* All other selectors are nested inside */
  .back_foot,
  .back_foot_shadow,
  .front_foot,
  .front_foot_shadow {
    width: 64em;
    height: 32em;
  }

  .back_foot_shadow {
    background-position: -192em -64em;
    top: 52em;
    left: 4em;
    transform: scale(1.2);
  }

  .back_foot {
    background-position: -192em -32em;
    top: 51em;
    left: 7em;
    transform: scale(1.4);
  }

  .body,
  .body_shadow {
    width: 96em;
    height: 96em;
    transform: scale(0.9);
    top: 0;
  }

  .body_shadow {
    background-position: -96em 0;
  }

  .body {
    background-position: 0 0;
  }

  .front_foot_shadow {
    background-position: -192em -64em;
    top: 52em;
    left: 28em;
    transform: scale(1.2);
  }

  .front_foot {
    background-position: -192em -32em;
    top: 51em;
    left: 26em;
    transform: scale(1.35);
  }

  .lEye,
  .rEye {
    display: inline-flex;
    width: 32em;
    height: 32em;
    background-position: -64em -96em;
    filter: brightness(1);
  }

  .lEye {
    left: -22em;
    top: -21em;
    transform: scale(1.08);
  }

  .rEye {
    left: -9em;
    top: -21em;
    transform: scale(1.08) rotateY(-180deg);
  }

  .line {
    width: 9.5em;
    height: 1em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 0.5em 0.5em;
    opacity: 0;
  }

  .marker {
    width: 1em;
    height: 1em;
    position: absolute;
    right: -1em;
    opacity: 0;
  }
`;

/**
 * React component to render a TeeWorlds skin.
 * This is a React port of the ngx-teeassembler Angular component.
 */
function TeeSkinRenderer({ 
  skinImage, 
  size, 
  lookMouse, 
  look, 
  bodyColor, 
  feetColor, 
  coloringMode = 'code' 
}) {

  // 3. Use refs
  const teeContainerRef = useRef(null); // Ref to the root <div>
  const teeInstanceRef = useRef(null);  // Ref to the instance of the Tee class

  // 4. Main initialization effect (replaces ngOnInit)
  useEffect(() => {
    if (skinImage && teeContainerRef.current) {
      
      // Pass props to the Tee class constructor
      const config = {
        bodyColor,
        feetColor,
        coloringMode,
        size
      };

      // Create the new Tee instance
      teeInstanceRef.current = new Tee(skinImage, teeContainerRef.current, config);

      // Set initial "look" state based on props
      if (lookMouse) {
        teeInstanceRef.current.lookAtCursor();
      } else if (look !== undefined && isDigit(look.toString())) {
        teeInstanceRef.current.lookAt(look);
      } else {
        teeInstanceRef.current.lookAt(0); // Default look
      }

      // 5. Cleanup function
      return () => {
        teeInstanceRef.current?.dontLookAtCursor();
        teeInstanceRef.current?.unbindContainer();
        teeInstanceRef.current = null;
      };
    }
  }, [skinImage, size, bodyColor, feetColor, coloringMode]); // Re-run if these change

  // 6. Effect for "look" prop changes
  // This runs *without* re-creating the whole skin
  useEffect(() => {
    if (!teeInstanceRef.current) return; // Do nothing if instance doesn't exist

    if (lookMouse) {
      teeInstanceRef.current.lookAtCursor();
    } else if (look !== undefined && isDigit(look.toString())) {
      // Must remove cursor listener if it's active
      teeInstanceRef.current.dontLookAtCursor(); 
      teeInstanceRef.current.lookAt(look);
    } else {
      // Fallback to default
      teeInstanceRef.current.dontLookAtCursor();
      teeInstanceRef.current.lookAt(0);
    }
  }, [look, lookMouse]);


  // 7. Render the component
  return (
    <TeeWrapper
      ref={teeContainerRef}
      dynamicSize={size}
      className="tee" // The Tee class needs this to find the .line, .marker, etc.
    />
  );
}

export default TeeSkinRenderer;
