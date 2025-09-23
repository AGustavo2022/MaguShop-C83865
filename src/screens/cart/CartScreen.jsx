import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { colors } from '../../global/colors'
import FlatCard from '../../components/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { removeItems, clearCart } from '../../store/slices/cartSlice'
import JosefinSansRegular from '../../components/JosefinSans-Regular'

const CartScreen = () => {
  const cartItems = useSelector(state=>state.cartReducer.cartItems)
  const total = useSelector(state=>state.cartReducer.total)
  const dispatch = useDispatch()
  
  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <JosefinSansRegular style={styles.footerTotal}>Total: $ {total} </JosefinSansRegular>
      <Pressable style={styles.confirmButton}
        onPress={() => dispatch(clearCart())}>
        <JosefinSansRegular style={styles.confirmButtonText}>Confirmar</JosefinSansRegular>
      </Pressable>
    </View>
  )

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      <View>
        <Image
          source={{ uri: item.mainImage }}
          style={styles.cartImage}
          resizeMode='cover'
        />
      </View>
      <View style={styles.cartDescription}>
        <JosefinSansRegular style={styles.title}>{item.title}</JosefinSansRegular>
        <JosefinSansRegular style={styles.description}>{item.shortDescription}</JosefinSansRegular>
        <JosefinSansRegular style={styles.price}>Precio unitario: $ {item.price}</JosefinSansRegular>
        <JosefinSansRegular stlyle={styles.quantity}>Cantidad: {item.quantity}</JosefinSansRegular>
        <JosefinSansRegular style={styles.total}>Total: $ {item.quantity * item.price}</JosefinSansRegular>
        <Pressable onPress={() => dispatch(removeItems(item.id))}>
          <Icon name="delete" size={24} color={colors.red} style={styles.trashIcon} />
        </Pressable>
      </View>
    </FlatCard>
  )

  return (
    <>
      {
        cartItems.length>0
          ?
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
            ListFooterComponent={<FooterComponent />}
          />

          :
          <JosefinSansRegular style={styles.productNot}>Aún no hay productos en el carrito</JosefinSansRegular>
      }
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    alignItems: "center",
    gap: 10
  },
  cartImage: {
    width: 80,
    height: 80
  },
  cartDescription: {
    width: '80%',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    marginBottom: 16,
  },
  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700'
  },
  trashIcon: {
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  footerContainer: {
    padding: 32,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerTotal: {
    fontSize: 16,
    fontWeight: '700'
  },
  confirmButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.purple,
    borderRadius: 16,
    marginBottom: 24,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700'
  }, cartScreenTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: "center",
    paddingVertical: 8
  },
  productNot: {
    paddingTop: 48,
    paddingLeft: 72
  }

})