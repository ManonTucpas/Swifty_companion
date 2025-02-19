import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useStudent } from '@/context/StudentContext';
import { StudentProjects } from '@/interface/Student';
import styles from '@/styles/styles';
import StudentDetailsCard from '@/components/cards/StudentDetailsCard';
import StudentSkillsCard from '@/components/cards/StudentSkillsCard';
import StudentProjectsCard from '@/components/cards/StudentProjectsCard';
import StudentNotFoundCard from '@/components/cards/StudentNotFoundCard';
import { useModal } from '@/hooks/useModal';
import ErrorModal from '@/components/modals/ErrorModal';
import { Colors } from '@/constants/Colors';

const Profile = () => {
    const { student } = useStudent();
    const [studentProjects, setStudentProjects] = useState<StudentProjects[] | null>(null);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    //Modal
    const { modalVisible, modalMessage, showModal, hideModal } = useModal();

    const getProjects = async () => {
        if (!student || !student.id) {
            return;
        }
        try {
            const response = await axios.get<StudentProjects[]>(
                `${process.env.EXPO_PUBLIC_API_URL}/users/${student.id}/projects`,
                {
                    params: {
                        page: page,
                        pageSize: pageSize,
                    }
                }
            )
            setStudentProjects(
                response.data
            );
        }
        catch (error: any) {
            const errorResponse = error.response.data.message ? error.response.data.message : error.response;
            showModal("Error fetching student projects\n" + errorResponse);
        }
    }
    // // Fetch the student's project when the page changes
    useEffect(() => {
        if (!student || !student.id) {
            return;
        }
        getProjects();
    }, [page]);

    // Reset the page and projects when the student changes
    useEffect(() => {
        // Adding a delay to avoid conflict with the previous request
        setTimeout(() => {
            setPage(1);
            setStudentProjects(null);
            getProjects();
        }, 1000);
    }, [student]);

    if (!student || !student.id) {
        return (
            <StudentNotFoundCard />
        )
    }

    return (
        <View style={styles.container}>
            <ErrorModal message={modalMessage} visible={modalVisible} onClose={hideModal} />
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <Link href="/" style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.primary}/>
                </Link>

                <Text style={styles.title}>Student Profile</Text>
            </View>
            <ScrollView style={{ marginBottom: 80 }}>

                {/* Profile Image && Student Information */}
                <StudentDetailsCard />

                {/* Skills */}
                <StudentSkillsCard />

                {/* Projects */}
                {studentProjects && <StudentProjectsCard studentProjects={studentProjects} pagination={{
                    page: page,
                    length: studentProjects?.length | 0,
                    pageSize: pageSize,
                    setPage: setPage,
                }}
                />}
            </ScrollView>
        </View>
    );
}

export default Profile;