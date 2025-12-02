
'use client'; 

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function TacheAnimation() {
  return (
    <div className="flex justify-center items-center h-full w-full">
        <DotLottieReact
          
            src="https://lottie.host/f267233a-a044-47af-a592-b8bedd3b298d/0yQqcxukib.lottie"
            style={{ width: '600px', height: '600px' }} 
            loop
            autoplay
        />
    </div>
  );
}