import { View, Text } from 'react-native';
import styles from '../../styles/styles';
import { Link } from 'expo-router';
import { useStudent } from '@/context/StudentContext';
import { Image } from 'expo-image';

const StudentSummaryCard = () => {
    const { student } = useStudent();

    if (!student || !student.id) {
        return null;
    }

    return (
        <View style={styles.centeredContainer}>
            <Image 
            style={styles.image}
            source={student.image}
            contentFit="cover"
            transition={1000}
            />
            <View style={styles.title}>
                <Text style={styles.title}>{student.first_name} {student.last_name}</Text>
                <Text style={styles.subtitle}>{student.login}</Text>

            </View>
            <Link href={{
                pathname: "/profile",
            }}
                style={styles.buttonSecondary}>
                <Text style={styles.buttonSecondaryText}>View full profile</Text>
            </Link>
        </View>
    );
}

export default StudentSummaryCard;