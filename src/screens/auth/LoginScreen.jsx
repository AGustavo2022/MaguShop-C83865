import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Switch } from 'react-native'
import { colors } from '../../global/colors';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setUserEmail, setLocalId } from '../../store/slices/userSlice';
import { saveSession, clearSession } from '../../db';
import BellezaRegular from '../../components/Belleza-Regular';
import JosefinSansRegular from '../../components/JosefinSans-Regular';


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
            <BellezaRegular style={styles.title}>MAGU</BellezaRegular>
            <BellezaRegular style={styles.title2}>ACESORIOS</BellezaRegular>
            <JosefinSansRegular style={styles.subTitle}>Inicia sesión</JosefinSansRegular>
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
                <JosefinSansRegular style={styles.whiteText}>¿No tienes una cuenta?</JosefinSansRegular>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <JosefinSansRegular style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una
                    </JosefinSansRegular>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><JosefinSansRegular style={styles.btnText}>Iniciar sesión</JosefinSansRegular></Pressable>
            <View style={styles.rememberMe}>
                <JosefinSansRegular style={{ color: colors.primaryText }}>¿Mantener sesión iniciada?</JosefinSansRegular>
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
        fontSize: 40
    },
    title2: {
        color: colors.secondaryTest,
        fontSize: 24
    },
    subTitle: {
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