interface StudentDetails {
    id: number;
    login: string;
    email: string;
    first_name: string;
    last_name: string;
    image: string;
    phone: string;
    cursus?: StudentCursus;
    correction_point: number;
    wallet: number;
}

interface  StudentCursus {
    id: number;
    level: number;
    percentage: number;
    skills?: Skills[];
}

interface Skills {
    id: number;
    name: string;
    level: number;
}

interface StudentProjects {
    id: number;
    project_name: string;
    final_mark: number;
    validated: boolean;
}

export { StudentDetails, StudentCursus, Skills, StudentProjects };