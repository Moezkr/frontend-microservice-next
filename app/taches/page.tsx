
'use client'; 

import { AjouterTacheModal } from "@/components/tacheComponents/AjouterTacheModal";
import { TacheAnimation } from "@/components/tacheComponents/TacheAnimation"; 
import { TacheTable } from "@/components/tacheComponents/TacheTable"; 
import { Separator } from "@/components/ui/separator"; 
import { Card } from "@/components/ui/card"; 
import { useState } from 'react'; 

export default function GestionTachesPage() {
    const [refreshKey, setRefreshKey] = useState(0); 

    const handleSuccess = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="space-y-6">
            
        
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Gestion des Tâches</h1>
                <AjouterTacheModal onSuccess={handleSuccess} /> 
            </div>
            <Separator />
            
        
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

           
                <div className="space-y-4">
                    <TacheTable key={refreshKey} refreshTrigger={refreshKey} /> 
                </div>

             
                <Card className="p-4 flex items-center justify-center min-h-[500px]">
                    <TacheAnimation /> 
                </Card>

            </div>
        </div>
    );
}