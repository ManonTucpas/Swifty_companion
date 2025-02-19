import { useStudent } from "@/context/StudentContext";
import styles from "@/styles/styles";
import { View, Image, Text } from "react-native";
import { Colors } from "@/constants/Colors";

const StudentDetailsCard = () => {
    const { student, cursus } = useStudent();

    if (!student || !student.id) {
        return null;
    }

    return (
        <View style={{...styles.centeredContainer, flex:1}}>
            <Image
                source={{ uri: student.image }}
                style={styles.image}
                onError={(e) => console.log("Image failed to load", e.nativeEvent)}
            />
            <Text style={{ ...styles.title, marginTop: 12 }}>
                {student.first_name} {student.last_name}
            </Text>
            <Text style={{ ...styles.subtitle, fontStyle: 'italic', color: Colors.light.muted }}>
                {student.login}
            </Text>
            <Text style={{ ...styles.subtitle, color: Colors.light.secondary, fontWeight: "500" }}>
                {student.email}
            </Text>
            <Text style={{ ...styles.subtitle, color: Colors.light.muted, fontWeight: "500" }}>
                Correction points: {student.correction_point}
            </Text>
            <Text style={{ ...styles.subtitle, color: Colors.light.muted, fontWeight: "500" }}>
                Wallet : {student.wallet}₳
            </Text>

            {/* Level Bar */}
            <View style={styles.levelBar}>
                <Text style={{ color: "white", fontWeight: "600", fontSize: 16}}>
                    Level {cursus?.level} - {cursus?.percentage}%
                </Text>
            </View>
        </View>
    );
};

export default StudentDetailsCard;