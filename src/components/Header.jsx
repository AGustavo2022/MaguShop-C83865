import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { colors } from '../global/colors'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { clearSession } from '../db'
import { clearUser } from '../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import BellezaRegular from './Belleza-Regular'
import JosefinSansRegular from './JosefinSans-Regular'

const Header = ({ title, title2, subtitle }) => {
  const navigation = useNavigation()

  const canGoBack = navigation.canGoBack()

  const dispatch = useDispatch()

  const handleClearSession = async () => {
    try {
      dispatch(clearUser())
      await clearSession()
      
    } catch {

      console.log("Hubo un error al limpiar la sesión")
    }

  }

  return (
    <View style={styles.container}>
      <BellezaRegular style={styles.title}>{title}</BellezaRegular>
      <BellezaRegular style={styles.title2}>{title2}</BellezaRegular>
      <View style={styles.iconsContainer}>
        <View>
        {
          canGoBack && <Pressable onPress={() => navigation.goBack()}><Icon name="arrow-left-circle" size={32} color={colors.primaryText} /></Pressable>
        }
        </View>
        <JosefinSansRegular style={styles.subtitle}>{subtitle}</JosefinSansRegular>
        <Pressable style={styles.logout} onPress={handleClearSession}><Icon name="log-out" size={32} color={colors.primaryText} /></Pressable>
      </View>

    </View>
  )
}




export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 180,
    paddingTop: 50,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    color: colors.primaryText,
    textAlign:"center",
  },
    title2: {
    fontSize: 24,
    color: colors.secondaryTest,
    textAlign:"center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.primaryText,
    textAlign:"center"
  },
  iconsContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal: 16
  },

})

