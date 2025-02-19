import { Colors } from "@/constants/Colors";
import { useStudent } from "@/context/StudentContext";
import { Skills } from "@/interface/Student";
import styles from "@/styles/styles";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const StudentSkillsCard = () => {
    const { cursus } = useStudent();

    return (
        <View style={{ marginVertical: 8}}>
            <Text style={styles.title}>Skills</Text>
            {cursus?.skills?.map((skill : Skills) => (
                <View key={skill.name} style={styles.itemContainer}>
                    <Text style={styles.itemTextName}>{skill.name}</Text>
                    <Text style={styles.itemTextScore}>
                        {skill.level.toFixed(2)}
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default StudentSkillsCard;