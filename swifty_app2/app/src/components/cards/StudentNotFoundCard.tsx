import styles from "@/styles/styles";
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { View, Text } from "react-native"
// import Layout from "../layout/Layout"
import {Colors} from "@/constants/Colors"


const StudentNotFoundCard = () => {
    return (
    // <Layout>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Link href="/" style={styles.backButton}>
                    {/* <Ionicons name="arrow-back" size={24} color={Colors.subtleGray} /> */}
                    <Ionicons name="arrow-back" size={24} />
                </Link>
                <Text style={styles.title}>Student not found</Text>
            </View>
        </View>
    // </Layout>
    );
}

export default StudentNotFoundCard;