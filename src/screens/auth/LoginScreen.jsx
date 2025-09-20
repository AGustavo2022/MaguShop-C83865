import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Switch } from 'react-native'
import { colors } from '../../global/colors';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setUserEmail, setLocalId } from '../../store/slices/userSlice';
import { saveSession, clearSession } from '../../db';


const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [persistSession, setPersistSession] = useState(false)
    const [triggerLogin, result] = useLoginMutation()

    const dispatch = useDispatch()


    const onsubmit = () => {
        triggerLogin({ email, password })
    }

    useEffect(() => {
        //console.log("Resultado del login", result)
        (async () => {
            if (result.status === "fulfilled") {
                try {
                    if (persistSession) {
                        await saveSession(result.data.localId, result.data.email);
                        dispatch(setUserEmail(result.data.email))
                        dispatch(setLocalId(result.data.localId))
                    } else {
                        await clearSession();
                        dispatch(setUserEmail(result.data.email))
                        dispatch(setLocalId(result.data.localId))
                    }
                    
                } catch (error) {
                    console.log("Error al guardar sesión:", error);
                }
            }
        })()
    }, [result])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>MAGU</Text>
            <Text style={styles.title2}>ACESORIOS</Text>
            <Text style={styles.subTitle}>Inicia sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={colors.primaryText}
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={colors.primaryText}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>
            <View style={styles.rememberMe}>
                <Text style={{ color: colors.primaryText }}>¿Mantener sesión iniciada?</Text>
                <Switch
                    onValueChange={() => setPersistSession(!persistSession)}
                    value={persistSession}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                />
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary
    },
    title: {
        color: colors.primaryText,
        fontFamily: "PressStart2P",
        fontSize: 40
    },
    title2: {
        color: colors.secondaryTest,
        fontFamily: "Belleza-Regular",
        fontSize: 24
    },
    subTitle: {
        fontFamily: "JosefinSans-Regular",
        fontSize: 18,
        color: colors.primaryText,
        marginTop: 56
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 16,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        fontFamily: "JosefinSans-Regular",
        backgroundColor: colors.darkGray,
        width: textInputWidth,
        color: colors.white,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.primaryText
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.secondaryTest,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.primaryText,
        fontFamily: "JosefinSans-Regular",
        fontSize: 16,
        fontWeight: '700'
    },
    error: {
        padding: 16,
        backgroundColor: colors.red,
        borderRadius: 8,
        color: colors.white
    },
    rememberMe: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8
    }
})