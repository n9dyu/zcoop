import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'
import { images } from '@/constants'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

export default function _layout() {
  return (
    <KeyboardAvoidingView behavior = {Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView className='bg-white h-full' keyboardShouldPersistTaps="handled">

          <View className='w-full relative' style={{ height: Dimensions.get('screen').height / 2.25}}>
            <ImageBackground source={images.visual} className="size-full rounded-b-lg" resizeMode="contain"></ImageBackground>
          </View>

          {/* <CustomInput
            placeholder='Enter your email'
            value={""}  
            onChangeText={() => {}}
            label="Email"
            keyboardType='email-address'
          />
          <CustomButton/> */}
          <Slot />
        </ScrollView>
        
    </KeyboardAvoidingView>
  )
}