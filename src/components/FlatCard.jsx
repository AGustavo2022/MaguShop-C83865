import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

const FlatCard = ({ children,style }) => {
    return (
        <View style={{...styles.container,...style}}>
            {children}
        </View>
    )
}

export default FlatCard

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.lightGray,
        padding:32,
        margin:8,
        elevation: 5
    }
})
