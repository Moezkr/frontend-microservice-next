
'use client'; 

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";


import { 
  fetchAllEmployes, 
  createTache, 
  Employe, 
  NouvelleTache 
} from "@/app/api/gestionApi"; 

interface AjouterTacheFormProps {
  onSuccess: () => void;
}

export function AjouterTacheForm({ onSuccess }: AjouterTacheFormProps) {
  const [employes, setEmployes] = useState<Employe[]>([]);
  
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [dateLimite, setDateLimite] = useState('');
  const [employeId, setEmployeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 
  useEffect(() => {
    const fetchEmployesData = async () => {
      try {
        const data = await fetchAllEmployes();
        setEmployes(data);
      } catch (error) {
        toast.error("Erreur de Connexion", {
          description: "Impossible de contacter le service Employé (port 8082) pour récupérer la liste des employés.",
        });
      }
    };
    fetchEmployesData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre || !employeId || !dateLimite) {
      toast.error("Erreur de validation", { description: "Veuillez remplir tous les champs requis." });
      return;
    }
    if (employes.length === 0) {
      toast.warning("Impossible d'assigner la tâche", { description: "Aucun employé disponible. Veuillez en ajouter un d'abord." });
      return;
    }

    setIsLoading(true);

    const nouvelleTache: NouvelleTache = {
      titre,
      description,
      dateLimite,
      employeId,
      statut: 'A_FAIRE',
    };

    try {
      const response = await createTache(nouvelleTache);

      toast.success("Succès !", {
        description: `La tâche "${response.titre}" a été ajoutée.`,
      });

      onSuccess();

      setTitre('');
      setDescription('');
      setDateLimite('');
      setEmployeId('');

    } catch (error) {
      toast.error("Erreur API Tâches", {
        description: "Échec de l'ajout de la tâche. Le service Tâches (port 8081) est-il opérationnel ?",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="titre">Titre de la Tâche</Label>
        <Input id="titre" type="text" placeholder="Ex: Refonte de la page d'accueil" value={titre} onChange={(e) => setTitre(e.target.value)} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description (Optionnel)</Label>
        <Textarea id="description" placeholder="Détails de la tâche..." value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="dateLimite">Date Limite</Label>
        <Input id="dateLimite" type="date" value={dateLimite} onChange={(e) => setDateLimite(e.target.value)} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="employe">Assigner à l'Employé</Label>
        <Select onValueChange={setEmployeId} value={employeId} required disabled={employes.length === 0}>
          <SelectTrigger id="employe">
            <SelectValue placeholder={employes.length > 0 ? "Sélectionnez un employé" : "Chargement..."} />
          </SelectTrigger>
          <SelectContent>
            {employes.map((employe) => (
              <SelectItem key={employe.id} value={employe.id}>
                {employe.nomComplet}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full mt-4" disabled={isLoading || employes.length === 0}>
        {isLoading ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : "Soumettre la Tâche"}
      </Button>
    </form>
  );
}
