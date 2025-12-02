
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";


import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { EditEmployeModal } from "@/components/employeComponents/EditEmployeModal";


import { fetchAllEmployes, deleteEmploye } from "@/app/api/gestionApi"; 

interface Employe {
  id: string; 
  nomComplet: string;
  poste: string;
  email: string;
  telephone: string;
}

export function EmployeTable() {
  const [employes, setEmployes] = useState<Employe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const fetchEmployes = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllEmployes();
      setEmployes(data);
    } catch (error) {
      toast.error("Erreur de Connexion", {
        description: "Impossible de charger la liste des employés (Port 8082).",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployes();
  }, []);

 
  const handleDelete = async (id: string) => {
    try {
      await deleteEmploye(id); 
      
      toast.success("Suppression réussie", {
        description: `L'employé (ID: ${id}) a été supprimé de Firestore.`,
      });
      
      fetchEmployes(); 

    } catch (error) {
      toast.error("Erreur de suppression", {
        description: "Échec de la suppression dans le service Employé.",
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Chargement des employés...
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md"> 
      <h2 className="text-xl font-bold mb-4">Liste des Employés</h2>

      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nom Complet</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                Aucun employé trouvé. Utilisez le bouton "Ajouter un Employé".
              </TableCell>
            </TableRow>
          ) : (
            employes.map((employe) => (
              <TableRow key={employe.id}>
                <TableCell className="font-medium">{employe.id}</TableCell>
                <TableCell>{employe.nomComplet}</TableCell>
                <TableCell>{employe.poste}</TableCell>
                <TableCell>{employe.email}</TableCell>
                <TableCell>{employe.telephone}</TableCell>
                <TableCell className="space-x-2 flex items-center justify-center">
                  
                  <EditEmployeModal 
                    employe={employe} 
                    onSuccess={fetchEmployes} 
                  />

                  <DeleteConfirmationDialog
                    description={`Ceci supprimera l'employé ${employe.nomComplet} (ID: ${employe.id}) définitivement.`}
                    onConfirm={() => handleDelete(employe.id)}
                    triggerButton={(
                      <Button variant="destructive" size="sm" className='ml-2'>
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
