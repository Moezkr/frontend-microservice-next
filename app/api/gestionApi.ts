

import axios from 'axios';


const URL_EMPLOYE = process.env.NEXT_PUBLIC_API_EMPLOYE_SERVICE;
const URL_TACHE = process.env.NEXT_PUBLIC_API_TACHE_SERVICE;


export interface Employe { 
    id: string; 
    nomComplet: string;
    poste: string;
    email: string;
    telephone: string;
}

export interface NouvelleTache { 
    titre: string; 
    description: string; 
    dateLimite: string; 
    employeId: string; 
    statut: string; 
}

export interface Tache extends NouvelleTache {
    id: string;
}



export async function fetchAllEmployes(): Promise<Employe[]> {
    const response = await axios.get<Employe[]>(URL_EMPLOYE!);
    return response.data;
}

export async function createEmploye(employe: Omit<Employe, 'id'>): Promise<Employe> {
    const response = await axios.post<Employe>(URL_EMPLOYE!, employe);
    return response.data;
}

export async function updateEmploye(employe: Employe): Promise<Employe> {
    const response = await axios.put<Employe>(`${URL_EMPLOYE}/${employe.id}`, employe);
    return response.data;
}

export async function deleteEmploye(id: string): Promise<void> {
    await axios.delete(`${URL_EMPLOYE}/${id}`);
}



export async function fetchAllTaches(): Promise<Tache[]> {
    const response = await axios.get<Tache[]>(URL_TACHE!);
    return response.data;
}

export async function createTache(tache: NouvelleTache): Promise<Tache> {
    const response = await axios.post<Tache>(URL_TACHE!, tache);
    return response.data;
}

export async function deleteTache(id: string): Promise<void> {
    await axios.delete(`${URL_TACHE}/${id}`);
}
