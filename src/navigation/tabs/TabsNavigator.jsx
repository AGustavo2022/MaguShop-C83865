import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStackNavigator from '../shop/ShopStackNavigator';
import CartStackNavigator from '../cart/CartStackNavigator';
import ProfileStackNavigator from '../profile/ProfileStackNavigator';
import Icon from 'react-native-vector-icons/Feather'
import { StyleSheet } from 'react-native';
import { colors } from '../../global/colors';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();


const TabsNavigator = () => {
    const totalItems = useSelector(state=>state.cartReducer.totalItems)
    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.container
            }}
            
        >
            <Tab.Screen 
                name="Shop" 
                component={ShopStackNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="shopping-bag" size={24} color={focused?colors.secondaryTest:colors.primaryText} />)
                }}
                />
            <Tab.Screen 
                name="Cart" 
                component={CartStackNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="shopping-cart" size={24} color={focused?colors.secondaryTest:colors.primaryText} />),      
                    tabBarBadge: totalItems > 0 ? totalItems : undefined 
                }}
                />
                <Tab.Screen 
                name="Profile" 
                component={ProfileStackNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<Icon name="user" size={24} color={focused?colors.secondaryTest:colors.primaryText} />),
                    //tabBarBadge:0,           
                }}
                />
        </Tab.Navigator>
    );
}

export default TabsNavigator

const styles = StyleSheet.create({
    container:{
    backgroundColor: colors.primary,
    }
})