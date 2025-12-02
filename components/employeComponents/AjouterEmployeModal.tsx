
'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner'; 
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Loader2 } from "lucide-react";

const URL_EMPLOYE_SERVICE = process.env.NEXT_PUBLIC_API_EMPLOYE_SERVICE;

interface AjouterEmployeModalProps {
    onSuccess: () => void; 
}

export function AjouterEmployeModal({ onSuccess }: AjouterEmployeModalProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
   
    const [nomComplet, setNomComplet] = useState('');
    const [poste, setPoste] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nomComplet || !poste || !email) {
            toast.error("Erreur de validation", { description: "Veuillez remplir les champs obligatoires (Nom, Poste, Email)." });
            return;
        }

        setIsLoading(true);

        try {
            const nouvelEmploye = { nomComplet, poste, email, telephone };
        
            await axios.post(URL_EMPLOYE_SERVICE!, nouvelEmploye);

            toast.success("Succès !", {
                description: `L'employé ${nomComplet} a été ajouté.`,
            });
            
           
            setNomComplet('');
            setPoste('');
            setEmail('');
            setTelephone('');
            setOpen(false);
            onSuccess(); 

        } catch (error) {
            toast.error("Erreur API Employés", {
                description: "Échec de l'ajout. Le service Employé (8082) est-il opérationnel ?",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="flex items-center space-x-2">
                    <PlusCircle className="h-4 w-4" />
                    <span>Ajouter un Employé</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nouvel Employé</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nomComplet" className="text-right">Nom</Label>
                        <Input id="nomComplet" value={nomComplet} onChange={(e) => setNomComplet(e.target.value)} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="poste" className="text-right">Poste</Label>
                        <Input id="poste" value={poste} onChange={(e) => setPoste(e.target.value)} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="telephone" className="text-right">Téléphone</Label>
                        <Input id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} className="col-span-3" />
                    </div>
                    
                    <DialogFooter className="mt-4">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : "Sauvegarder l'Employé"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}