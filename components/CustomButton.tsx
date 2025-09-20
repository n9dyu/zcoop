import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/type'

const CustomButton = ({
    onPress,
    title = "Click me",
    style,
    textStyle,
    leftIcon,
    isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity>
      <Text>CustomButton</Text>
    </TouchableOpacity>
  )
}

export default CustomButton