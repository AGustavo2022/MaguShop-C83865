import { StyleSheet, Image, FlatList,Pressable } from 'react-native'
import FlatCard from '../../components/FlatCard';
import { useDispatch } from 'react-redux';
import { setCategorySelected } from '../../store/slices/shopSlice';
import { useGetCategoriesQuery } from '../../services/shopApi';
import JosefinSansRegular from '../../components/JosefinSans-Regular';


const CategoriesScreen = ({navigation}) => {

    const {data:categories, isLoading, error} = useGetCategoriesQuery()


    const dispatch = useDispatch()

    const handleSelectCategory = (category)=>{
        dispatch(setCategorySelected(category))
        navigation.navigate("Productos")
    }

    const renderCategoryItem = ({ item }) => {
        return (
            <Pressable onPress={()=>handleSelectCategory(item.title)}>
                <FlatCard style={styles.cardCustom}>
                    <JosefinSansRegular style={styles.title}>{item.title}</JosefinSansRegular>
                    <Image width={120} height={80} source={{ uri: item.image }} resizeMode='contain' />
                </FlatCard>
            </Pressable>
        )
    }
    return (
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
        />
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    cardCustom: {

    },title:{
        marginRight: 16
    }
})