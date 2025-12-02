
'use client'; 

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function EmployeAnimation() {
  return (
    <div className="flex justify-center items-center h-full w-full">
        <DotLottieReact
            
            src="https://lottie.host/89998e13-cd65-4eb6-ac37-cbc964749432/qh8zqm9ykq.lottie"
            style={{ width: '600px', height: '600px' }} // Rendre l'animation grande
            loop
            autoplay
        />
    </div>
  );
}