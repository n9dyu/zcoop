import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import { images } from '@/constants'
import useAuthStore from '@/store/auth.store'

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();
  
  if(isAuthenticated) return <Redirect href="/"/>
  return (
    <KeyboardAvoidingView behavior = {Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView className='bg-red h-full' keyboardShouldPersistTaps="handled">

          <View className='w-full relative' style={{ height: Dimensions.get('screen').height / 2.25}}>
            <ImageBackground source={images.visual} className="size-full rounded-b-lg mt-8" resizeMode="contain"></ImageBackground>
          </View>
          
          <Slot />
        </ScrollView>
        
    </KeyboardAvoidingView>
  )
}