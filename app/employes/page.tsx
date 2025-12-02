
'use client'; 
import { Separator } from "@/components/ui/separator";
import { AjouterEmployeModal } from "@/components/employeComponents/AjouterEmployeModal";
import { EmployeTable } from "@/components/employeComponents/EmployeTable";
import { EmployeAnimation } from "@/components/employeComponents/EmployeAnimation"; 
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"; 


export default function GestionEmployesPage() {
    const [refreshKey, setRefreshKey] = useState(0); 
    const handleSuccess = () => { setRefreshKey(prev => prev + 1); };

    return (
        <div className="space-y-6">
            
         
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Gestion des Employés</h1>
                <AjouterEmployeModal onSuccess={handleSuccess} /> 
            </div>
            <Separator />
            
         
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              
                <div className="space-y-4">
                    <EmployeTable key={refreshKey} /> 
                </div>

              
                <Card className="p-4 flex items-center justify-center min-h-[500px]">
                    <EmployeAnimation />
                </Card>

            </div>
        </div>
    );
}