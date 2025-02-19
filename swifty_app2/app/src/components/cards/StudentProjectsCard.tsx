import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import PaginationControls from "../pagination/PaginationControls";
import { StyleSheet } from "react-native";
import { StudentProjects } from "@/interface/Student";
import styles from "@/styles/styles";
import Pagination from "@/interface/Pagination";
import { Colors } from "@/constants/Colors";

interface Props {
    studentProjects: StudentProjects[];
    pagination: Pagination;
}

const StudentProjectsCard: FC<Props> = ({ studentProjects, pagination }) => {

    if (!studentProjects) {
        console.log("Student Projects is null");
        return null;
    }

    return (
        <View style={{ marginVertical: 8}}>
            {/* Project Cards */}
            <Text style={styles.title}>Projects</Text>
            {studentProjects.map((item) => (
                <View key={item.id} style={styles.itemContainer}
                >
                    {/* Project Name */}
                    <Text style={styles.itemTextName}>
                        {item.project_name}
                    </Text>

                    {/* Final Mark */}
                    <Text style={styles.itemTextScore}>
                        {item.final_mark !== null ? item.final_mark : "N/A"}
                    </Text>

                    {/* Validation Status - Icon (Aligned Right) */}
                    <View style={styles.itemIconStatus}>
                        {item.validated ? (
                            <Ionicons name="checkmark-circle" size={24} color={Colors.light.success} /> 
                        ) : (
                            <Ionicons name="close-circle" size={24} color={Colors.light.error} />
                        )}
                    </View>
                </View>
            ))}
            {/* Pagination Controls */}
            <View style={stylesItems.paginationContainer}>
                <PaginationControls
                    pagination={{
                        page: pagination.page,
                        length: pagination.length,
                        pageSize: pagination.pageSize,
                        setPage: pagination.setPage,
                    }}
                />
            </View>
        </View>
    );
};

const stylesItems = StyleSheet.create({
    paginationContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default StudentProjectsCard;