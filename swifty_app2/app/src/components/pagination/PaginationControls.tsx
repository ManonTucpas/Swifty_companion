import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";

interface Props {
    pagination: {
        page: number;
        length: number;
        pageSize: number;
        setPage: (page: number) => void;
    }
}

const PaginationControls: FC<Props> = ({ pagination }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
            <TouchableOpacity onPress={() => pagination.setPage(pagination.page - 1)} disabled={pagination.page === 1}>
                <AntDesign name="leftcircleo" size={30} color={Colors.light.primary}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pagination.setPage(pagination.page + 1)} disabled={pagination.length < pagination.pageSize}>
                <AntDesign name="rightcircleo" size={30} color={Colors.light.primary} />
            </TouchableOpacity>
        </View>
    );
}

export default PaginationControls;