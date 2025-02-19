import { createContext, useContext, useState } from "react";
import { StudentCursus, StudentDetails } from "@/interface/Student";

interface StudentContextProps {
    student: StudentDetails | null;
    cursus: StudentCursus | null;
    setStudent: (student: StudentDetails | null) => void;
    setCursus: (cursus: StudentCursus | null) => void;
}

const StudentContext = createContext<StudentContextProps | null>(null);

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
    const [student, setStudent] = useState<StudentDetails | null>(null);
    const [cursus, setCursus] = useState<StudentCursus | null>(null);

    return (
        <StudentContext.Provider value={{ student, setStudent, cursus, setCursus }}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudent = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error("useStudent must be used within a StudentProvider");
    }
    return context;
};