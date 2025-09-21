import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/type'
import cn from 'clsx'
import "../app/global.css"

const CustomButton = ({
    onPress,
    title = "Click me",
    style,
    textStyle,
    leftIcon,
    isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className="bg-red rounded-full p-3 w-full flex flex-row justify-center" onPress={onPress}>
        {leftIcon}

        <View className='flex-center flex-row'>
            {isLoading ? (
                <ActivityIndicator size="small" color="white"/>
            ): (
                <Text className={cn('text-white paragraph-semibold', textStyle)}>
                    {title}
                </Text>
            )}

        </View>
    </TouchableOpacity>
  )
}

export default CustomButton