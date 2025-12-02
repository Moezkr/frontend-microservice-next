
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";


import { AjouterTacheForm } from "@/components/tacheComponents/AjouterTacheForm"; 

interface AjouterTacheModalProps {
    onSuccess: () => void;
}

export function AjouterTacheModal({ onSuccess }: AjouterTacheModalProps) {
    const [open, setOpen] = useState(false);

   
    const handleSuccessAndClose = () => {
        setOpen(false); 
        onSuccess();   
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="flex items-center space-x-2">
                    <PlusCircle className="h-4 w-4" />
                    <span>Ajouter une Tâche</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nouvelle Tâche</DialogTitle>
                </DialogHeader>
              
                <AjouterTacheForm onSuccess={handleSuccessAndClose} />
            </DialogContent>
        </Dialog>
    );
}