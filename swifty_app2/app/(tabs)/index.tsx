import StudentSummaryCard from "@/components/cards/StudentSummaryCard";
import { useStudent } from "@/context/StudentContext";
import { StudentCursus, StudentDetails } from "@/interface/Student";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from 'axios';
import styles from "@/styles/styles";
import * as Linking from 'expo-linking';
import { useURL } from "expo-linking";
import ErrorModal from "@/components/modals/ErrorModal";
import { useModal } from "@/hooks/useModal";

interface AuthResponse {
  authUrl: string;
}

export default function Index() {

  //Authentication
  const [login, setLogin] = useState('');

  // Student Context
  const { student, setStudent } = useStudent() as { student: StudentDetails | null, setStudent: (student: StudentDetails | null) => void };
  const { cursus, setCursus } = useStudent() as { cursus: StudentCursus | null, setCursus: (student: StudentCursus | null) => void };

  //Modal
  const { modalVisible, modalMessage, showModal, hideModal } = useModal();


  //------AUTHENTICATION SECTION------ 
  const url = useURL();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!url || isAuthenticated) {
      console.log('No URL received || Already authenticated');
      return;
    }
    // Extract the parameters from the URL
    const { queryParams } = Linking.parse(url);
    // Check if the URL contains the authorization code
    if (queryParams?.code) {
      const authorizationCode = queryParams.code;
      console.log('Authorization code received :', authorizationCode);
      // Get the access token
      try {
        axios.get(`${process.env.EXPO_PUBLIC_API_URL}/auth/callback?code=${authorizationCode}`);
        setIsAuthenticated(true);
      } catch (error: any) {
        const errorResponse = error.response.data.message ? error.response.data.message : error.message;
        showModal("Error exchanging token\n" + errorResponse);
      }
    }
  }, [url]);

  const goToAuth = async () => {
    console.log('Going to authentication page');
    try {
      console.log('Fetching authentication URL');
      // Get the authentication URL from the API
      const response = await axios.get<AuthResponse>(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`);
      console.log('URL authentication link: ', response.data.authUrl);
      // Redirect to the authentication page
      Linking.openURL(response.data.authUrl);
    } catch (error: any) {
      console.log('Error fetching authentication URL', error);
      const errorResponse = error.response.data.message ? error.response.data.message : error.message;
      showModal("Error fetching authentication URL\n" + errorResponse);
    }
  }


  //------GET STUDENT DETAILS SECTION------  
  const onChangeText = (text: string) => {
    setLogin(text);
  };

  const onPressGetStudent = async () => {
    setCursus(null);
    setStudent(null);
    if (!login) {
      console.error('Login is empty');
      return;
    }

    // Get student details
    const loginFormatted = login.toLowerCase();

    try {
      const response = await axios.get<StudentDetails>(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${loginFormatted}`,
      )
      setStudent({
        id: response.data.id,
        login: response.data.login,
        email: response.data.email,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        image: response.data.image,
        phone: response.data.phone,
        correction_point: response.data.correction_point,
        wallet: response.data.wallet,
      });
    } catch (error: any) {
      console.log('Error fetching student', error.message);
      const errorResponse = error.response.data.message ? error.response.data.message : error.message;
      showModal("Error fetching student\n" + errorResponse);
    }
  };

  const getCursus = async () => {

    if (!student) {
      console.error('Student is null');
      return;
    }
    try {
      const response = await axios.get<StudentCursus>(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${student.id}/cursus`,
      )
      console.log("Student Cursus: ", response.data);
      setCursus(response.data);
      if (cursus) {
        console.log("Student Cursus: ", cursus);
      }
    }
    catch (error: any) {
      const errorResponse = error.response.data.message ? error.response.data.message : error.message;
      showModal("Error fetching student cursus\n" + errorResponse);
    }
  }

  useEffect(() => {
    console.log('in useEffect Student: ', student);
    if (!student) {
      return;
    }
    // Call user cursus
    console.log("Calling getCursus for student:", student);
    getCursus();
  }, [student]);

  return (
    <View style={styles.container}>
      <ErrorModal message={modalMessage} visible={modalVisible} onClose={hideModal} />
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome</Text>
      </View>
      {isAuthenticated ? (
        <ScrollView>
          {/* Divider for consistency */}
          <View style={styles.divider} />
          <Text style={styles.subtitle}>Find a student by entering their login:</Text>
          {/* Search Bar */}
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={login}
            placeholder="Enter a login"
          />
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={onPressGetStudent}
          >
            <Text style={styles.buttonPrimaryText}>Search</Text>
          </TouchableOpacity>
          {student &&
            <StudentSummaryCard />}
        </ScrollView>)

        : (<View style={styles.container}>
          <TouchableOpacity style={styles.buttonPrimary} onPress={goToAuth}>
            <Text style={styles.buttonPrimaryText}>Authenticate</Text>
          </TouchableOpacity>
        </View>)
      }
    </View>
  );
}
