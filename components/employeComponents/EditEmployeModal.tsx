
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2 } from "lucide-react";

const URL_EMPLOYE_SERVICE = process.env.NEXT_PUBLIC_API_EMPLOYE_SERVICE;

interface Employe {
    id: string; 
    nomComplet: string;
    poste: string;
    email: string;
    telephone: string;
}

interface EditEmployeModalProps {
    employe: Employe;
    onSuccess: () => void;
}

export function EditEmployeModal({ employe, onSuccess }: EditEmployeModalProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const [nomComplet, setNomComplet] = useState(employe.nomComplet);
    const [poste, setPoste] = useState(employe.poste);
    const [email, setEmail] = useState(employe.email);
    const [telephone, setTelephone] = useState(employe.telephone);

    useEffect(() => {
        setNomComplet(employe.nomComplet);
        setPoste(employe.poste);
        setEmail(employe.email);
        setTelephone(employe.telephone);
    }, [employe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nomComplet || !poste || !email) {
            toast.error("Erreur de validation", { description: "Veuillez remplir les champs obligatoires." });
            return;
        }

        setIsLoading(true);

        try {
            const employeMisAJour = { id: employe.id, nomComplet, poste, email, telephone };
            await axios.put(`${URL_EMPLOYE_SERVICE}/${employe.id}`, employeMisAJour);

            toast.success("Mise à jour réussie !", { description: `L'employé ${nomComplet} a été mis à jour.` });
            setOpen(false);
            onSuccess();

        } catch (error) {
            toast.error("Erreur de mise à jour", { description: "Échec de la mise à jour dans le service Employé. Vérifiez la méthode PUT du backend." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modifier Employé: {employe.nomComplet}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nomComplet" className="text-right">Nom Complet</Label>
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
                            {isLoading ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : "Sauvegarder les modifications"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
