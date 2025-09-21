import { View, Text, Image } from 'react-native'
import React from 'react'
import { Redirect, Slot, Tabs } from 'expo-router'
import useAuthStore from '@/store/auth.store';
import { TabBarIconProps } from '@/type';
import { images } from '@/constants';
import cn from 'clsx';

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className='flex min-w-20 items-center justify-center min-h-full gap-1 mt-12'>
    <Image source={icon} className='size-6' resizeMode='contain' tintColor={focused ? '#A20100' : '#5D5F6D'}/>
    <Text className={cn('text-xs font-bold', focused ? 'text-red':'text-gray-400')}>{title}</Text>
  </View>
)

export default function TabLayout() {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) return <Redirect href="/sign-in" />;
    
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false,
      tabBarStyle: {
        borderRadius: 50,
        marginHorizontal: 20,
        height: 80,
        position: 'absolute',
        bottom: 40,
        backgroundColor: 'white',
        shadowColor: '#1A1A1A',
        shadowOffset: {width: 0, height:2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
      }
    }}>
      <Tabs.Screen 
        name='index' 
        options={{title: 'Home', 
        tabBarIcon: ({focused}) => <TabBarIcon title="Home" icon={images.home} focused={focused}/>}}
      />
      <Tabs.Screen 
        name='cart' 
        options={{title: 'Bag', 
        tabBarIcon: ({focused}) => <TabBarIcon title="Bag" icon={images.bag} focused={focused}/>}}
      />
      <Tabs.Screen 
        name='profile' 
        options={{title: 'Profile', 
        tabBarIcon: ({focused}) => <TabBarIcon title="Profile" icon={images.profile} focused={focused}/>}}
      />
      <Tabs.Screen 
        name='settings' 
        options={{title: 'Settings', 
        tabBarIcon: ({focused}) => <TabBarIcon title="Settings" icon={images.settings} focused={focused}/>}}
      />
    </Tabs>
  );
}