
'use client'; 

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react"; 
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";


import { 
  fetchAllEmployes, 
  fetchAllTaches, 
  deleteTache, 
  Tache as TacheApi 
} from "@/app/api/gestionApi"; 


interface EmployeMap {
  [id: string]: string; 
}


interface TacheComplete extends TacheApi { 
  nomEmploye: string; 
}

interface TacheTableProps {
  refreshTrigger: number; 
}


export function TacheTable({ refreshTrigger }: TacheTableProps) { 
  const [taches, setTaches] = useState<TacheComplete[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTaches = async () => {
    setIsLoading(true);
    try {
      const employesData = await fetchAllEmployes();
      
      const employeMap: EmployeMap = employesData.reduce((acc, emp) => {
        acc[emp.id] = emp.nomComplet; 
        return acc;
      }, {} as EmployeMap);

      const rawTaches = await fetchAllTaches();
      
      const tachesCompletes: TacheComplete[] = rawTaches.map(tache => ({
        ...tache,
        nomEmploye: employeMap[tache.employeId] || "Non assigné",
      }));

      setTaches(tachesCompletes.reverse()); 

    } catch (error) {
      toast.error("Erreur API", {
        description: "Échec du chargement des tâches ou des employés. Vérifiez les ports 8081 et 8082.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTaches();
  }, [refreshTrigger]); 

  const handleDelete = async (id: string) => {
    try {
      await deleteTache(id); 
      
      toast.success("Suppression réussie", {
        description: `La tâche a été supprimée de Firestore.`,
      });
      
      fetchTaches(); 

    } catch (error) {
      toast.error("Erreur de suppression", {
        description: "Échec de la suppression dans le service Tâches.",
      });
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'A_FAIRE': return "bg-red-100 text-red-700";
      case 'EN_COURS': return "bg-yellow-100 text-yellow-700";
      case 'TERMINE': return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading && taches.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Chargement des tâches...
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Liste des Tâches</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Assigné à</TableHead>
            <TableHead>Date Limite</TableHead>
            <TableHead className="text-center">Statut</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taches.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Aucune tâche trouvée. Ajoutez-en une !
              </TableCell>
            </TableRow>
          ) : (
            taches.map((tache) => (
              <TableRow key={tache.id}>
                <TableCell className="font-medium">{tache.titre}</TableCell>
                <TableCell>{tache.nomEmploye}</TableCell>
                <TableCell>{tache.dateLimite}</TableCell>
                <TableCell className="text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatutColor(tache.statut)}`}>
                    {tache.statut.replace('_', ' ')}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <DeleteConfirmationDialog
                    description={`Ceci supprimera la tâche "${tache.titre}" définitivement.`}
                    onConfirm={() => handleDelete(tache.id)}
                    triggerButton={(
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
